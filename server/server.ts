import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import { PostgresPubSub } from "graphql-postgres-subscriptions";
import { applyMiddleware } from 'graphql-middleware'
import { Client } from "pg";
const { Prisma } from 'prisma-binding';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from 'http';
import connectDB from './config/db'
import { authMiddleware } from './authMiddleware'
import { authDirectiveTransformer } from './directive'
import resolvers from './resolvers'

const client = new Client();
await client.connect();
const pubsub = new PostgresPubSub({ client });

const prismaBinding = new Prisma({
  debug: false,
  endpoint: `http://some.url`,
  secret: 'PRISMA_SECRET',
  typeDefs: 'prisma.graphql'
})

async function startApolloServer() {
  const app = express();

  connectDB();

  const httpServer = http.createServer(app);

  let schema = makeExecutableSchema({
    resolvers,
    typeDefs: loadSchemaSync(
      '../schema/schema.graphql',
      { loaders: [new GraphQLFileLoader()] }
    )
  })

  schema = authDirectiveTransformer(schema)

  schema = applyMiddleware(
    schema,
    authMiddleware
  )

  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
    context: ({ req }) => {
      // request exists for HTTP requests; for websocket connections it's undefined
      if (req) {
        return {
          accountId: req.session && req.session.accountId,
          prismaBinding: prismaBinding,
          request: req,
          role: req.session && req.session.role
        }
      } else {
        return { prismaBinding }
      }
    },

  });

  await server.start();

  server.applyMiddleware({ app });

  const listened = await new Promise((resolve: any) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer()

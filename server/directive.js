import { GraphQLSchema, defaultFieldResolver } from 'graphql'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { makeExecutableSchema } from '@graphql-tools/schema'

export const authDirectiveTransformer = (schema) => {
  const directiveName = 'auth'
  return  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (authDirective) {
        const roles = authDirective['roles'];
        const { resolve = defaultFieldResolver } = fieldConfig
        return {
          ...fieldConfig,
          resolve: async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            if (!context.authorization.isAuthenticated) {
  						throw new AuthenticationError('You need to be authenticated to perform this query');
  					}

  					const isAllowed = roles.includes(context.role);

  					if (isAllowed) {
  						throw new ForbiddenError(`You need to have one of the scopes: ${roles.join(', ')}`);
  					}
            return result
          }
        }
      }
      return fieldConfig;
    }
  })
};

const overwriteByParent = schema => {
  const directiveName = 'overwriteByParent'
  return  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const overwriteByParentDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (overwriteByParentDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        return {
          ...fieldConfig,
          resolve: async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            return source[info.fieldName] || result
          }
        }
      }
      return fieldConfig;
    }
  })
}

async function startApolloServer() {
  ...

  schema = authDirectiveTransformer(schema)
  schema = overwriteByParent(schema)

  ...
}

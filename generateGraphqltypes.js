const { generate } = require('@graphql-codegen/cli')
const sh = require('shelljs')

const graphqlDocuments = ['./queries/query.ts']
const graphqlSchema = './schema/schema.graphql'

async function generateGraphQLTypes () {
  sh.mkdir('-p', './types')
  sh.mkdir('-p', './build/gen')
  return generate({
    documents: graphqlDocuments,
    generates: {
      './types/graphqlTypes.tsx': {
        config: {
          defaultMapper: 'Partial<{T}>'
        },
        plugins: [
          { add: '/* eslint-disable */\n/* tslint:disable */' },
          { typescript: { enumsAsTypes: 'true' } },
          'fragment-matcher',
          'typescript-operations',
          'typescript-resolvers',
          'typescript-react-apollo'
        ]
      }
    },
    overwrite: true,
    schema: graphqlSchema,
    silent: true
  }, true).then(generatedFiles => {
    for (const { filename } of generatedFiles) {
      console.log(`Generated GraphQL types in ${filename}`)
    }
  }).catch(err => {
    console.error(`Couldn't generate GraphQL types`)
    console.error(err)
  })
}

generateGraphQLTypes()

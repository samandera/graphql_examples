import { GraphQLSchema } from 'graphql'

const urlValue = value => {
  const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/)
  if (value.match(regex)) {
    return value;
  }
  throw new UserInputError('Provided value is not an valid url');
}

const urlScalarResolver = new GraphQLScalarType({
  name: 'Url',
  description: 'Url custom scalar type',
  parseValue: urlValue,
  serialize: urlValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return urlValue(ast.value);
    }
    throw new UserInputError('Provided value is not an valid url');
  },
})

export default urlScalarResolver

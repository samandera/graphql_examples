import { logIn } from './auth'
import Url from './urlScalarResolver'
import UserInterface from './interfaceResolver'
import { Upload, uploadProductPhotoPhoto, uploadProductPhotoProgress } from './product'
import { getProducts } from './notTheBestIdeaResolver'
import UserUnion from './unionsResolver'

const resolvers = {
  Affiliate: {
    employees: (parent, args, context, info) => {
      return context.prismaBinding.query.employees({ id: parent.id }).products() || []
    },
    products: (parent, args, context, info) => {
      return context.prismaBinding.query.affiliate({ id: parent.id }).products() || []
    }
  },
  File,
  Price,
  Mutation: {
    logIn,
    uploadProductPhotoPhoto
  },
  Query: {
    affiliate: (parent, args, context, info) => {
      const aff = context.prismaBinding.query.affiliate({ where: args.where }, info)
      return aff
    },
    getProducts
  },
  Upload,
  Url,
  User: UserInterface,
  UserByRole: UserUnion,
  Subscription: {
    uploadProductPhotoProgress
  }
}

export default resolvers

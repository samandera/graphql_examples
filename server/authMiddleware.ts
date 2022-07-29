import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { allow, and, rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, context: Context) =>
    !!(context.accountId && context.role) ||
    new AuthenticationError('Unauthenticated')
)

const canManageOwnAccount = (role) =>
rule({ cache: 'strict' })(async (_, args, ctx) => {
  if (ctx.role === role) {
    return !!(ctx.accountId === args.where.id) || new ForbiddenError('Forbidden')
  }
  return true
})

export const authMiddleware = shield(
  {
    Affiliate: {
      products: isAuthenticated
    },
    File: isAuthenticated,
    Price: {
      currency: isAuthenticated,
      value: isAuthenticated
    },
    Mutation: {
      logIn: allow,
      uploadProductPhotoPhoto: and(isAuthenticated, allowRoles(['AFFILIATE', 'EMPLOYEE']))
    },
    Query: {
      affiliate: and(isAuthenticated, canManageOwnAccount('AFFILIATE'), allowRoles(['AFFILIATE', 'ADMIN']))
    }
  },
  {
    fallbackError: (error: any) => {
      return error
    }
  }
)

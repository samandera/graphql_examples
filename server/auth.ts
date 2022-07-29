export const logIn = async (obj, { data }, context, info) => {
  const user = await getUserFromDB({ where: { email: data.email } })

  if (!user || comparePassword(user.password, data.password)) {
    throw new AuthenticationError('Bad credentials')
  }

  let queryAccounts
  switch (user.role) {
    case 'ADMIN': queryAccounts = context.prismaBinding.query.admin; break
    case 'AFFILIATE': queryAccounts = context.prismaBinding.query.affiliate; break
    case 'EMPLOYEE': queryAccounts = context.prismaBinding.query.employee; break
    case 'CUSTOMER': queryAccounts = context.prismaBinding.query.customer; break
    default: throw new UnreachableCaseError(user.role)
  }

  const accounts = await queryAccounts({ where: { user: { email: data.email } } })

  const promise = new Promise(resolve => {
    if (context.request && context.request.session) {
      context.request.session.accountId = accounts[0].id
      context.request.session.role = user.role

      context.request.session.save(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })

  await promise
  return user
}

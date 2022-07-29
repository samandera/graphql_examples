const User = {
  __resolveType: (user, context, info) => {
    if(user.homepage) {
      return 'Affiliate'
    }
    if(user.name) {
      return 'Client'
    }
  }
}

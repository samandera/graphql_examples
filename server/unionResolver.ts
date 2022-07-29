const UserByRole = {
  __resolveType: (user, context, info) => {
    if(user.companyAddress) {
      return 'Affiliate'
    }
    if(user.homeAddress) {
      return 'Client'
    }
  }
}

export default UserByRole

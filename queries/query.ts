import gql from 'graphql-tag'

const simpleQuery = gql`
  query GetAffiliate($id: ID!) {
    affiliate(where: { id: $id }) {
      id
      employers {
        firstName
        lastName
      }
    }
  }
`

const simpleMutation = gql`
  mutation CreateEmployee($affiliateId: ID, $firstName: String!, $lastName: String!) {
    createEmpolyee(
      data: {
        firstName: $firstName
        lastName: $lastName
      },
      where: {
        ownerId: $affiliateId
      }
    ) {
      id
    }
  }
`

const queryWithFragment = gql`
  query GetUserAddress($email: Email) {
    userUnion(where: { email: $email }) {
      id
      email
      ... on Affiliate {
        companyAddress
      }
      ... on Customer {
        homeAddress
      }
    }
  }
`

const multipleMutations = gql`
  mutation UpdateProduct ($productId: ID!, $price: Int!, $description: String!) {
    updateProductPrice(
      data: { price: $price },
      where: { id: $productId }
    ) {
      id
    }
    updateProductDescription(
      data: { description: $description },
      where: { id: $productId }
    ) {
      id
    }
  }
`

const productDetailsFragment = gql`
  fragment productDetails on Product {
    id
    displayPrice {
      value
      currency
    }
    description
    name
  }
`

const multipleQueriesWithAliases = gql`
  ${productDetailsFragment}

  query CompareProducts($productId1: ID!, $productId2: ID!, $productId3: ID) {
    product1: getProduct(where: { id: $productId1 }) {
      ... productDetails
    }
    product2: getProduct(where: { id: $productId2 }) {
      ... productDetails
    }
    product3: getProduct(where: { id: $productId3 }) {
      ... productDetails
    }
  }
`
const InterfaceQuery = gql`
  query GetUserInterface($id: ID!) {
    userUnion( where: { id: $id }) {
      email
      id
      role
      ... on Affiliate {
        companyAddress
        homepage
      }
      ... on Customer {
        homeAddress
      }
    }
  }
`

const UnionQuery = gql`
  query GetUserUnion($id: ID!) {
    userByRole( where: { id: $id}) {
      ... on Affiliate {
        email
        id
        role
        companyAddress
        homepage
      }
      ... on Customer {
        email
        id
        role
        homeAddress
      }
    }
  }
`

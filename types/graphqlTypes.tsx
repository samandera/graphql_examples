/* eslint-disable */
/* tslint:disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Email: any;
  Url: any;
  Upload: any;
};

export type Affiliate = User & {
  __typename?: "Affiliate";
  email: Scalars["Email"];
  id: Scalars["ID"];
  employers: Array<Employee>;
  role: Role;
  companyAddress: Scalars["String"];
  homepage?: Maybe<Scalars["Url"]>;
  products: Array<Product>;
};

export type CreateEmployeeWhereInput = {
  ownerId?: Maybe<Scalars["ID"]>;
};

export type Currency = "EUR" | "PLN";

export type Customer = User & {
  __typename?: "Customer";
  email: Scalars["Email"];
  id: Scalars["ID"];
  role: Role;
  homeAddress: Scalars["String"];
};

export type Employee = {
  __typename?: "Employee";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type EmployeeCreateInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type File = {
  __typename?: "File";
  id: Scalars["Int"];
  path: Scalars["String"];
};

export type IdWhereInput = {
  id: Scalars["ID"];
};

export type IdWhereOptionalInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createEmpolyee: Employee;
  updateProductPrice: Product;
  updateProductDescription: Product;
  uploadProductPhotoPhoto: Product;
};

export type MutationCreateEmpolyeeArgs = {
  data: EmployeeCreateInput;
  where?: Maybe<CreateEmployeeWhereInput>;
};

export type MutationUpdateProductPriceArgs = {
  data: UpdateProductPriceInput;
  where: IdWhereInput;
};

export type MutationUpdateProductDescriptionArgs = {
  data: UpdateProductDescriptionInput;
  where: IdWhereInput;
};

export type MutationUploadProductPhotoPhotoArgs = {
  data: Scalars["Upload"];
  where: IdWhereInput;
};

export type PhotoProgress = {
  __typename?: "PhotoProgress";
  complete: Scalars["Boolean"];
  photoIdentification: Scalars["String"];
  progress: Scalars["Int"];
  productId: Scalars["Int"];
};

export type Price = {
  __typename?: "Price";
  value: Scalars["Int"];
  currency: Currency;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["Int"];
  description: Scalars["String"];
  name: Scalars["String"];
  image?: Maybe<File>;
  displayPrice: Price;
  originalPrice: Price;
};

export type Query = {
  __typename?: "Query";
  affiliate: Affiliate;
  getProduct: Product;
  userUnion: User;
  userByRole?: Maybe<UserByRole>;
};

export type QueryAffiliateArgs = {
  where: IdWhereInput;
};

export type QueryGetProductArgs = {
  where?: Maybe<IdWhereOptionalInput>;
};

export type QueryUserUnionArgs = {
  where: UserInput;
};

export type QueryUserByRoleArgs = {
  where: UserInput;
};

export type Role = "ADMIN" | "AFFILIATE" | "EMPLOYER" | "CUSTOMER";

export type Subscription = {
  __typename?: "Subscription";
  uploadProductPhotoProgress?: Maybe<PhotoProgress>;
};

export type SubscriptionUploadProductPhotoProgressArgs = {
  where: IdWhereInput;
};

export type UpdateProductDescriptionInput = {
  description: Scalars["String"];
};

export type UpdateProductPriceInput = {
  price: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  email: Scalars["Email"];
  id: Scalars["ID"];
  role: Role;
};

export type UserByRole = Affiliate | Customer;

export type UserInput = {
  id?: Maybe<Scalars["ID"]>;
  email?: Maybe<Scalars["Email"]>;
};

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "User",
        possibleTypes: [
          {
            name: "Affiliate"
          },
          {
            name: "Customer"
          }
        ]
      },
      {
        kind: "UNION",
        name: "UserByRole",
        possibleTypes: [
          {
            name: "Affiliate"
          },
          {
            name: "Customer"
          }
        ]
      }
    ]
  }
};
export default result;
export type GetAffiliateQueryVariables = {
  id: Scalars["ID"];
};

export type GetAffiliateQuery = { __typename?: "Query" } & {
  affiliate: { __typename?: "Affiliate" } & Pick<Affiliate, "id"> & {
      employers: Array<
        { __typename?: "Employee" } & Pick<Employee, "firstName" | "lastName">
      >;
    };
};

export type CreateEmployeeMutationVariables = {
  affiliateId?: Maybe<Scalars["ID"]>;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type CreateEmployeeMutation = { __typename?: "Mutation" } & {
  createEmpolyee: { __typename?: "Employee" } & Pick<Employee, "id">;
};

export type GetUserAddressQueryVariables = {
  email?: Maybe<Scalars["Email"]>;
};

export type GetUserAddressQuery = { __typename?: "Query" } & {
  userUnion: { __typename?: "Affiliate" | "Customer" } & Pick<
    User,
    "id" | "email"
  > &
    (
      | ({ __typename?: "Affiliate" } & Pick<Affiliate, "companyAddress">)
      | ({ __typename?: "Customer" } & Pick<Customer, "homeAddress">));
};

export type UpdateProductMutationVariables = {
  productId: Scalars["ID"];
  price: Scalars["Int"];
  description: Scalars["String"];
};

export type UpdateProductMutation = { __typename?: "Mutation" } & {
  updateProductPrice: { __typename?: "Product" } & Pick<Product, "id">;
  updateProductDescription: { __typename?: "Product" } & Pick<Product, "id">;
};

export type ProductDetailsFragment = { __typename?: "Product" } & Pick<
  Product,
  "id" | "description" | "name"
> & {
    displayPrice: { __typename?: "Price" } & Pick<Price, "value" | "currency">;
  };

export type CompareProductsQueryVariables = {
  productId1: Scalars["ID"];
  productId2: Scalars["ID"];
  productId3?: Maybe<Scalars["ID"]>;
};

export type CompareProductsQuery = { __typename?: "Query" } & {
  product1: { __typename?: "Product" } & ProductDetailsFragment;
  product2: { __typename?: "Product" } & ProductDetailsFragment;
  product3: { __typename?: "Product" } & ProductDetailsFragment;
};

export type GetUserInterfaceQueryVariables = {
  id: Scalars["ID"];
};

export type GetUserInterfaceQuery = { __typename?: "Query" } & {
  userUnion: { __typename?: "Affiliate" | "Customer" } & Pick<
    User,
    "email" | "id" | "role"
  > &
    (
      | ({ __typename?: "Affiliate" } & Pick<
          Affiliate,
          "companyAddress" | "homepage"
        >)
      | ({ __typename?: "Customer" } & Pick<Customer, "homeAddress">));
};

export type GetUserUnionQueryVariables = {
  id: Scalars["ID"];
};

export type GetUserUnionQuery = { __typename?: "Query" } & {
  userByRole: Maybe<

      | ({ __typename?: "Affiliate" } & Pick<
          Affiliate,
          "email" | "id" | "role" | "companyAddress" | "homepage"
        >)
      | ({ __typename?: "Customer" } & Pick<
          Customer,
          "email" | "id" | "role" | "homeAddress"
        >)
  >;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  IdWhereInput: Partial<IdWhereInput>;
  ID: Partial<Scalars["ID"]>;
  Affiliate: Partial<Affiliate>;
  User: Partial<User>;
  Email: Partial<Scalars["Email"]>;
  Role: Partial<Role>;
  Employee: Partial<Employee>;
  String: Partial<Scalars["String"]>;
  Url: Partial<Scalars["Url"]>;
  Product: Partial<Product>;
  Int: Partial<Scalars["Int"]>;
  File: Partial<File>;
  Price: Partial<Price>;
  Currency: Partial<Currency>;
  IdWhereOptionalInput: Partial<IdWhereOptionalInput>;
  UserInput: Partial<UserInput>;
  UserByRole: Partial<ResolversTypes["Affiliate"] | ResolversTypes["Customer"]>;
  Customer: Partial<Customer>;
  Mutation: {};
  EmployeeCreateInput: Partial<EmployeeCreateInput>;
  CreateEmployeeWhereInput: Partial<CreateEmployeeWhereInput>;
  UpdateProductPriceInput: Partial<UpdateProductPriceInput>;
  UpdateProductDescriptionInput: Partial<UpdateProductDescriptionInput>;
  Upload: Partial<Scalars["Upload"]>;
  Subscription: {};
  PhotoProgress: Partial<PhotoProgress>;
  Boolean: Partial<Scalars["Boolean"]>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = { roles?: Maybe<Array<Role>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type OverwriteByParentDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AffiliateResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Affiliate"]
> = {
  email?: Resolver<ResolversTypes["Email"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  employers?: Resolver<
    Array<ResolversTypes["Employee"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  companyAddress?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes["Url"]>, ParentType, ContextType>;
  products?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType
  >;
};

export type CustomerResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Customer"]
> = {
  email?: Resolver<ResolversTypes["Email"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  homeAddress?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export interface EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Email"], any> {
  name: "Email";
}

export type EmployeeResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Employee"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type FileResolvers<
  ContextType = any,
  ParentType = ResolversTypes["File"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Mutation"]
> = {
  createEmpolyee?: Resolver<
    ResolversTypes["Employee"],
    ParentType,
    ContextType,
    MutationCreateEmpolyeeArgs
  >;
  updateProductPrice?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    MutationUpdateProductPriceArgs
  >;
  updateProductDescription?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    MutationUpdateProductDescriptionArgs
  >;
  uploadProductPhotoPhoto?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    MutationUploadProductPhotoPhotoArgs
  >;
};

export type PhotoProgressResolvers<
  ContextType = any,
  ParentType = ResolversTypes["PhotoProgress"]
> = {
  complete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  photoIdentification?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  progress?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type PriceResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Price"]
> = {
  value?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes["Currency"], ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Product"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  displayPrice?: Resolver<ResolversTypes["Price"], ParentType, ContextType>;
  originalPrice?: Resolver<ResolversTypes["Price"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Query"]
> = {
  affiliate?: Resolver<
    ResolversTypes["Affiliate"],
    ParentType,
    ContextType,
    QueryAffiliateArgs
  >;
  getProduct?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    QueryGetProductArgs
  >;
  userUnion?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    QueryUserUnionArgs
  >;
  userByRole?: Resolver<
    Maybe<ResolversTypes["UserByRole"]>,
    ParentType,
    ContextType,
    QueryUserByRoleArgs
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Subscription"]
> = {
  uploadProductPhotoProgress?: SubscriptionResolver<
    Maybe<ResolversTypes["PhotoProgress"]>,
    ParentType,
    ContextType,
    SubscriptionUploadProductPhotoProgressArgs
  >;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export interface UrlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Url"], any> {
  name: "Url";
}

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversTypes["User"]
> = {
  __resolveType: TypeResolveFn<
    "Affiliate" | "Customer",
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["Email"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
};

export type UserByRoleResolvers<
  ContextType = any,
  ParentType = ResolversTypes["UserByRole"]
> = {
  __resolveType: TypeResolveFn<
    "Affiliate" | "Customer",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Affiliate?: AffiliateResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Email?: GraphQLScalarType;
  Employee?: EmployeeResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PhotoProgress?: PhotoProgressResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  Url?: GraphQLScalarType;
  User?: UserResolvers;
  UserByRole?: UserByRoleResolvers;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  overwriteByParent?: OverwriteByParentDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
export const productDetailsFragmentDoc = gql`
  fragment productDetails on Product {
    id
    displayPrice {
      value
      currency
    }
    description
    name
  }
`;
export const GetAffiliateDocument = gql`
  query GetAffiliate($id: ID!) {
    affiliate(where: { id: $id }) {
      id
      employers {
        firstName
        lastName
      }
    }
  }
`;
export type GetAffiliateComponentProps = Omit<
  ReactApollo.QueryProps<GetAffiliateQuery, GetAffiliateQueryVariables>,
  "query"
> &
  ({ variables: GetAffiliateQueryVariables; skip?: false } | { skip: true });

export const GetAffiliateComponent = (props: GetAffiliateComponentProps) => (
  <ReactApollo.Query<GetAffiliateQuery, GetAffiliateQueryVariables>
    query={GetAffiliateDocument}
    {...props}
  />
);

export type GetAffiliateProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetAffiliateQuery, GetAffiliateQueryVariables>
> &
  TChildProps;
export function withGetAffiliate<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetAffiliateQuery,
    GetAffiliateQueryVariables,
    GetAffiliateProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetAffiliateQuery,
    GetAffiliateQueryVariables,
    GetAffiliateProps<TChildProps>
  >(GetAffiliateDocument, {
    alias: "withGetAffiliate",
    ...operationOptions
  });
}
export const CreateEmployeeDocument = gql`
  mutation CreateEmployee(
    $affiliateId: ID
    $firstName: String!
    $lastName: String!
  ) {
    createEmpolyee(
      data: { firstName: $firstName, lastName: $lastName }
      where: { ownerId: $affiliateId }
    ) {
      id
    }
  }
`;
export type CreateEmployeeMutationFn = ReactApollo.MutationFn<
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables
>;
export type CreateEmployeeComponentProps = Omit<
  ReactApollo.MutationProps<
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables
  >,
  "mutation"
>;

export const CreateEmployeeComponent = (
  props: CreateEmployeeComponentProps
) => (
  <ReactApollo.Mutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>
    mutation={CreateEmployeeDocument}
    {...props}
  />
);

export type CreateEmployeeProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables
  >
> &
  TChildProps;
export function withCreateEmployee<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables,
    CreateEmployeeProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateEmployeeMutation,
    CreateEmployeeMutationVariables,
    CreateEmployeeProps<TChildProps>
  >(CreateEmployeeDocument, {
    alias: "withCreateEmployee",
    ...operationOptions
  });
}
export const GetUserAddressDocument = gql`
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
`;
export type GetUserAddressComponentProps = Omit<
  ReactApollo.QueryProps<GetUserAddressQuery, GetUserAddressQueryVariables>,
  "query"
>;

export const GetUserAddressComponent = (
  props: GetUserAddressComponentProps
) => (
  <ReactApollo.Query<GetUserAddressQuery, GetUserAddressQueryVariables>
    query={GetUserAddressDocument}
    {...props}
  />
);

export type GetUserAddressProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserAddressQuery, GetUserAddressQueryVariables>
> &
  TChildProps;
export function withGetUserAddress<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetUserAddressQuery,
    GetUserAddressQueryVariables,
    GetUserAddressProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserAddressQuery,
    GetUserAddressQueryVariables,
    GetUserAddressProps<TChildProps>
  >(GetUserAddressDocument, {
    alias: "withGetUserAddress",
    ...operationOptions
  });
}
export const UpdateProductDocument = gql`
  mutation UpdateProduct($productId: ID!, $price: Int!, $description: String!) {
    updateProductPrice(data: { price: $price }, where: { id: $productId }) {
      id
    }
    updateProductDescription(
      data: { description: $description }
      where: { id: $productId }
    ) {
      id
    }
  }
`;
export type UpdateProductMutationFn = ReactApollo.MutationFn<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export type UpdateProductComponentProps = Omit<
  ReactApollo.MutationProps<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >,
  "mutation"
>;

export const UpdateProductComponent = (props: UpdateProductComponentProps) => (
  <ReactApollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables>
    mutation={UpdateProductDocument}
    {...props}
  />
);

export type UpdateProductProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateProductMutation, UpdateProductMutationVariables>
> &
  TChildProps;
export function withUpdateProduct<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateProductMutation,
    UpdateProductMutationVariables,
    UpdateProductProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateProductMutation,
    UpdateProductMutationVariables,
    UpdateProductProps<TChildProps>
  >(UpdateProductDocument, {
    alias: "withUpdateProduct",
    ...operationOptions
  });
}
export const CompareProductsDocument = gql`
  query CompareProducts($productId1: ID!, $productId2: ID!, $productId3: ID) {
    product1: getProduct(where: { id: $productId1 }) {
      ...productDetails
    }
    product2: getProduct(where: { id: $productId2 }) {
      ...productDetails
    }
    product3: getProduct(where: { id: $productId3 }) {
      ...productDetails
    }
  }
  ${productDetailsFragmentDoc}
`;
export type CompareProductsComponentProps = Omit<
  ReactApollo.QueryProps<CompareProductsQuery, CompareProductsQueryVariables>,
  "query"
> &
  ({ variables: CompareProductsQueryVariables; skip?: false } | { skip: true });

export const CompareProductsComponent = (
  props: CompareProductsComponentProps
) => (
  <ReactApollo.Query<CompareProductsQuery, CompareProductsQueryVariables>
    query={CompareProductsDocument}
    {...props}
  />
);

export type CompareProductsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CompareProductsQuery, CompareProductsQueryVariables>
> &
  TChildProps;
export function withCompareProducts<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CompareProductsQuery,
    CompareProductsQueryVariables,
    CompareProductsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CompareProductsQuery,
    CompareProductsQueryVariables,
    CompareProductsProps<TChildProps>
  >(CompareProductsDocument, {
    alias: "withCompareProducts",
    ...operationOptions
  });
}
export const GetUserInterfaceDocument = gql`
  query GetUserInterface($id: ID!) {
    userUnion(where: { id: $id }) {
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
`;
export type GetUserInterfaceComponentProps = Omit<
  ReactApollo.QueryProps<GetUserInterfaceQuery, GetUserInterfaceQueryVariables>,
  "query"
> &
  (
    | { variables: GetUserInterfaceQueryVariables; skip?: false }
    | { skip: true });

export const GetUserInterfaceComponent = (
  props: GetUserInterfaceComponentProps
) => (
  <ReactApollo.Query<GetUserInterfaceQuery, GetUserInterfaceQueryVariables>
    query={GetUserInterfaceDocument}
    {...props}
  />
);

export type GetUserInterfaceProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserInterfaceQuery, GetUserInterfaceQueryVariables>
> &
  TChildProps;
export function withGetUserInterface<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetUserInterfaceQuery,
    GetUserInterfaceQueryVariables,
    GetUserInterfaceProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserInterfaceQuery,
    GetUserInterfaceQueryVariables,
    GetUserInterfaceProps<TChildProps>
  >(GetUserInterfaceDocument, {
    alias: "withGetUserInterface",
    ...operationOptions
  });
}
export const GetUserUnionDocument = gql`
  query GetUserUnion($id: ID!) {
    userByRole(where: { id: $id }) {
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
`;
export type GetUserUnionComponentProps = Omit<
  ReactApollo.QueryProps<GetUserUnionQuery, GetUserUnionQueryVariables>,
  "query"
> &
  ({ variables: GetUserUnionQueryVariables; skip?: false } | { skip: true });

export const GetUserUnionComponent = (props: GetUserUnionComponentProps) => (
  <ReactApollo.Query<GetUserUnionQuery, GetUserUnionQueryVariables>
    query={GetUserUnionDocument}
    {...props}
  />
);

export type GetUserUnionProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserUnionQuery, GetUserUnionQueryVariables>
> &
  TChildProps;
export function withGetUserUnion<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetUserUnionQuery,
    GetUserUnionQueryVariables,
    GetUserUnionProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserUnionQuery,
    GetUserUnionQueryVariables,
    GetUserUnionProps<TChildProps>
  >(GetUserUnionDocument, {
    alias: "withGetUserUnion",
    ...operationOptions
  });
}

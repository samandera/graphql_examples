import React from 'react'
import {
  GetAffiliateQuery
  GetAffiliateDocument,
  GetAffiliateQueryVariables
} from '../types/grapqlTypes'
import { useApolloClient } from '@apollo/client';

================================================================================

const QueryAffiliate = ({ id }) => {
  const { loading, error, data } = useQuery<GetAffiliateQuery, GetAffiliateQueryVariables>(
    GetAffiliateDocument,
    { variables: { id } }
  )
  return (
    <>
      {data}
    </>
  )
}

================================================================================

const QueryAffiliateWithModifyingCache = ({ id }) => {
  const { loading, error, data } = useQuery<GetAffiliateQuery, GetAffiliateQueryVariables>(
    GetAffiliateDocument,
    {
      variables: { id },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  )
  return (
    <>
      {data}
    </>
  )
}

================================================================================

const LazyQueryAffiliate = ({ id }) => {
  const [getAffiliate, { loading, error, data }] = useLazyQuery<GetAffiliateQuery, GetAffiliateQueryVariables>(
    GetAffiliateDocument,
    {
      variables: { id },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  )
  return (
    <>
      {data}
      <button onClick={() => getAffiliate({ variables: { id: newId }})}
    </>
  )
}

================================================================================

const QueryPaginatedProducts = ({ id }) => {
  const [ offset, setOffset ] = useState(0)
  const { loading, error, data, fetchMore } = useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    {
      variables: { offset, limit: 10 },
      onCompleted: () => {
        setOffset(prevState => prevState + 10)
      },
    }
  )
  return (
    <>
      {data}
      <button onClick{() => { fetchMore({ variables: { offset } }) }} />
    </>
  )
}


const customCacheApolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  }),
  uri
})

================================================================================

const MutationCreateEmployee = ({
  affiliateId,
  firstName,
  lastName,
}) => {
  const [createEmployee, { loading, error, data }] = useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(
    CreateEmployeeDocument,
    {
      refetchQueries: ['Employees']
    }
  )
  return (
    <>
      {data}
      <button
        onClick={() => createEmployee({
          variables: {
            affiliateId,
            firstName,
            lastName,
          }
        })}
      />
    </>
  )
}

================================================================================

const UpdateCacheMutationCreateEmployee = ({
  employeeId,
  firstName,
  lastName,
}) => {
  const [updateEmployee, { loading, error, data }] = useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(
    UpdateEmployeeDocument,
    {
      update(cache, { data: newData }) {
        const { employee } = cache.readQuery({
          query: EmployeeDocument,
          variables: { employeeId }
        })
        cache.writeQuery({
          query: EmployeeDocument,
          data: {
            lastName: newData.employee.lastName
          },
          variables: { employeeId }
        })
      }
    }
  )
  return (
    <>
      {data.employee}
      <button
        onClick={() => updateEmployee({
          variables: {
            employeeId,
            firstName,
            lastName,
          }
        })}
      />
    </>
  )
}

================================================================================

const SubscriptionPhotosUpload: React.FunctionComponent<{ productId: number }> = props => {
  const [photos, setPhotos] = React.useState<PhotosType[]>([])
  const [
    uploadProductPhoto,
    { error: mutationError }
  ] = useMutation<{}, UploadProductPhotoMutationVariables>(UploadProductPhoto)
  const { data: subscriptionData, error: subscriptionError } = useSubscription<{
    uploadProductPhotoProgress: UploadProductPhotoProgressType
  }>(UploadProductPhotoProgress, { variables: { productId: props.productId } })

  React.useEffect(() => {
    const photosCopy: PhotosType[] = [ ...photos ]
    if (subscriptionData && subscriptionData.uploadProductPhotoProgress) {
      const indexOfUpdatedPhoto = photosCopy.findIndex(p => p.photoIdentification === subscriptionData.uploadProductPhotoProgress.photoIdentification)
      if (indexOfUpdatedPhoto >= 0) {
        photosCopy[indexOfUpdatedPhoto].progress = subscriptionData.uploadProductPhotoProgress.progress
        setPhotos(photosCopy)
      }
    }
  }, [subscriptionData])

  return (
    <Panel>
      <input
        name='photos'
        type='file'
        accept='image/png, image/jpeg'
        onChange={event => {
          if (event.currentTarget && event.currentTarget.files) {
            const photosCopy: PhotosType[] = []
            Object.values(event.currentTarget.files).map((f, idx) => {
              photosCopy.push({
                file: f,
                photoIdentification: `${idx}`,
                progress: 0,
                productId: props.productId
              })
            })
            setPhotos(photosCopy)
          }
        }}
        multiple
      />
      <Button
        onClick={() => {
          photos.map((p, idx) => {
            uploadProductPhoto({ variables: {
              file: p.file,
              photoIdentification: p.photoIdentification,
              productId: props.productId
            }}).catch(e => {
              log.debug(e.message)
            })
          })
        }}
        disabled={!photos.length}
      />
      <PhotosUploadProcessList photos={photos} />
    </Panel>
  )
}

================================================================================

const LazySubscription: React.FunctionComponent<{ productId: number }> = props => {
  const [photosData, setPhotosData] = React.useState<PhotosType[]>([])
  const [photoSubscription, setPhotoSubscription] = React.useState<>()
  const [
    uploadProductPhoto,
    { error: mutationError }
  ] = useMutation<{}, UploadProductPhotoMutationVariables>(UploadProductPhoto)
  const client = useApolloClient()
  const  subscription = client.subscribe({
    query: UploadProductPhotoProgress,
    variables: {
      productId: props.productId,
    },
  })

  const startSubscrition = () => subscription.subscribe(({ data }) => {
    setPhotosData(data.uploadProductPhotoProgress);
  });

  React.useEffect(() => {
    if (photosData.complete) {
      photoSubscription.unsubscribe()
    }
  }, [photosData])

  return (
    <Panel>
      <input />
      <Button
        onClick={() => {
          photos.map((p, idx) => {
            uploadProductPhoto({ variables: {
              file: p.file,
              photoIdentification: p.photoIdentification,
              productId: props.productId
            }}).catch(e => {
              log.debug(e.message)
            })
          })
          setPhotoSubscription(startSubscrition())
        }}
        disabled={!photos.length}
      />
      <PhotosUploadProcessList photos={photos} />
    </Panel>
  )
}

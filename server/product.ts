import { GraphQLUpload } from 'graphql-upload'
import { pubsub } from './server'

export const Upload = GraphQLUpload

const trackUploadPhotoProgress = (subscription: PhotoProgressInput) => {
  pubsub.publish('UploadProductPhotoProgress', { uploadProductPhotoPhotoProgress: subscription }).catch(error => {
    throw new Error(error.message)
  })
}

export const uploadProductPhotoPhoto = async (obj, args, context, info) => {
  const { file, photoIdentification, ...data } = args.data
  const subscription = {
    complete: false,
    photoIdentification,
    progress: 0,
    productPhotoId: data.productPhotoId
  }
  trackUploadPhotoProgress(subscription)

  const pipe = pipeWithProgressFn(
    subscription,
    trackUploadPhotoProgress,
    context.request.headers['content-length']
  )

  const savedPhoto = await createPhoto({
    data: {
      ...
    }
  })
  if (savedPhoto) {
    subscription.complete = true
    subscription.progress = 100
    trackUploadPhotoProgress(subscription)
  }
  return savedPhoto
}

export const uploadProductPhotoProgress = {
  resolve: (parent, args, context, info) => {
    const productId = args.where.productId
    if (parent.uploadProductPhotoProgress.productId === productId) {
      return parent.uploadProductPhotoProgress
    }
  },
  subscribe: () => pubsub.asyncIterator(['UploadProductPhotoProgress'])
}

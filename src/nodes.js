import createNodeHelpers from "gatsby-node-helpers"
import { createRemoteFileNode } from "gatsby-source-filesystem"

const TYPE_PREFIX = `Pilon`
// Node types
const Product = `Product`
const ProductAdditionalImage = `ProductAdditionalImage`
const Price = `Price`

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
})

const handleMediaFile = async (
  { url, id },
  { createNode, createNodeId, touchNode, store, cache }
) => {
  let fileNodeID

  const mediaDataCacheKey = `${TYPE_PREFIX}__Media__${id}`
  const cacheMediaData = await cache.get(mediaDataCacheKey)

  if (cacheMediaData) {
    fileNodeID = cacheMediaData.fileNodeID
    touchNode({
      nodeId: fileNodeID,
    })
    return fileNodeID
  }

  const fileNode = await createRemoteFileNode({
    url,
    store,
    cache,
    createNode,
    createNodeId,
  })

  if (fileNode) {
    fileNodeID = fileNode.id
    await cache.set(mediaDataCacheKey, {
      fileNodeID,
    })

    return fileNodeID
  }

  return undefined
}

export const ProductNode = args =>
  createNodeFactory(Product, async node => {
    if (node.image) {
      node.image.localFile___NODE = await handleMediaFile(
        {
          id: node.image.id,
          url: node.image.contentUrl,
        },
        args
      )
    }
    if (node.prices)
      node.prices___NODE = node.prices.edges.map(edge =>
        generateNodeId(Price, edge.node.id)
      )
    if (node.additionalImages)
      node.additionalImages___NODE = node.additionalImages.edges.map(edge =>
        generateNodeId(ProductAdditionalImage, edge.node.id)
      )

    return node
  })

export const PriceNode = () =>
  createNodeFactory(Price, node => {
    if (node.product)
      node.product___NODE = generateNodeId(Product, node.product.id)
    return node
  })

export const ProductImageNode = args =>
  createNodeFactory(ProductAdditionalImage, async node => {
    if (node.image) {
      node.image.localFile___NODE = await handleMediaFile(
        {
          id: node.image.id,
          url: node.image.contentUrl,
        },
        args
      )
    }
    if (node.product)
      node.product___NODE = generateNodeId(Product, node.product.id)

    return node
  })

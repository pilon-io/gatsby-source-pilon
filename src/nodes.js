import createNodeHelpers from "gatsby-node-helpers"
import { map } from "p-iteration"
import { createRemoteFileNode } from "gatsby-source-filesystem"

const TYPE_PREFIX = `Pilon`

const { createNodeFactory } = createNodeHelpers({
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
  createNodeFactory(`Product`, async node => {
    if (node.image) {
      node.image.localFile___NODE = await handleMediaFile(
        {
          id: node.image.id,
          url: node.image.contentUrl,
        },
        args
      )
    }
    if (node.additionalImages && node.additionalImages.edges) {
      node.additionalImages = await map(
        node.additionalImages.edges,
        async edge => {
          edge.node.localFile___NODE = await handleMediaFile(
            {
              id: edge.node.id,
              url: edge.node.image.contentUrl,
            },
            args
          )
          return edge.node
        }
      )
    }

    return node
  })

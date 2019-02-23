import { forEach } from "p-iteration"
import { createClient, auth, queryAll } from "./pilon"
import { ProductNode, PriceNode, ProductImageNode } from "./nodes"
import { PRODUCTS_QUERY, PRODUCT_IMAGES_QUERY, PRICES_QUERY } from "./queries"
import invariant from "invariant"

export const sourceNodes = async (
  { actions: { createNode, touchNode }, createNodeId, store, cache },
  { environmentId, pilonBaseUrl = `https://api.pilon.io` }
) => {
  invariant(
    environmentId && environmentId.length > 0,
    `gatsby-source-pilon requires option \`environmentId\` to be specified`
  )
  const authToken = await auth(pilonBaseUrl, environmentId)
  const client = createClient(pilonBaseUrl, authToken)

  const args = {
    client,
    createNode,
    createNodeId,
    touchNode,
    store,
    cache,
  }

  try {
    await Promise.all([
      createNodes(`prices`, PRICES_QUERY, PriceNode, args),
      createNodes(
        `productImages`,
        PRODUCT_IMAGES_QUERY,
        ProductImageNode,
        args
      ),
      createNodes(`products`, PRODUCTS_QUERY, ProductNode, args),
    ])
  } catch (e) {
    console.log(e)
    console.error(`An error occured while sourcing data`)
  }
}

/**
 *
 * @param {string} path path to the graphql query
 * @param {string} query the graphql query to execute
 * @param {func} nodeFactory the factory function for the running node
 * @param {object} args necessary helper functions
 */
const createNodes = async (path, query, nodeFactory, args) => {
  const { client, createNode } = args
  await forEach(await queryAll(client, [path], query), async entity => {
    const node = await nodeFactory(args)(entity)
    createNode(node)
  })
}

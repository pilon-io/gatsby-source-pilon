import { GraphQLClient } from "graphql-request"
import { get, last } from "lodash/fp"

/**
 * Create a GraphQL client
 * @param {string} baseUrl A pilon API url
 * @param {string} authToken A token retrieved from the Pilon API
 */
export const createClient = (baseUrl, authToken) =>
  new GraphQLClient(`${baseUrl}/graphql`, {
    headers: {
      Authorization: `CUSTOMER-SESSION-ID ${authToken}`,
    },
  })

/**
 * Execute a graphql query and get results without paginating
 * @param {GraphQLClient} client
 * @param {string} query A graphql query to execute
 * @param {number} first number of results to retrieve
 * @param {string} after id for setting the offset
 */

export const queryOnce = async (client, query, first = 250, after) =>
  await client.request(query, {
    first,
    after,
  })

/**
 * Get all paginated data from a query
 * @param {GraphQLClient} client
 * @param {string} path the path to the query
 * @param {string} query graphql query
 * @param {number} first number of results to retrieve
 * @param {string} after id for setting the offset
 * @param {array} aggregatedResponse aggregator
 */
export const queryAll = async (
  client,
  path,
  query,
  first = 100,
  after,
  aggregatedResponse
) => {
  const data = await queryOnce(client, query, first, after)

  const edges = get([...path, `edges`], data)
  const nodes = edges.map(edge => edge.node)

  aggregatedResponse
    ? (aggregatedResponse = aggregatedResponse.concat(nodes))
    : (aggregatedResponse = nodes)

  if (get([...path, `pageInfo`, `hasNextPage`], data))
    return queryAll(
      client,
      path,
      query,
      first,
      last(edges).cursor,
      aggregatedResponse
    )

  return aggregatedResponse
}

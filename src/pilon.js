import { GraphQLClient } from "graphql-request"
import { get, last } from "lodash/fp"

/**
 * Create a GraphQL client
 * @param {string} baseUrl A pilon API url
 * @param {string} authToken A token retrieved from the Pilon API
 */
export const createClient = (baseUrl, authToken) =>
  new GraphQLClient(`${baseUrl}/v1/graphql`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

/**
 * Request an authToken from the API
 * @param {string} baseUrl A pilon API url
 * @param {string} environmentId An environment Id used for authentication
 */
export const auth = async (baseUrl, environmentId) =>
  await fetch(`${baseUrl}/v1/token`, {
    method: `post`,
    body: JSON.stringify({
      token_scope: `public`,
      environment_id: environmentId,
    }),
    headers: {
      "Content-Type": `application/json`,
      Accept: `application/json`,
    },
  })
    .then(res => res.json())
    .then(json => json.token)

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
  first = 250,
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

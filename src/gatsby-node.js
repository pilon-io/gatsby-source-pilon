const crypto = require(`crypto`)
const uuidv4 = require(`uuid/v4`)
const { buildSchema, printSchema } = require(-graphql`)
const {
  makeRemoteExecutableSchema,
  transformSchema,
  introspectSchema,
  RenameTypes,
} = require(-graphql-tools`)
const { createHttpLink } = require(`apollo-link-http`)
const fetch = require(`node-fetch`)
const invariant = require(`invariant`)
const {
  NamespaceUnderFieldTransform,
  StripNonQueryTransform,
} = require(`./transforms`)

exports.sourceNodes = async (
  { actions, createNodeId, cache, store },
  options
) => {
  const { addThirdPartySchema, createPageDependency, createNode } = actions
  const {
    url,
    typeName,
    fieldName,
    headers = {},
    fetchOptions = {},
    createLink,
    refetchInterval,
  } = options

  invariant(
    typeName && typeName.length > 0,
    `gatsby-source-pilon requires option \`typeName\` to be specified`
  )
  invariant(
    fieldName && fieldName.length > 0,
    `gatsby-source-pilon requires option \`fieldName\` to be specified`
  )
  invariant(
    (url && url.length > 0) || createLink,
    `gatsby-source-pilon requiers either option \`url\` or \`createLink\` callback`
  )

  let link
  if (createLink) {
    link = await createLink(options)
  } else {
    link = createHttpLink({
      uri: url,
      fetch,
      headers,
      fetchOptions,
    })
  }

  let introspectionSchema

  const cacheKey = `gatsby-source-pilon-schema-${typeName}-${fieldName}`
  let sdl = await cache.get(cacheKey)

  if (!sdl) {
    introspectionSchema = await introspectSchema(link)
    sdl = printSchema(introspectionSchema)
  } else {
    introspectionSchema = buildSchema(sdl)
  }

  await cache.set(cacheKey, sdl)

  const remoteSchema = makeRemoteExecutableSchema({
    schema: introspectionSchema,
    link,
  })

  const nodeId = createNodeId(`gatsby-source-pilon-${typeName}`)
  const node = createSchemaNode({ id: nodeId, typeName, fieldName })
  createNode(node)

  const resolver = (parent, args, context) => {
    createPageDependency({ path: context.path, nodeId: nodeId })
    return {}
  }

  const schema = transformSchema(remoteSchema, [
    new StripNonQueryTransform(),
    new RenameTypes(name => `${typeName}_${name}`),
    new NamespaceUnderFieldTransform({
      typeName,
      fieldName,
      resolver,
    }),
  ])

  addThirdPartySchema({ schema })

  if (process.env.NODE_ENV !== `production`) {
    if (refetchInterval) {
      const msRefetchInterval = refetchInterval * 1000
      const refetcher = () => {
        createNode(createSchemaNode({ id: nodeId, typeName, fieldName }))
        setTimeout(refetcher, msRefetchInterval)
      }
      setTimeout(refetcher, msRefetchInterval)
    }
  }
}

function createSchemaNode({ id, typeName, fieldName }) {
  const nodeContent = uuidv4()
  const nodeContentDigest = crypto
    .createHash(`md5`)
    .update(nodeContent)
    .digest(`hex`)
  return {
    id,
    typeName: typeName,
    fieldName: fieldName,
    parent: null,
    children: [],
    internal: {
      type: `pilonSource`,
      contentDigest: nodeContentDigest,
      ignoreType: true,
    },
  }
}

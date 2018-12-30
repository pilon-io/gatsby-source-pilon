# gatsby-source-pilon

A plugin for sourcing data from [Pilon](https://pilon.io)'s e-commerce APIs into your Gatsby project.

This plugin was modeled after the `gatsby-source-graphql` plugin and similarly uses schema-stitching to bring the Pilon GraphQL API into Gatsby.

See the [Pilon Docs](https://docs.pilon.io) for more information on our APIs.

## Install

`npm install --save gatsby-source-pilon`

## How to use

Configure the plugin your `gatsby-config.js`:
```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    // Simple config, passing Pilon Environment ID
    {
      resolve: "gatsby-source-pilon",
      options: {
        // Pilon unique Environment ID string
        environmentId: "d4b5d41e-0ba5-11e9-b09e-f50d146a1f11",
      },
    },
    // Passing a specific base URL for the Pilon API
    {
      resolve: "gatsby-source-pilon",
      options: {
        pilonUrl: "https://api.pilon.io",
        // Pilon unique Environment ID string
        environmentId: "d4b5d41e-0ba5-11e9-b09e-f50d146a1f11",
      },
    },
  ],
}
```

### Configuration options

**`environmentId`** [string][required]

Pilon Environment ID.

**`pilonUrl`** [string][optional] [default: `'https://api.pilon.io'`]

Base URL for the Pilon API connection.

**`refetchInterval`** [integer][optional]

Interval to refetch API data (in development environment).  See **Refetching data** below.

## How to Query

```graphql
{
  # An example of querying for the entire product catalog
  query ProductsQuery {
    pilon {
      products {
        edges {
          node {
            id
            sku
            name
            slug
            shortDesc
          }
        }
      }
    }
  }
}
```

## Refetching data

By default, `gatsby-source-pilon` will only refetch the data once the server is restarted. Because this plugin was copied from `gatsby-source-graphql`, it's also possible to configure the plugin to periodically refetch the data. The option is called `refetchInterval` and specifies the timeout in seconds.

```js
module.exports = {
  plugins: [
    // Simple config, passing URL
    {
      resolve: "gatsby-source-pilon",
      options: {
        // Pilon unique Environment ID string
        environmentId: "d4b5d41e-0ba5-11e9-b09e-f50d146a1f11",

        // refetch interval in seconds
        refetchInterval: 60,
      },
    },
  ],
}
```

## Get in touch

If you have questions or want to learn more about Pilon, reach out to us at [info@pilon.io](mailto:info@pilon.io).
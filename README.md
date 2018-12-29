# gatsby-source-pilon

Plugin for connecting Gatsby to Pilon API-first e-commerce platform.

## Install

`npm install --save gatsby-source-pilon`

## How to use

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

# Refetching data

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

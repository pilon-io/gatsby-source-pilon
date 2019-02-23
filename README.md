# gatsby-source-pilon

A plugin for sourcing data from [Pilon](https://pilon.io)'s e-commerce APIs into your Gatsby project.

See the [Pilon Docs](https://docs.pilon.io) for more information on our APIs.

## Install

`npm install --save gatsby-source-pilon`

## How to use

Configure the plugin in your `gatsby-config.js`:

```
{
  resolve: `gatsby-source-pilon`,
  options: {
    // Pilon unique Environment ID string
    environmentId: `f0ae3074-0abc-11e9-ac24-75bf70175027`,
    // Pilon url API
    pilonUrl: "https://api.pilon.io",
  },
}
```

## How to Query

```graphql
{
  allPilonProduct {
    edges {
      node {
        name
        shortDesc
        primaryPrice
        weight
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 450) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
```

The available nodes provided by the plugin are:

- product information (`allPilonProduct` or `pilonProduct`)
- prices (`allPilonPrice` or `pilonPrice`)
- product images (`allPilonProductImage` or `pilonProductImage`)

The plugin sets foreign keys between the different nodes. You are able to retrieve product information from a price or product image node by doing doing the following:

```
{
  allPilonPrice {
    edges {
      node {
        currency
        qty
        amount
        product {
          name
        }
      }
    }
  }
}

```

In a similar fashion you can query for the additionalImages and prices of a product:

```
{
  query ExampleQuery {
    allPilonProduct {
      edges {
        node {
          name
          shortDesc
          primaryPrice
          weight
          additionalImages {
            id
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    src
                    srcSet
                    base64
                    aspectRatio
                  }
                }
              }
            }
          }
          prices {
            id
            currency
            qty
            amount
          }
        }
      }
    }
  }
}
```

## Get in touch

If you have questions or want to learn more about Pilon, reach out to us at [info@pilon.io](mailto:info@pilon.io).

# gatsby-source-pilon

A plugin for sourcing data from [Pilon](https://pilon.io)'s e-commerce APIs into your Gatsby project.

This plugin was modeled after the `gatsby-source-graphql` plugin and similarly uses schema-stitching to bring the Pilon GraphQL API into Gatsby.

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

## Get in touch

If you have questions or want to learn more about Pilon, reach out to us at [info@pilon.io](mailto:info@pilon.io).

import React from "react"
import { graphql } from "gatsby"
import { Box, Grommet, ResponsiveContext, Grid } from "grommet"
import { customTheme } from "../theme"
import Header from "../components/Header"
import Product from "../components/Product"

const Example = ({ data: { allPilonProduct } }) => (
  <Grommet full theme={customTheme}>
    <Box background="brand">
      <Header />
    </Box>
    <Box>
      <Box margin={{ horizontal: `xlarge` }}>
        <ResponsiveContext.Consumer>
          {size => (
            <Grid columns={size || `small`} gap="small">
              {allPilonProduct.edges.map(product => (
                <Product key={product.node.name} product={product.node} />
              ))}
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </Box>
    </Box>
  </Grommet>
)

export const pageQuery = graphql`
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
                  fluid(maxWidth: 1000) {
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
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  src
                  srcSet
                  base64
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Example

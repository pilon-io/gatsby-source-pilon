export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          sku
          slug
          name
          shortDesc
          longDesc
          image {
            id
            contentUrl
          }
          weight
          requiresShipping
          primaryPrice
          attributes
          created
          updated
        }
      }
    }
  }
`

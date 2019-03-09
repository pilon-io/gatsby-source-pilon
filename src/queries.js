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
            encodingFormat
            contentSize
            created
            updated
          }
          weight
          requiresShipping
          primaryPrice
          attributes
          created
          updated
          prices {
            edges {
              node {
                id
              }
            }
          }
          additionalImages {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`

export const PRICES_QUERY = `
  query GetPrices($first: Int!, $after: String) {
    prices(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          product {
            id
          }
          currency
          qty
          amount
          attributes
          created
          updated
        }
      }
    }
  }
`

export const PRODUCT_IMAGES_QUERY = `
  query GetAdditionalImages($first: Int!, $after: String) {
    productImages(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          product {
            id
          }
          image {
            encodingFormat
            contentUrl
            contentSize
            created
            updated
          }
          attributes
          created
          updated
        }
      }
    }
  }
`

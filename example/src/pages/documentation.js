import React from "react"
import { Box, Grommet, Heading, Markdown } from "grommet"
import { customTheme } from "../theme"
import Header from "../components/Header"
import styled from "styled-components"

const StyledPre = styled.pre`
  white-space: pre-wrap;
  padding: 0.5em;
  font-family: "monospace";
  font-size: 80%;
`

const CONTENT = `
## Install

\`npm install --save gatsby-source-pilon\`

## How to use

Configure the plugin in your \`gatsby-config.js\`:

\`\`\`
{
  resolve: \`gatsby-source-pilon\`,
  options: {
    // Pilon unique Environment ID string
    environmentId: \`f0ae3074-0abc-11e9-ac24-75bf70175027\`,
    // Pilon url API
    pilonUrl: "https://api.pilon.io",
  },
}
\`\`\`

## How to Query

\`\`\`graphql
{
  allPilonProduct {
    edges {
      node {
        name
        shortDesc
        primaryPrice
        weight
        image{
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
\`\`\`
`

const DocumentationPage = () => (
  <Grommet full theme={customTheme}>
    <Box background="brand">
      <Header />
      <Box align="center" margin={{ horizontal: `small` }}>
        <Box round border align="center" pad={{ horizontal: `small` }}>
          <Heading size="small">Documentation</Heading>
          <Markdown options={{ overrides: { pre: StyledPre } }}>
            {CONTENT}
          </Markdown>
        </Box>
      </Box>
    </Box>
  </Grommet>
)

export default DocumentationPage

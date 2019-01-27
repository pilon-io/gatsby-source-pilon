import React from "react"
import { Box, Grommet, Heading, Paragraph, Anchor } from "grommet"
import { Github, Install } from "grommet-icons"
import { customTheme } from "../theme"
import Logo from "!svg-react-loader!../images/logo.svg"
import Header from "../components/Header"

const IndexPage = () => (
  <Grommet fill full theme={customTheme}>
    <Box background="brand" fill>
      <Header />
      <Box align="center" margin={{ horizontal: `small` }}>
        <Box round border align="center" pad={{ horizontal: `medium` }}>
          <Heading size="small">Gatsby source Pilon</Heading>
          <Paragraph size="medium" textAlign="left">
            This gatsby plugin enables you to pull in your Pilon data in from of
            gatsby nodes. For the moment the plugin is able to retrieve all
            basic information of your available products along with their prices
            and additional images.
          </Paragraph>
          <Paragraph size="medium" textAlign="left">
            Gatsby-source-pilon makes use of the gatsby internal API in order
            for you to be able to run gatsby-plugin-sharp on the product images.
          </Paragraph>
          <Box
            flex={false}
            direction="row"
            align="center"
            justify="center"
            gap="small"
          >
            <Anchor
              target="_blank"
              a11yTitle="Look it up on NPM"
              href="https://www.npmjs.com/package/gatsby-source-pilon"
              icon={<Install size="large" />}
            />
            <Anchor
              target="_blank"
              a11yTitle="Share feedback on Github"
              href="https://github.com/pilon-io/gatsby-source-pilon"
              icon={<Github size="large" />}
            />
            <Anchor
              target="_blank"
              a11yTitle="Pilon"
              href="https://pilon.io/"
              icon={<Logo style={{ width: 100 }} />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  </Grommet>
)

export default IndexPage

import React from "react"
import Img from "gatsby-image"
import { Box, Heading, Paragraph, Text } from "grommet"
import { Currency } from "grommet-icons"

const Product = ({ product: { name, shortDesc, primaryPrice, image } }) => {
  console.log(name, shortDesc)
  return (
    <Box align="start" fill pad="small">
      <Box fill="horizontal" elevation="small" round="xsmall">
        <Img fluid={image.localFile.childImageSharp.fluid} />
        <Box pad="small">
          <Heading color="brand" level="3" margin="none">
            {name}
          </Heading>
          <Paragraph size="small" margin={{ horizontal: `medium` }}>
            {shortDesc}
          </Paragraph>
          <Box
            direction="row"
            gap="xsmall"
            align="center"
            margin={{ left: `xsmall`, top: `xsmall` }}
            justify="end"
          >
            <Currency color="brand" size="medium" />
            <Text size="small">{primaryPrice}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Product

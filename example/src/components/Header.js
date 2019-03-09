import React from "react"
import { Box, Button, ResponsiveContext } from "grommet"
import { push } from "gatsby"
import Logo from "!svg-react-loader!../images/logo.svg"

const Header = () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        direction="row"
        justify="between"
        margin={{ horizontal: `large`, vertical: `small` }}
        align="center"
      >
        <Button
          onClick={() => push(`/`)}
          icon={<Logo style={{ width: size === `small` ? 100 : 150 }} />}
        />
        <Box pad="small" gap="medium" direction="row-responsive">
          <Button
            color="white"
            label="Documentation"
            onClick={() => push(`/documentation/`)}
          />
          <Button
            color="white"
            label="Example"
            onClick={() => push(`/example/`)}
          />
        </Box>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Header

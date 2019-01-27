import { deepFreeze } from "grommet/utils"
import "typeface-open-sans"

export const customTheme = deepFreeze({
  global: {
    colors: {
      background: `#ffffff`,
      brand: `#185048`,
    },
    font: {
      family: `Open Sans, Arial, sans-serif`,
    },
  },
  anchor: {
    color: {
      dark: `#ffffff`,
      light: `#ffffff`,
    },
  },
  tab: {
    active: {
      color: `white`,
    },
    color: `white`,
  },
})

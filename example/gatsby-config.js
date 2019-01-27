require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `gatsby example using pilon`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: require.resolve(`..`),
      options: {
        environmentId: process.env.PILON_ID,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `/images/`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}

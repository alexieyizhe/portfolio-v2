const path = require(`path`); // eslint-disable-line

module.exports = {
  siteMetadata: {
    title: `alexxie.ca`,
    description: ``,
    author: `@alexieyizhe`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~assets": "src/assets",
          "~components": "src/components",
          "~layouts": "src/layouts",
          "~pages": "src/pages",
          "~sections": "src/sections",
          "~theme": "src/theme",
          "~types": "src/types",
          "~utils": "src/utils",
          "~src": "src",
        },
        extensions: ["ts", "tsx", "json"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Overpass`,
            variants: [`400`, `600`, `700`],
          },
          { family: `Roboto` },
        ],
      },
    },
  ],
};

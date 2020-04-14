module.exports = {
  siteMetadata: {
    title: 'Portfolio',
    titleSuffix: '|',
    sitename: 'Anton Pedersen',
    siteUrl: 'https://hallonanton-portfolio.netlify.app/',
    description: 'Mitt namn är Anton Pedersen. Jag är en social Front-end utvecklare med erfarenhet av båda stora och små projekt. Baserad i Göteborg.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    'gatsby-plugin-glslify',
    'gatsby-plugin-emotion',
    'gatsby-plugin-compression-v2',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/`
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#2ecc71',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: "Source Sans Pro",
              variants: ["200", "400"],
              fontDisplay: 'swap',
              strategy: 'selfHosted'
            },
          ],
        },
        //formats: ['woff2', 'woff'],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },    
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          "https://fonts.googleapis.com",
          "/fonts/HelveticaNeue/stylesheet.css",
        ]
      }
    }
  ],
}

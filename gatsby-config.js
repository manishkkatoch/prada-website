/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-anchor-links`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: '@priyank-vaghela/gatsby-custom-theme-instagram',
			options: {
				type: `account`, // optional. `account` is the default `type` value
				username: 'pradaxina'
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
			  name: `paintings`,
			  path: `${__dirname}/static/paintings`,
			},
		  },
		  {
			resolve: `gatsby-source-filesystem`,
			options: {
			  name: `others`,
			  path: `${__dirname}/static/others`,
			},
		  }
	]
};

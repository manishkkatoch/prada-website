const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
let PaintingData = require('./static/data/metadata.json');
let data = JSON.parse(JSON.stringify(PaintingData));

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `ImageSharp`) {
        const fileNode = getNode(node.parent)
        let datat = data.items.filter((f) => f.id == fileNode.name)[0];
        const slug = datat && "/work/" + datat.title.replace(/\s/g,"-").toLowerCase()
        
        createNodeField({
            node,
            name: `slug`,
            value: slug,
          })
          createNodeField({
            node,
            name: `workData`,
            value: datat,
          })
      }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allImageSharp {
          edges {
            node {
              fields {
                slug,
                workData {
                    id,
                    sold,
                    title,
                    size,
                    frame
                }
              }
            }
          }
        }
      }
    `)
    result.data.allImageSharp.edges.forEach(({ node }) => {
        console.log("node fields:", JSON.stringify(node.fields))
        node.fields.slug &&
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/work-details.js`),
        context: {
          slug: node.fields.slug,
          work: node.fields.workData
        }
      })
    })
  }
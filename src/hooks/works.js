import { useStaticQuery, graphql } from "gatsby"

export default function useMyWorks() {
    return useStaticQuery(graphql`
    query {
      watercolor: allFile(filter: {absolutePath: {regex: "/paintings/water/"}}) {
              edges {
                node {
                  childImageSharp {
                    id
                    resize(width: 900, height: 900, cropFocus: CENTER) {
                      src
                    }
                  }
                  absolutePath
                  name
                }
              }
              totalCount
            },
            charcoal: allFile(filter: {absolutePath: {regex: "/paintings/charcoal/"}}) {
              edges {
                node {
                  childImageSharp {
                    id
                    resize(width: 900, height: 900, cropFocus: CENTER) {
                      src
                    }
                  }
                  absolutePath
                  name
                }
              }
              totalCount
            }
    }
  `);
  }

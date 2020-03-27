import React from "react"
import Layout from "../components/layout"
import "../styles/details.scss";
import Img from 'gatsby-image';

export default (props) => {
    let data = props.data
    let workData = props.pathContext.work
    console.log(props.pathContext)
  return (
    <Layout>
      <div className="detail-container">
        <section className="art-section">
          <div>
          <Img fluid={data.imageSharp.fluid} />
          </div>
        </section>
        <section className="details-section">
        <h2>{workData.title}</h2>
        {workData.sold && <p>SOLD</p>}
        <p>{workData.size} ({workData.frame})</p>
        
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
query ($slug: String!) {
    imageSharp(fields: {slug: {eq: $slug}}) {
      fluid(maxHeight: 500, quality: 100, background: "rgba(0,0,0,0.1)", fit: CONTAIN,
      srcSetBreakpoints: [200, 400, 500, 600]) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`

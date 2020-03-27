import React from 'react';
import { jsx } from "theme-ui";
import SimpleCard from "@priyank-vaghela/gatsby-custom-theme-instagram/src/components/SimpleCard";

function MKGrid({ data, card = SimpleCard }) {
    const Child = card;
    return (
      data.edges && (
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mx: -2,
            justifyContent: "center"
          }}
          className="image-grid"
        >
          {data.edges.map(({ node }) => {
                return <Child {...node} localFile={node} href={node.childImageSharp.fields.slug} />
          })}
        </div>
      )
    )
  }

  export default MKGrid;
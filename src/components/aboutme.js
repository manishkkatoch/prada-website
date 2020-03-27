import React from 'react';
import Img from 'gatsby-image';
import "../styles/aboutme.scss";

export default (props) => {
    console.log(props.image)
    return <section className="about-me">
    <h2>About</h2>
    <div className="container">
        <div className="text">
        <p>Hello, I am Pradaxina.</p>
        <p>I am a self taught artist. Born in Central India and lived in it's various states, colour, art and culture have always intrigued me.I received degree in computer engineering and worked as an IT Specialist for more than a decade but I always turned to painting in my free time. In due course, I quit my IT job to pursue my passion in art full time. I have exhibited my paintings in all the major art galleries in Pune, India. I am currently living in Berlin, Germany.</p>
        </div>
        <div className="image">
            <Img fixed={props.image.childImageSharp.fixed} />
        </div>
    </div>
    </section>
}
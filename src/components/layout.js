import React, { useState } from 'react';
import { Link } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';

import '../styles/base.scss';

export default ({ children }) => {
	const [ menuExpanded, setMenuExpanded ] = useState(false);
	const selectionHandler = (props) => {
			document.querySelector(".menu-mobile").classList.toggle("visible");
			document.querySelector(".menu-mobile > i").classList.toggle("fa-chevron-left");
			document.querySelector(".menu-mobile > i").classList.toggle("fa-chevron-right");
			document.querySelectorAll('.option').forEach(option => {
				option.classList.toggle('visible')
			})
		setMenuExpanded(!menuExpanded);
	};

	const closeModal = (props) => {
		document.querySelector('.option').classList.remove('visible');
		setMenuExpanded(false);
	};

	return (<div className="body-container">
		<section className="header-container">
			<h1>Pradaxina Seetha</h1>
			<ul className="menu">
				<a className="menu-mobile" onClick={(e) => {
					e.preventDefault()
					selectionHandler();
				}}>
					<i className="fa fa-2x fa-chevron-left" />
				</a>
				<AnchorLink className="option" to="/#about">
					About
				</AnchorLink>
				<AnchorLink className="option" to="/#water-color">
					Water Color
				</AnchorLink>
				<AnchorLink className="option" to="/#charcoal">
					Charcoal
				</AnchorLink>
				<AnchorLink className="option" to="/#contact">
					Contact
				</AnchorLink>
			</ul>
		</section>
		<section>{children}</section>
	</div>)
}


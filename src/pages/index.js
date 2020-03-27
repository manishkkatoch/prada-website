import React, { useState, useReducer } from 'react';
import Layout from '../components/layout';
import Modal from 'react-modal';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import Img from 'gatsby-image';
import soldImage from '../../static/sold.svg';
import PaintingData from '../../static/data/metadata.json';
import AboutMe from '../components/aboutme';
import Social from '../components/social';
import MKGrid from '../components/work-grid';
import Contact, {PrimaryButton} from "../components/contact";

Modal.setAppElement(`#___gatsby`);

const useMyWorks = () => {
	return useStaticQuery(graphql`
		query {
			aboutme: file(absolutePath: { regex: "/aboutme/" }) {
				childImageSharp {
					id
					fixed(height: 400, width: 300, cropFocus: ENTROPY) {
						...GatsbyImageSharpFixed
					}
				}
				name
			}
			watercolor: allFile(filter: { absolutePath: { regex: "/paintings/water/" } }) {
				edges {
					node {
						childImageSharp {
							id
							fixed(width: 400, height: 400, quality: 100, cropFocus: CENTER) {
								...GatsbyImageSharpFixed_tracedSVG
							}

							fluid(maxWidth: 600, maxHeight: 600) {
								...GatsbyImageSharpFluid
							}
							fields {
								slug
							}
						}
						absolutePath
						name
						
					}
				}
				totalCount
			}
			charcoal: allFile(filter: { absolutePath: { regex: "/paintings/charcoal/" } }) {
				edges {
					node {
						childImageSharp {
							id
							fixed(width: 400, height: 400, quality: 100, cropFocus: CENTER) {
								...GatsbyImageSharpFixed_tracedSVG
							}
							fluid(maxWidth: 600, maxHeight: 600) {
								...GatsbyImageSharpFluid
							}
							fields {
								slug
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
};


const PromptButton = (props) => <input type="button" className="prompt-button" value={props.title} />;

var selectedNode = {};

export default () => {
	const [ modalOpen, setModalOpen ] = useState(false);
	const [ showNode, setShowNode ] = useState(undefined);

	const selectionHandler = (props) => {
		console.log(props);
		document.querySelector('#' + props.node.name).classList.add('selected');
		setModalOpen(true);
		setShowNode(props);
	};

	const closeModal = (props) => {
		console.log('clsing..');
		document.querySelector('.selected').classList.remove('selected');
		setModalOpen(false);
		setShowNode(undefined);
	};

	return (
		<Layout>
			<AboutMe image={useMyWorks().aboutme} />
			<WorkCategoryGrid category="Water Color" onSelect={selectionHandler} />
			<WorkCategoryGrid category="Charcoal" onSelect={selectionHandler} />
			<Social />
			<Contact />
			<Modal isOpen={modalOpen} closeTimeoutMS={0}>
				<div className="details-pane">
					<div
						style={{
							justifyContent: 'row-end',
							display: 'flex',
							flexDirection: 'row-reverse'
						}}
					>
						<i
							onClick={(e) => {
								e.preventDefault();
								closeModal();
							}}
							className="fa fa-close"
							style={{ fontSize: 'x-large' }}
						/>
					</div>
					<div
						style={{
							height: '90%',
							overflow: 'hidden',
							justifyContent: 'center'
						}}
					>
						{showNode && (
							<div
								style={{
									display: 'grid',
									placeContent: 'center'
								}}
							>
								<p className="title">{showNode.data.title}</p>

								<Img
									fixed={
										showNode.data.side == 'wDetails' ? (
											showNode.node.childImageSharp.wDetails
										) : (
											showNode.node.childImageSharp.details
										)
									}
								/>
								<p>
									<ul className="props">
										<li>{showNode.data.size}</li>
										<li>{showNode.data.medium}</li>
										<li>{showNode.data.frame}</li>
									</ul>
								</p>
							</div>
						)}
						<div style={{ textAlign: 'end' }}>
							{showNode && (
								<PrimaryButton title={showNode.data.sold ? 'Commission similar art' : 'Enquire'} />
							)}
						</div>
					</div>
				</div>
			</Modal>
		</Layout>
	);
};

const WorkGrid = (props) => {
	let images = useMyWorks();
	return (
		<section className="work-showcase">
			<div className="gallery ">
				{images.paintings.edges.map(({ node }) => {
					return <Foto {...node} />;
				})}
			</div>
		</section>
	);
};

const Foto = (props) => {
	return (
		<div className="photo">
			<Img fixed={props.childImageSharp.resize} />
			<div className="overlay">&nbsp;</div>

			{!props.noLink && (
				<AnchorLink to={'/#' + props.name.toLowerCase().replace(' ', '-')}>{props.name}</AnchorLink>
			)}
		</div>
	);
};

const FluidFoto = (props) => {
	let isSoldClassName = props.isSold && 'is-sold';
	return (
		<div className="photo" id={props.id} onClick={props.onClick}>
			<Img fixed={props.childImageSharp.fixed} className={isSoldClassName} />
			{props.isSold && <img className="sold-tag" alt="sold" src={soldImage} />}
			{!props.noLink && (
				<AnchorLink to={'/#' + props.name.toLowerCase().replace(' ', '-')}>{props.name}</AnchorLink>
			)}
		</div>
	);
};

const WorkCategoryGrid = (props) => {
	let images = useMyWorks()[props.category.toLowerCase().replace(' ', '')];
	return (<section id={props.category.toLowerCase().replace(' ', '-')}>
	 		<h2>{props.category}</h2>
			<MKGrid data={images} />
			</section>);
	// return (
	// 	<section id={props.category.toLowerCase().replace(' ', '-')}>
	// 		<h2>{props.category}</h2>

	// 		<div className="image-grid">
	// 			{images.edges.map(({ node }) => {
	// 				console.log(node)
	// 				let data = PaintingData.items.filter((f) => f.id == node.name)[0];
	// 				let isSold = (data || { sold: false }).sold;
	// 				return (
	// 					<FluidFoto
	// 						{...node}
	// 						id={node.name}
	// 						noLink={true}
	// 						isSold={isSold}
	// 						onClick={(e) => {
	// 							console.log('event:', node, e);
	// 							navigate(node.childImageSharp.fields.slug);
	// 						}}
	// 					/>
	// 				);
	// 			})}
	// 		</div>
	// 	</section>
	// );
};

import {__} from "@wordpress/i18n";
import {useEffect} from "react";
import {
	PanelBody,
	PanelRow,
	CheckboxControl,
	TextControl,
	TextareaControl,
	SelectControl,
	Button,
} from "@wordpress/components";
import {RichText, InspectorControls, useBlockProps} from "@wordpress/block-editor";
import {ReactSortable} from 'react-sortablejs';
import './editor.scss';
import { normalizeUuid } from '../../utils/normalizeUuid.js';

const edit = (props) => {
	const {className, setAttributes} = props;
	const {
		header,
		subHeader,
		subText,
		rightColumnHeading,
		rightColumnStat1,
		rightColumnDescription1,
		rightColumnSource1,
		rightColumnStat2,
		rightColumnDescription2,
		rightColumnSource2,
		links
	} = props.attributes;

	const initialLink = {
		id: 0,
		linkText: '',
		linkURL: '',
		buttonColor: 'gold',
		fullWidth: false,
		external: false,
	}

	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	const blockProps = useBlockProps();
	const removeItem = (identifier) => {
		const newlinks = links.filter((item) => {
			return item.id !== identifier;
		});
		setAttributes({links: newlinks});
	};

	const handleAddNew = () => {
		let newLinks = [...links]
		newLinks.push(makeLink());
		setAttributes({links: newLinks});
	}
	const handleLinkTextChange = (text, id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				linkText: text,
			} : item
		);
		setAttributes({ links: newLinks });
	}
	const handleLinkURLChange = (url, id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				linkURL: url,
			} : item
		);
		setAttributes({ links: newLinks });
	}
	const handleColorChange = (color, id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				buttonColor: color,
			} : item
		);
		setAttributes({ links: newLinks });
	}
	const handleWidthChange = (id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				fullWidth: !item.fullWidth,
			} : item
		);
		setAttributes({ links: newLinks });

	}
	const handleExternalChange = (id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				external: !item.external,
			} : item
		);
		setAttributes({ links: newLinks });

	}

	useEffect(() => {

		let newLinks;
		if (links.length === 0) {
			newLinks = [makeLink()]
		} else {
			newLinks = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: newLinks});
	}, []);

	let editorFields;
	editorFields = links.map((item, index) => {
		return (
			<PanelBody initialOpen={false} key={item.id} title={item.linkText ? item.linkText : `link ${index + 1}`}>
				<PanelRow>
					<TextControl
						label="Link Text"
						value={item.linkText}
						onChange={(val) => handleLinkTextChange(val, item.id)}
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={'Link URL'}
						type="url"
						onChange={(val) => {
							handleLinkURLChange(val, item.id);
						}}
						value={item.linkURL}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Choose a button color"
						value={item.buttonColor}
						options={[
							{label: 'Gold', value: 'gold'},
							{label: 'Black', value: 'black'},
							{label: 'White', value: 'white'},
						]}
						onChange={(color) => {
							handleColorChange(color, item.id);
						}}
					/>
				</PanelRow>
				<PanelRow>
					<CheckboxControl
						label="Make it full width"
						checked={item.fullWidth}
						onChange={() => {
							handleWidthChange(item.id);
						}}
					/>
				</PanelRow>
				<PanelRow>
					<CheckboxControl
						label="Open link in new tab?"
						checked={item.external}
						onChange={() => {
							handleExternalChange(item.id);
						}}
					/>
				</PanelRow>
				<Button
					style={{marginTop: '5px'}}
					isSecondary
					onClick={() => {
						removeItem(item.id);
					}}
				>
					Remove Item
				</Button>
			</PanelBody>
		);
	})
	return [
		<InspectorControls key="1">
			<PanelBody title={__('Links')}>
				<PanelRow>
					<ReactSortable

						list={links}
						setList={(val) => {
							let linkTexts = [],
								values = [];
							links.map((item) => linkTexts.push(item.linkText));
							val.map((item) => values.push(item.linkText));
							if (_.isEqual(linkTexts, values)) {
								return;
							}
							setAttributes({
								links: val,
							});
						}}
						className="sortable-posts"
					>
						{editorFields}
					</ReactSortable>
				</PanelRow>
				<hr></hr>
				<PanelRow>
					<Button
						isPrimary
						onClick={() => handleAddNew()}
					>
						Add New Link
					</Button>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		<div {...blockProps} key="2">
			<div className="purdue-home-color-hero has-gold-background purdue-home-color-hero-editor">
				<div className="section has-padding-top-large has-padding-bottom-large">
					<div className="container">
						<div className="columns">
							<div className="column is-three-fifths">
								<RichText
									tagName="p"
									value={subHeader}
									className={`tagged-header purdue-home-color-hero--subheader`}
									onChange={(subHeader) => {
										setAttributes({subHeader});
									}}
									placeholder="Add Section Header"
								/>
								<RichText
									tagName="h1"
									value={header}
									className="second-level-page-heading"
									onChange={(header) => {
										setAttributes({header})
									}}
									placeholder="Add Page Header"
								/>
								<RichText
									tagName="p"
									value={subText}
									className={`purdue-home-color-hero--subtext`}
									onChange={(subText) => {
										setAttributes({subText});
									}}
									placeholder="Add subtext"
								/>
								<ul className="purdue-home-button-list">
									{links.length > 0 && links[0].linkURL ? links.map((link, index) => {
										return <li key={index}
												   className={`${link.fullWidth ? " purdue-home-button-wrap--full" : ""}`}>
											<a className={`purdue-home-button${link.buttonColor === "black" ? " purdue-home-button--black" : ""}${link.buttonColor === "white" ? " purdue-home-button--white" : ""}`}
											   href={link.linkURL}
											   target={`${link.external ? "_blank" : "_self"}`}>{link.linkText.trim()}</a>
										</li>
									}) : ""}
								</ul>
							</div>
							<div className="column has-black-background">
								<RichText
									tagName="p"
									value={rightColumnHeading}
									className={`purdue-home-color-hero--right__heading has-text-gold`}
									onChange={(rightColumnHeading) => {
										setAttributes({rightColumnHeading});
									}}
									placeholder="Add Heading"
								/>
								<div className="purdue-color-hero--stats-wrapper--box">

									<RichText
										tagName="span"
										value={rightColumnStat1}
										className={`purdue-home-color-hero--right__stat has-text-gold`}
										onChange={(rightColumnStat1) => {
											setAttributes({rightColumnStat1});
										}}
										placeholder="Add Stat #1"
									/>
									<RichText
										tagName="span"
										value={rightColumnDescription1}
										className={`purdue-home-color-hero--right__description has-text-gold`}
										onChange={(rightColumnDescription1) => {
											setAttributes({rightColumnDescription1});
										}}
										placeholder="Add Description #1"
									/>
									<RichText
										tagName="p"
										value={rightColumnSource1}
										className={`purdue-home-color-hero--right__source has-text-white`}
										onChange={(rightColumnSource1) => {
											setAttributes({rightColumnSource1});
										}}
										placeholder="Add Source #1"
									/>

								</div>
								<div className="purdue-color-hero--stats-wrapper--box">

									<RichText
										tagName="span"
										value={rightColumnStat2}
										className={`purdue-home-color-hero--right__stat has-text-gold`}
										onChange={(rightColumnStat2) => {
											setAttributes({rightColumnStat2});
										}}
										placeholder="Add Stat #2"
									/>
									<RichText
										tagName="span"
										value={rightColumnDescription2}
										className={`purdue-home-color-hero--right__description has-text-white`}
										onChange={(rightColumnDescription2) => {
											setAttributes({rightColumnDescription2});
										}}
										placeholder="Add Description #2"
									/>
									<RichText
										tagName="p"
										value={rightColumnSource2}
										className={`purdue-home-color-hero--right__source has-text-white`}
										onChange={(rightColumnSource2) => {
											setAttributes({rightColumnSource2});
										}}
										placeholder="Add Source #2"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	]
}
export default edit;
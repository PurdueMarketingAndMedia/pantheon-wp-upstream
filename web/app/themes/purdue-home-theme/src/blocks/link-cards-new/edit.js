import {__} from "@wordpress/i18n";
import {
	PanelBody,
	PanelRow,
	CheckboxControl,
	TextControl,
	TextareaControl,
	SelectControl,
	Button,
	Disabled,
} from "@wordpress/components";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	InnerBlocks,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	blockEditorStore
} from "@wordpress/block-editor";

import {ReactSortable} from "react-sortablejs";
import ServerSideRender from "@wordpress/server-side-render";
import {useState, useEffect} from '@wordpress/element';
import {createBlock} from "@wordpress/blocks";
import {dispatch, useSelect, select} from '@wordpress/data';
import "./editor.scss";
import {template} from "@wordpress/block-editor/build/store/reducer";
import {normalizeUuid} from "../../utils/normalizeUuid";

const BLOCKS_TEMPLATE = [
	["purdue/link-cards-single"],
];
const ALLOWED_BLOCKS = ['purdue/link-cards-single'];

const edit = (props) => {
	const {className, setAttributes} = props;
	const {
		type,
		feedURL,
		layout,
		background,
		cardBackground,
		includeThumb,
		inculdeDesc,
		header,
		headerColor,
		cardType,
		addPostTypeTag,
		addTaxTag,
		cards,
		linkURL,
		linkText,
		buttonText,
		external,
		paddingTop,
		paddingBottom,
		removeSidePadding,
		loop,
		columns,
		id,
		horizontal
	} = props.attributes;
	const blockProps = useBlockProps();
	const {children, innerBlocks} = useInnerBlocksProps();



	const removeCard = (identifier) => {
		if (cardType === "list") {
			dispatch('core/block-editor').removeBlock(identifier);
			const newCards = cards.filter((item) => {
				return item.id !== identifier;
			});
			setAttributes({cards: newCards});
		} else {
			const newCards = cards.filter((item) => {
				return item.id !== identifier;
			});
			setAttributes({cards: newCards});
		}

	};

	const initialCards = {
		id: 0,
		mediaURL:
			"https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg",
		mediaAlt: "",
		tag: "",
		postType: "",
		title: "",
		subtext: "",
		date: "",
		name: "",
		titleLine1: "",
		titleLine2: "",
		email: "",
		address: "",
		homePhone: "",
		cellPhone: "",
		officePhone: "",
		websiteLink: "",
		websiteURL: "",
		websiteExternal: true,
		linkURL: "",
		buttonText: "",
		buttonCSS: "",
		external: true,
		ariaLabel: "",
		linkURL2: "",
		buttonText2: "",
		external2: true,
		buttonCSS2: "",
		ariaLabel2: "",
	};

	const makeCard = () => ({
		...initialCards,
		id: crypto.randomUUID()
	});


	useEffect(() => {

		let obj;
		if (cards.length === 0) {
			obj = [makeCard()]
		} else {
			obj = normalizeUuid(structuredClone(cards));
		}
		setAttributes({cards: obj});
	}, []);

	const handleAddNew = () => {
		if (cardType === "list") {
			const newBlock = createBlock('purdue/link-cards-single');
			dispatch('core/block-editor').insertBlocks(newBlock, undefined, props.clientId);
			const parentBlock = select('core/block-editor').getBlocksByClientId(props.clientId)[0];
			const childBlocks = parentBlock.innerBlocks;
			let lastblock = childBlocks[childBlocks.length - 1]
			let newCards = [...cards];
			let newInitial = {...initialCards};
			newInitial.id = lastblock.clientId;
			newCards.push(newInitial);
			setAttributes({cards: newCards});
		} else {
			let newCards = [...cards];
			newCards.push(makeCard());
			setAttributes({cards: newCards});
		}
	};

	const handleCardType = (cardType) => {

		if (cardType === "list" && cards.length === 1) {

			const newBlock = createBlock('purdue/link-cards-single');
			dispatch('core/block-editor').insertBlocks(newBlock, undefined, props.clientId);
			setTimeout(() => {
				const parentBlock = select('core/block-editor').getBlocksByClientId(props.clientId)[0];
				const childBlocks = parentBlock.innerBlocks;
				let lastblock = childBlocks.at(-1);
				let newCards = [...cards];
				newCards[0].id = lastblock.clientId;
				setAttributes({cards: newCards});
			}, 100);

		} else if (cardType === "list" && cards.length > 1) {

			async function insertBlocksSequentially() {
				for (let i = 0; i < cards.length; i++) {
					const newBlock = createBlock('purdue/link-cards-single');
					await dispatch('core/block-editor').insertBlocks(newBlock, undefined, props.clientId);

					await new Promise(resolve => setTimeout(resolve, 200));

					const parentBlock = select('core/block-editor').getBlocksByClientId(props.clientId)[0];
					const childBlocks = parentBlock.innerBlocks;

					if (childBlocks.length > i) {
						let lastblock = childBlocks.at(-1);
						let newCards = [...cards];
						newCards[i].id = lastblock.clientId;
						setAttributes({cards: newCards});
					}
				}
			}

			insertBlocksSequentially();

		} else {
			const parentBlock = select('core/block-editor').getBlocksByClientId(props.clientId)[0];
			const childBlocks = parentBlock.innerBlocks;
			childBlocks.forEach((child) => {
					dispatch('core/block-editor').removeBlock(child.clientId);
				}
			);

		}
		setAttributes({cardType: cardType});
	}

	const handleCardChangeImage = (img, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				mediaURL: img.url,
				mediaAlt: img.alt,
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleSubtextChange = (text, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				subtext: text
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleTagChange = (tag, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				tag: tag
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handlePostTypeChange = (tag, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				postType: tag
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleTitleChange = (title, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				title: title
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleEmailChange = (email, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				email: email
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleHomePhoneChange = (homePhone, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				homePhone: homePhone
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleCellPhoneChange = (cellPhone, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				cellPhone: cellPhone
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleOfficePhoneChange = (officePhone, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				officePhone: officePhone
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleAddressChange = (address, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				address: address
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleDateChange = (date, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				date: date
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleNameChange = (name, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				name: name
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleTitleLine1Change = (line1, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				titleLine1: line1
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleTitleLine2Change = (line2, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				titleLine2: line2
			} : item
		);
		setAttributes({ cards: newCards });
	};

	const handleWebsiteTextChange = (url, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				websiteLink: url
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleWebsiteURLChange = (url, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				websiteURL: url
			} : item
		);
		setAttributes({ cards: newCards });
	};

	const handleWebsiteExternalChange = (id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				websiteExternal: !item.websiteExternal
			} : item
		);
		setAttributes({ cards: newCards });
	};

	const handleLinkURLChange = (url, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				linkURL: url
			} : item
		);
		setAttributes({ cards: newCards });
	};

	//const [buttonTextVal, buttonTextDefault] = useState('Learn More');
	const handleButtonTextChange = (button, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				buttonText: button
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleExternalChange = (id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				external: !item.external
			} : item
		);
		setAttributes({ cards: newCards });
	};

	const addNestedBlock = () => {
		const newBlock = createBlock('purdue/link-cards-single');
		// dispatch('core/block-editor').insertBlocks(newBlock, undefined, props.clientId);
		//wp.data.dispatch('core/block-editor').replaceInnerBlocks(props.clientId, newBlock, false);
	};

	const handleButtonCSSChange = (css, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				buttonCSS: css
			} : item
		);
		setAttributes({ cards: newCards });
	}

	const handleAiraLabelChange = (label, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				ariaLabel: label
			} : item
		);
		setAttributes({ cards: newCards });
	}


	const handleLinkURL2Change = (url, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				linkURL2: url
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleButtonText2Change = (button, id) => {

		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				buttonText2: button
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleExternal2Change = (id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				external2: !item.external2
			} : item
		);
		setAttributes({ cards: newCards });
	};

	const handleButtonCSS2Change = (css, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				buttonCSS2: css
			} : item
		);
		setAttributes({ cards: newCards });
	}

	const handleAiraLabel2Change = (label, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				ariaLabel2: label
			} : item
		);
		setAttributes({ cards: newCards });
	}

	let editorFields;

	editorFields =
		cards &&
		cards.map((item, index) => {
			return (
				<PanelBody
					initialOpen={false}
					key={item.id}
					title={cardType === 'faculty'
						? (item.name || `Card ${index + 1}`)
						: (item.title || `Card ${index + 1}`)
					}
				>
					{cardType === "list" ? (<p>Use Block Editor to add content.</p>) : ("")
					}
					{includeThumb !== false && cardType !== "list" ? (
						<PanelRow>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(img) => handleCardChangeImage(img, item.id)}
									render={({open}) => {
										return item.mediaURL !== "" ? (
											<div>
												<img src={item.mediaURL}/>
												<Button isSecondary onClick={open}>
													Select a new image
												</Button>
											</div>
										) : (
											<Button isSecondary onClick={open}>
												Select an image
											</Button>
										);
									}}
								/>
							</MediaUploadCheck>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "story" ? (
						<PanelRow>
							<TextControl
								label="Optional Post Type Tag"
								value={item.postType}
								onChange={(val) => handlePostTypeChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "story" ? (
						<PanelRow>
							<TextControl
								label="Taxonomy Tag"
								value={item.tag}
								onChange={(val) => handleTagChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "story" || cardType === "simple" ? (
						<PanelRow>
							<TextControl
								label="Title"
								value={item.title}
								onChange={(val) => handleTitleChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{(cardType === "simple" || cardType === "story") && inculdeDesc ? (
						<PanelRow>
							<TextareaControl
								label="Subtext"
								value={item.subtext}
								onChange={(val) => handleSubtextChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Faculty Name"
								value={item.name}
								onChange={(val) => handleNameChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Faculty Title"
								value={item.titleLine1}
								onChange={(val) => handleTitleLine1Change(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" && item.titleLine1 ? (
						<PanelRow>
							<TextControl
								label="Faculty Title Line 2"
								value={item.titleLine2}
								onChange={(val) => handleTitleLine2Change(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Email"
								value={item.email}
								onChange={(val) => handleEmailChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Address"
								value={item.address}
								onChange={(val) => handleAddressChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Office Phone"
								value={item.officePhone}
								onChange={(val) => handleOfficePhoneChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Cell Phone"
								value={item.cellPhone}
								onChange={(val) => handleCellPhoneChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Home Phone"
								value={item.homePhone}
								onChange={(val) => handleHomePhoneChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Website Link Text"
								value={item.websiteLink}
								onChange={(val) => handleWebsiteTextChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType === "faculty" ? (
						<PanelRow>
							<TextControl
								label="Website URL"
								value={item.websiteURL}
								onChange={(val) => handleWebsiteURLChange(val, item.id)}
							/>
						</PanelRow>
					) : (
						""
					)}
					{cardType === "faculty" ? (
						<PanelRow>
							<CheckboxControl
								label="Open website link in new tab?"
								checked={item.websiteExternal}
								onChange={() => {
									handleWebsiteExternalChange(item.id);
								}}
							/>
						</PanelRow>
					) : (
						""
					)}

					{cardType !== "list" ? (
						<>
							<PanelRow>
								<TextControl
									label={"Card Link Text"}
									onChange={(val) => {
										handleButtonTextChange(val, item.id);
									}}
									value={item.buttonText}
									help={"Card link text is displayed only when a second card link is used."}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={"Card Link URL"}
									type="url"
									onChange={(val) => {
										handleLinkURLChange(val, item.id);
									}}
									value={item.linkURL}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={"ARIA Label for Card Link"}
									onChange={(val) => {
										handleAiraLabelChange(val, item.id);
									}}
									value={item.ariaLabel}
									help="Provide an accessible label for the link. Defualts to the Card Link Text or Card Title if left empty."

								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label="Button CSS class(es)"
									value={item.buttonCSS}
									onChange={(css) => {
										handleButtonCSSChange(css, item.id);
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
							<PanelRow>
								<TextControl
									label={"Card Link 2 Text"}
									onChange={(val) => {
										handleButtonText2Change(val, item.id);
									}}
									value={item.buttonText2}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={"Card Link 2 URL"}
									type="url"
									onChange={(val) => {
										handleLinkURL2Change(val, item.id);
									}}
									value={item.linkURL2}
								/>
							</PanelRow>
							<PanelRow>
								<CheckboxControl
									label="Open link in new tab?"
									checked={item.external2}
									onChange={() => {
										handleExternal2Change(item.id);
									}}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={"ARIA Label for Card Link 2"}
									onChange={(val) => {
										handleAiraLabel2Change(val, item.id);
									}}
									value={item.ariaLabel2}
									help="Provide an accessible label for the link. Defualts to the Card Link 2 Text if left empty."
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label="Button CSS class(es)"
									value={item.buttonCSS2}
									onChange={(css) => {
										handleButtonCSS2Change(css, item.id);
									}}
								/>
							</PanelRow>
						</>

					) : (
						""
					)}
					<Button
						style={{marginTop: "5px"}}
						isSecondary
						onClick={() => {
							removeCard(item.id);
						}}
					>
						Remove Card
					</Button>
				</PanelBody>
			);
		});
	return [
		<InspectorControls key="1">
			<PanelBody>
				<PanelRow>
					<SelectControl
						label="Type of the source"
						value={type}
						options={[
							{label: "Manually enter", value: "manual"},
							{label: "RSS", value: "rss"},
						]}
						onChange={(type) => {
							setAttributes({type});
							if (type === "rss") {
								setAttributes({cardType: "story"});
							}
						}}
					/>
				</PanelRow>
				{type !== "rss" ? (
					<PanelRow>
						<SelectControl
							label="Card Type"
							value={cardType}
							options={[
								{value: "story", label: "Story Card"},
								{value: "faculty", label: "Faculty Card"},
								{value: "simple", label: "Simple Card"},
								{value: "list", label: "List Card"},
							]}
							onChange={(cardType) => {
								handleCardType(cardType);
							}}

						/>
					</PanelRow>
				) : (
					""
				)}
				{cardType === "story" || cardType === "list" ? (
					<PanelRow>
						<SelectControl
							label="Card Background"
							value={cardBackground}
							options={[
								{value: "white", label: "White"},
								{value: "black", label: "Black"},
								{value: "gray", label: "Gray"},
							]}
							onChange={(cardBackground) => setAttributes({cardBackground})}
						/>
					</PanelRow>
				) : (
					""
				)}
				{cardType === "story" ? (
					<>
						<PanelRow>
							<CheckboxControl
								label="Include excerpt on the card?"
								checked={inculdeDesc}
								onChange={() => {
									setAttributes({inculdeDesc: !inculdeDesc});
								}}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label="Include thumbnail image on the card?"
								checked={includeThumb}
								onChange={() => {
									setAttributes({includeThumb: !includeThumb});
								}}
							/>
						</PanelRow>
					</>
				) : (
					""
				)}
				{type === "rss" ? (
					<PanelRow>
						<TextControl
							label={"Feed URL"}
							type="url"
							onChange={(feedURL) => {
								setAttributes({feedURL});
							}}
							value={feedURL}
						/>
					</PanelRow>
				) : (
					""
				)}
				{type === "rss" ? (
					<PanelRow>
						<CheckboxControl
							label="Add Post Type tag on the cards?"
							checked={addPostTypeTag}
							onChange={() =>
								setAttributes({addPostTypeTag: !addPostTypeTag})
							}
						/>
					</PanelRow>
				) : (
					""
				)}
				{type === "rss" ? (
					<PanelRow>
						<CheckboxControl
							label="Add Category tag on the cards?"
							checked={addTaxTag}
							onChange={() => setAttributes({addTaxTag: !addTaxTag})}
						/>
					</PanelRow>
				) : (
					""
				)}
				<PanelRow>
					<TextControl
						label={"Header of this section"}
						onChange={(header) => {
							setAttributes({header});
						}}
						value={header}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Choose Layout"
						value={layout}
						options={[
							{value: "grid", label: "Grid"},
							{value: "slider", label: "Slider"},
						]}
						onChange={(layout) => {
							setAttributes({layout});
						}}
					/>
				</PanelRow>
				{layout === "grid" ? (
					<PanelRow>
						<SelectControl
							label="Number of columns shown on desktop"
							value={columns}
							options={[
								{value: "12", label: "1"},
								{value: "6", label: "2"},
								{value: "4", label: "3"},
								{value: "3", label: "4"},
							]}
							onChange={(columns) => {
								setAttributes({columns});
							}}
						/>
					</PanelRow>
				) : (
					""
				)}
				{columns === "12" && cardType === "story" ? (
					<PanelRow>
						<CheckboxControl
							label="Change card layout to horizontal?"
							checked={horizontal}
							onChange={() => {
								setAttributes({horizontal: !horizontal});
							}}
						/>
					</PanelRow>
				) : (
					""
				)}
				{layout === "slider" ? (
					<PanelRow>
						<CheckboxControl
							label="Loop the slides?"
							checked={loop}
							onChange={() => setAttributes({loop: !loop})}
						/>
					</PanelRow>
				) : (
					""
				)}
				<PanelRow>
					<TextControl
						label={"Link Text to this section"}
						onChange={(linkText) => {
							setAttributes({linkText});
						}}
						value={linkText}
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={"Link URL to this section"}
						type="url"
						onChange={(linkURL) => {
							setAttributes({linkURL});
						}}
						value={linkURL}
					/>
				</PanelRow>
				<PanelRow>
					<CheckboxControl
						label="Open link in new tab?"
						checked={external}
						onChange={() => {
							setAttributes({external: !external});
						}}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Choose the background"
						value={background}
						options={[
							{label: "None", value: "none"},
							{label: "Gold", value: "gold"},
							{label: "Black", value: "black"},
							{label: "Gray", value: "gray"},
						]}
						onChange={(background) => setAttributes({background})}
					/>
				</PanelRow>
				{background === "none" ? (
					<PanelRow>
						<SelectControl
							label="Choose header background color"
							value={headerColor}
							options={[
								{value: "gold", label: "Gold"},
								{value: "black", label: "Black"},
							]}
							onChange={(headerColor) => setAttributes({headerColor})}
						/>
					</PanelRow>
				) : ("")
				}
				<PanelRow>
					<SelectControl
						label="Padding at the top"
						value={paddingTop}
						options={[
							{value: "has-padding-top-none", label: "None"},
							{value: "has-padding-top-small", label: "Small"},
							{value: "", label: "Medium"},
							{value: "has-padding-top-large", label: "Large"},
						]}
						onChange={(paddingTop) => {
							setAttributes({paddingTop});
						}}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Padding at the bottom"
						value={paddingBottom}
						options={[
							{value: "has-padding-bottom-none", label: "None"},
							{value: "has-padding-bottom-small", label: "Small"},
							{value: "", label: "Medium"},
							{value: "has-padding-bottom-large", label: "Large"},
						]}
						onChange={(paddingBottom) => {
							setAttributes({paddingBottom});
						}}
					/>
				</PanelRow>
				<PanelRow>
					<CheckboxControl
						label="Remove side padding?"
						help="You can remove the side paddings when use this block inside another container block"
						checked={removeSidePadding}
						onChange={() => {
							setAttributes({removeSidePadding: !removeSidePadding});
						}}
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label="HTML Anchor"
						help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
						value={id}
						onChange={(id) => setAttributes({id})}
					/>
				</PanelRow>
			</PanelBody>
			{type !== "rss" ? (
				<PanelBody title={__("Cards")}>
					<PanelRow>
						<ReactSortable
							list={cards}
							setList={(val) => {
								let ids = [],
									values = [];
								cards.map((item) => ids.push(item.id));
								val.map((item) => values.push(item.id));
								if (_.isEqual(ids, values)) {
									return;
								}
								setAttributes({
									cards: val,
								});
							}}
							className="sortable-posts"
						>
							{editorFields}
						</ReactSortable>
					</PanelRow>
					<hr></hr>
					<PanelRow>
						<Button isPrimary onClick={() => handleAddNew()}>
							Add New Card
						</Button>
					</PanelRow>
				</PanelBody>
			) : (
				""
			)}
		</InspectorControls>,
		<div {...blockProps} key="2">
			{type === "rss" ? (
				<Disabled>
					<ServerSideRender
						block="purdue/link-cards-new"
						attributes={props.attributes}
					/>
				</Disabled>
			) : (
				<div className={`purdue-home-link-cards purdue-home-link-cards-editor`}>
					<div
						className={`section has-${background}-background ${
							paddingTop ? ` ${paddingTop}` : ""
						}${paddingBottom ? ` ${paddingBottom}` : ""}${
							removeSidePadding ? " has-no-sidepadding" : ""
						}`}
					>
						<div className={`container header-wrap`}>
							<div className="columns is-mulitline align-bottom">
								<div className="column">
									<div className={`tagged-header-container`}>
										<RichText
											tagName="h2"
											value={header}
											className={`tagged-header${
												background !== "gold" ? " tagged-header--gold" : ""
											}`}
											onChange={(header) => {
												setAttributes({header});
											}}
											placeholder="Add header"
											keepPlaceholderOnFocus={true}
										></RichText>
									</div>
								</div>
								{linkURL ? (
									<div className="column is-narrow">
										<a
											className={`purdue-home-button${
												background === "gold"
													? " purdue-home-button--black"
													: ""
											}`}
											href={linkURL}
											target={`${external ? "_blank" : "_self"}`}
										>
											{linkText}
										</a>
									</div>
								) : (
									""
								)}
							</div>
						</div>
						<div className={`container`}>
							{layout === "grid" ? (
								<div className="purdue-home-link-cards__cards">
									<div className="columns is-multiline">

										{cardType === "list" ? (

											<InnerBlocks template={BLOCKS_TEMPLATE} allowedBlocks={ALLOWED_BLOCKS}/>

										) : (
											<>
												{cards.map((item, index) => {
													return (
														<div className={`column is-${columns}`}>
															{cardType === "list" ? (
																<div key={item.id} className="custom-inner-block">
																	{wp.blockEditor.serialize(item)}
																	<InnerBlocks/>
																</div>

															) : (
																""
															)}
															{item.linkURL ? (
																<a
																	className={`purdue-home-cta-card${
																		cardType === "simple"
																			? " has-content-bottom"
																			: ""
																	}${
																		cardType === "faculty"
																			? " purdue-home-cta-card--stack"
																			: ""
																	}${
																		cardType === "story"
																			? " purdue-home-cta-card--story"
																			: ""
																	}`}
																	href="#"
																>
																	{includeThumb ? (
																		<div
																			className={`image${
																				cardType !== "faculty"
																					? " is-16by9"
																					: " is-square"
																			}`}
																		>
																			{item.mediaURL ? (
																				<img
																					className="purdue-home-background-image"
																					src={item.mediaURL}
																				/>
																			) : (
																				""
																			)}
																		</div>
																	) : (
																		""
																	)}
																	<div
																		className={`flex-container${
																			cardType === "faculty"
																				? " flex-container--faculty"
																				: ""
																		}${
																			cardType === "story"
																				? " flex-container--align-center"
																				: ""
																		}${
																			cardType === "simple"
																				? " flex-container--align-bottom"
																				: ""
																		}${
																			cardType === "story" &&
																			cardBackground === "black"
																				? " has-black-background"
																				: cardType === "story" &&
																				cardBackground === "gray"
																					? " has-gray-background"
																					: ""

																		}`}
																	>
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<p className="purdue-home-cta-grid__card-subtitle">
																				{item.postType ? (
																					<span>{item.postType}</span>
																				) : (
																					""
																				)}
																				{item.tag ?
																					<span>{item.tag}</span> : ""}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		item.subtext &&
																		inculdeDesc ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<button className="purdue-home-button">
																				{item.buttonText}
																			</button>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<button className="purdue-home-button">
																				{item.buttonText2 }
																			</button>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.name ? (
																			<p className="purdue-home-cta-grid__card-name">
																				{item.name}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.titleLine1 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine1}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.titleLine2 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine2}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.email ? (
																			<a
																				className="purdue-home-cta-grid__card-email"
																				href="#"
																			>
																				{item.email.trim()}
																			</a>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.address ? (
																			<p
																				className="purdue-home-cta-grid__card-address"
																				href="#"
																			>
																				{item.address.trim()}
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.officePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Office:&nbsp;

																				{item.officePhone.trim()}

																			</p>
																		) : (
																			""
																		)}


																		{cardType == "faculty" && item.cellPhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Cell:&nbsp;

																				{item.cellPhone.trim()}

																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.homePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Home:&nbsp;

																				{item.homePhone.trim()}

																			</p>
																		) : (
																			""
																		)}


																		{cardType == "simple" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "simple" && item.subtext ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																	</div>
																</a>
															) : (
																<div
																	className={`purdue-home-cta-card${
																		cardType === "simple"
																			? " has-content-bottom"
																			: ""
																	}${
																		cardType === "faculty"
																			? " purdue-home-cta-card--stack"
																			: ""
																	}${
																		cardType === "story"
																			? " purdue-home-cta-card--story"
																			: ""
																	}`}
																>
																	{includeThumb ? (
																		<div
																			className={`image${
																				cardType !== "faculty"
																					? " is-16by9"
																					: " is-square"
																			}`}
																		>
																			{item.mediaURL ? (
																				<img src={item.mediaURL}/>
																			) : (
																				""
																			)}
																		</div>
																	) : (
																		""
																	)}

																	<div
																		className={`flex-container${
																			cardType === "faculty"
																				? " flex-container--faculty"
																				: ""
																		}${
																			cardType === "story"
																				? " flex-container--align-center"
																				: ""
																		}${
																			cardType === "simple"
																				? " flex-container--align-bottom"
																				: ""
																		}${
																			cardType === "story" &&
																			cardBackground === "black"
																				? " has-black-background"
																				: cardType === "story" &&
																				cardBackground === "gray"
																					? " has-gray-background"
																					: ""
																		}`}
																	>
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<p className="purdue-home-cta-grid__card-subtitle">
																				{item.postType ? (
																					<span>{item.postType}</span>
																				) : (
																					""
																				)}
																				{item.tag ?
																					<span>{item.tag}</span> : ""}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		item.subtext &&
																		inculdeDesc ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.name ? (
																			<p className="purdue-home-cta-grid__card-name">
																				{item.name}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.titleLine1 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine1}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.titleLine2 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine2}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.email ? (
																			<a
																				className="purdue-home-cta-grid__card-email"
																				href="#"
																			>
																				{item.email.trim()}
																			</a>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.address ? (
																			<p
																				className="purdue-home-cta-grid__card-address"
																				href="#"
																			>
																				{item.address.trim()}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.officePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Office:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.officePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.cellPhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Cell:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.cellPhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.homePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Home:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.homePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "simple" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "simple" && item.subtext ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																	</div>
																</div>
															)}
														</div>
													);
												})}
											</>

										)}


									</div>
								</div>
							) : (
								""
							)}
							{layout === "slider" ? (
								<div className={`purdue-home-link-cards__slider`}>
									<div className={`glide`}>
										<div class="glide__track" data-glide-el="track">
											<div class="glide__slides">
												{cards.map((item, index) => {
													return (
														<div className="glide__slide">
															{item.linkURL ? (
																<a
																	className={`purdue-home-cta-card${
																		cardType === "simple"
																			? " has-content-bottom"
																			: ""
																	}${
																		cardType === "faculty"
																			? " purdue-home-cta-card--stack"
																			: ""
																	}${
																		cardType === "story"
																			? " purdue-home-cta-card--story"
																			: ""
																	}`}
																	href="#"
																>
																	{includeThumb ? (
																		<div
																			className={`image${
																				cardType !== "faculty"
																					? " is-16by9"
																					: " is-square"
																			}`}
																		>
																			{item.mediaURL ? (
																				<img
																					className="purdue-home-background-image"
																					src={item.mediaURL}
																				/>
																			) : (
																				""
																			)}
																		</div>
																	) : (
																		""
																	)}

																	<div
																		className={`flex-container${
																			cardType === "faculty"
																				? " flex-container--faculty"
																				: ""
																		}${
																			cardType === "story"
																				? " flex-container--align-center"
																				: ""
																		}${
																			cardType === "simple"
																				? " flex-container--align-bottom"
																				: ""
																		}${
																			cardType === "story" &&
																			cardBackground === "black"
																				? " has-black-background"
																				: cardType === "story" &&
																				cardBackground === "gray"
																					? " has-gray-background"
																					: ""
																		}`}
																	>
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<p className="purdue-home-cta-grid__card-subtitle">
																				{item.postType ? (
																					<span>{item.postType}</span>
																				) : (
																					""
																				)}
																				{item.tag ? (
																					<span>{item.tag}</span>
																				) : (
																					""
																				)}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		item.subtext &&
																		inculdeDesc ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<button className="purdue-home-button">
																				{item.buttonText}
																			</button>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<button className="purdue-home-button">
																				{item.buttonText2 }
																			</button>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.name ? (
																			<p className="purdue-home-cta-grid__card-name">
																				{item.name}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" &&
																		item.titleLine1 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine1}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" &&
																		item.titleLine2 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine2}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.email ? (
																			<a
																				className="purdue-home-cta-grid__card-email"
																				href="#"
																			>
																				{item.email.trim()}
																			</a>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.address ? (
																			<p
																				className="purdue-home-cta-grid__card-address"
																				href="#"
																			>
																				{item.address.trim()}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.officePhone ? (
																			<p>Office:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.officePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.cellPhone ? (
																			<p>Cell:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.cellPhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.homePhone ? (
																			<p>Home:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.homePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "simple" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "simple" && item.subtext ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																	</div>
																</a>
															) : (
																<div
																	className={`purdue-home-cta-card${
																		cardType === "simple"
																			? " has-content-bottom"
																			: ""
																	}${
																		cardType === "faculty"
																			? " purdue-home-cta-card--stack"
																			: ""
																	}${
																		cardType === "story"
																			? " purdue-home-cta-card--story"
																			: ""
																	}`}
																>
																	{includeThumb ? (
																		<div
																			className={`image${
																				cardType !== "faculty"
																					? " is-16by9"
																					: " is-square"
																			}`}
																		>
																			{item.mediaURL ? (
																				<img src={item.mediaURL}/>
																			) : (
																				""
																			)}
																		</div>
																	) : (
																		""
																	)}

																	<div
																		className={`flex-container${
																			cardType === "faculty"
																				? " flex-container--faculty"
																				: ""
																		}${
																			cardType === "story"
																				? " flex-container--align-center"
																				: ""
																		}${
																			cardType === "simple"
																				? " flex-container--align-bottom"
																				: ""
																		}${
																			cardType === "story" &&
																			cardBackground === "black"
																				? " has-black-background"
																				: cardType === "story" &&
																				cardBackground === "gray"
																					? " has-gray-background"
																					: ""
																		}`}
																	>
																		{cardType == "story" &&
																		(item.tag || item.postType) ? (
																			<p className="purdue-home-cta-grid__card-subtitle">
																				{item.postType ? (
																					<span>{item.postType}</span>
																				) : (
																					""
																				)}
																				{item.tag ? (
																					<span>{item.tag}</span>
																				) : (
																					""
																				)}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "story" &&
																		item.subtext &&
																		inculdeDesc ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.name ? (
																			<p className="purdue-home-cta-grid__card-name">
																				{item.name}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" &&
																		item.titleLine1 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine1}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" &&
																		item.titleLine2 ? (
																			<p className="purdue-home-cta-grid__card-titleline">
																				{item.titleLine2}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.email ? (
																			<a
																				className="purdue-home-cta-grid__card-email"
																				href="#"
																			>
																				{item.email.trim()}
																			</a>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.address ? (
																			<p
																				className="purdue-home-cta-grid__card-address"
																				href="#"
																			>
																				{item.address.trim()}
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.officePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Office:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.officePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "faculty" && item.cellPhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Cell:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.cellPhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "faculty" && item.homePhone ? (
																			<p className="purdue-home-cta-grid__card-phone">Home:&nbsp;
																				<a
																					className="purdue-home-cta-grid__card-phone"
																					href="#"
																				>
																					{item.homePhone.trim()}
																				</a>
																			</p>
																		) : (
																			""
																		)}

																		{cardType == "simple" && item.title ? (
																			<p className="purdue-home-cta-grid__card-title">
																				{item.title}
																			</p>
																		) : (
																			""
																		)}
																		{cardType == "simple" && item.subtext ? (
																			<p className="purdue-home-cta-grid__card-subtext">
																				{item.subtext}
																			</p>
																		) : (
																			""
																		)}
																	</div>
																</div>
															)}
														</div>
													);
												})}
											</div>
										</div>
										<div
											class={`slider-controls${
												background === "black" ? " slider-controls--dark" : ""
											}`}
										>
											<button class="glide__arrow arrow--left">previous</button>
											<div class="glide__bullets" data-glide-el="controls[nav]">
												{cards.map((card, index) => {
													return (
														<button
															class="glide__bullet"
															data-glide-dir={index}
														></button>
													);
												})}
											</div>
											<button class="glide__arrow arrow--right">next</button>
										</div>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			)}
		</div>,
	];
};
export default edit;
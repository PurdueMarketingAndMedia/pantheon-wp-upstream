import {
	PanelBody,
	PanelRow,
	CheckboxControl,
	TextControl,
	TextareaControl,
	SelectControl,
	Button,
} from "@wordpress/components"
import {__} from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	InnerBlocks,
	RichText,
	useBlockProps
} from "@wordpress/block-editor";
import {ReactSortable} from 'react-sortablejs';
import {normalizeUuid} from "../../utils/normalizeUuid";
import {useEffect} from "react";

const BLOCKS_TEMPLATE = [
	['core/paragraph', {placeholder: 'Body content copy'}],
];

function getVideoId(url) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url?.match(regExp);

	return (match && match[2].length === 11)
		? match[2]
		: null;
}

function getVimeoId(url) {
	const regEx = /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
	const match = url?.match(regEx);
	return (match && match.length == 7)
		? match[6]
		: null;
}

const edit = (props) => {
	const {className, setAttributes} = props;
	const {header, hasIntro, descText, cards, paddingTop, paddingBottom, id} = props.attributes;
	const blockProps = useBlockProps();
	const removeCard = (identifier) => {
		const newCards = cards.filter((item) => {
			return item.id !== identifier;
		});
		setAttributes({cards: newCards});
	};

	const makeCard = () => ({
		id: crypto.randomUUID(), ...initialCards
	});

	const initialCards = {
		mediaId: 0,
		mediaURL: '',
		mediaAlt: '',
		mediaType: 'image',
		subtitle: '',
		title: '',
		subtext: '',
		linkText: '',
		linkURL: '',
		external: true,
		width: 'align',
		align: 'left',
		source: 'upload',
		youtube: '',
		vimeo: '',
	}

	const handleAddNew = () => {
		let newCards = [...cards];
		newCards.push(makeCard());
		setAttributes({cards: newCards});
	}
	const handleCardChangeImage = (img, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				mediaId: img.id,
				mediaURL: img.url,
				mediaAlt: img.alt,
				mediaType: img.type,
			} : item
		);
		setAttributes({ cards: newCards });
	};
	const handleSubtitleChange = (subtitle, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				subtitle: subtitle
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleTitleChange = (title, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				title: title
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleSubtextChange = (subtext, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				subtext: subtext
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleLinkTextChange = (linkText, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				linkText: linkText
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleLinkURLChange = (url, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				linkURL: url
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleCardWidth = (width, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				width: width
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleExternalChange = (id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				external: !item.external
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleCardAlign = (align, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				align: align
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleMediaSource = (source, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				source: source
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleYoutubeUrl = (youtube, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				youtube: youtube
			} : item
		);
		setAttributes({ cards: newCards });
	}
	const handleVimeoUrl = (vimeo, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				vimeo: vimeo
			} : item
		);
		setAttributes({ cards: newCards });
	}
	let editorFields;

	useEffect(() => {
		let obj;
		if (initialCards.length === 0) {
			obj = [makeCard()]
		} else {
			obj = normalizeUuid(structuredClone(cards));
		}
		setAttributes({cards: obj});
		console.log(cards);
	}, []);

	editorFields = cards.map((item, index) => {
		return (
			<PanelBody initialOpen={false} key={item.id} title={item.title ? item.title : `Card ${index + 1}`}>
				<PanelRow>
					<SelectControl
						label="Card width"
						value={item.width}
						options={
							[
								{value: 'align', label: 'Align'},
								{value: 'full', label: 'Full'},
							]
						}
						onChange={(width) => handleCardWidth(width, item.id)}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Align Content"
						Help="The location of the card or text to the line"
						value={item.align}
						options={
							[
								{value: 'left', label: 'Left'},
								{value: 'right', label: 'Right'},
							]
						}
						onChange={(align) => handleCardAlign(align, item.id)}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Midia Source"
						value={item.source}
						options={
							[
								{value: 'upload', label: 'Upload'},
								{value: 'youtube', label: 'Youtube'},
								{value: 'vimeo', label: 'Vimeo'},
							]
						}
						onChange={(source) => handleMediaSource(source, item.id)}
					/>
				</PanelRow>
				{
					item.source === "youtube" ?
						<PanelRow>
							<TextControl
								label={'Youtube URL'}
								type="url"
								onChange={(val) => {
									handleYoutubeUrl(val, item.id);
								}}
								value={item.youtube}
							/>
						</PanelRow> : ""
				}
				{
					item.source === "vimeo" ?
						<PanelRow>
							<TextControl
								label={'Vimeo URL'}
								type="url"
								onChange={(val) => {
									handleVimeoUrl(val, item.id);
								}}
								value={item.vimeo}
							/>
						</PanelRow> : ""
				}
				<PanelRow>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(img) => handleCardChangeImage(img, item.id)}
							render={({open}) => {
								return item.mediaURL !== '' ? (
									<div>
										{item.mediaType === 'image' ?
											<img src={item.mediaURL}/>
											: ""}
										{item.mediaType === 'video' ?
											<Disabled>
												<video muted playsinline="" title={item.mediaTitle} src={item.mediaURL}>
												</video>
											</Disabled>
											: ""}
										<Button
											isSecondary
											onClick={open}
										>
											Select a new image
										</Button>
									</div>
								) : (
									<Button
										isSecondary
										onClick={open}
									>
										Select an image
									</Button>);
							}}
						/>
					</MediaUploadCheck>
				</PanelRow>
				<PanelRow>
					<TextControl
						label="Subtitle"
						value={item.subtitle}
						onChange={(val) => handleSubtitleChange(val, item.id)}
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label="Title"
						value={item.title}
						onChange={(val) => handleTitleChange(val, item.id)}
					/>
				</PanelRow>
				<PanelRow>
					<TextareaControl
						label="Subtext"
						value={item.subtext}
						onChange={(val) => handleSubtextChange(val, item.id)}
					/>
				</PanelRow>
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
						removeCard(item.id);
					}}
				>
					Remove Card
				</Button>
			</PanelBody>
		);
	})
	return [
		<InspectorControls key="1">
			<PanelBody>
				<PanelRow>
					<CheckboxControl
						label="Include an introduction section?"
						checked={hasIntro}
						onChange={() => {
							setAttributes({hasIntro: !hasIntro})
						}}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Padding at the top"
						value={paddingTop}
						options={
							[
								{value: 'has-padding-top-none', label: 'None'},
								{value: 'has-padding-top-small', label: 'Small'},
								{value: '', label: 'Medium'},
								{value: 'has-padding-top-large', label: 'Large'},
							]
						}
						onChange={(paddingTop) => {
							setAttributes({paddingTop})
						}}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="Padding at the bottom"
						value={paddingBottom}
						options={
							[
								{value: 'has-padding-bottom-none', label: 'None'},
								{value: 'has-padding-bottom-small', label: 'Small'},
								{value: '', label: 'Medium'},
								{value: 'has-padding-bottom-large', label: 'Large'},
							]
						}
						onChange={(paddingBottom) => {
							setAttributes({paddingBottom})
						}}
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={__('Cards')}>
				<PanelRow>
					<ReactSortable

						list={cards}
						setList={(val) => {
							let titles = [],
								values = [];
							cards.map((item) => titles.push(item.title));
							val.map((item) => values.push(item.title));
							if (_.isEqual(titles, values)) {
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
					<Button
						isPrimary
						onClick={() => handleAddNew()}
					>
						Add New Card
					</Button>
				</PanelRow>
			</PanelBody>
			<PanelBody>
				<PanelRow>
					<TextControl
						label="HTML Anchor"
						help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
						value={id}
						onChange={(id) => setAttributes({id})}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		<div {...blockProps} key="2">
			<div
				className={`purdue-home-timeline purdue-home-timeline-editor has-gray-background ${paddingTop ? ` ${paddingTop}` : ''}${paddingBottom ? ` ${paddingBottom}` : ''}`}>
				<div className={`section`}>
					<div className={`container`}>
						{
							hasIntro ?
								<div className="purdue-home-timeline__intro">
									<RichText
										tagName='h2'
										value={header}
										className={`purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header purdue-home-timeline__header`}
										onChange={(header) => {
											setAttributes({header});
										}}
										placeholder="Add header"
									></RichText>
									<div className='purdue-home-timeline__content'>
										<InnerBlocks
											template={BLOCKS_TEMPLATE}
											templateLock={false}
										/>
									</div>
								</div> : ""
						}
						{
							cards && cards.length > 0 ?
								<div className={`purdue-home-timeline__cards`}>
									{cards.map((item, index) => {

										let mediaURL = item.mediaURL;
										if (!mediaURL && item.source === "youtube") {
											const videoId = getVideoId(item.youtube);
											mediaURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
										} else if (!mediaURL && item.source === "vimeo") {
											const videoId = getVimeoId(item.vimeo);
											mediaURL = `https://vumbnail.com/${videoId}.jpg`;
										}
										return <div key={index}
													className={`purdue-home-timeline__card animate card-width-${item.width} content-align-${item.align}${mediaURL ? " has-thumbnail" : ""}`}>
											<div className="purdue-home-timeline__card-content">
												{mediaURL ?
													<div
														className="image is-16by9"
													>
														{item.mediaType === 'image' || item.youtube || item.vimeo ?
															<img
																className="purdue-home-background-image"
																src={mediaURL}
															/> : ""
														}
														{item.mediaType === 'video' ?
															<Disabled>
																<video muted playsinline="" title={item.title}
																	   src={mediaURL}>
																</video>
															</Disabled>
															: ""}
														{item.youtube || item.vimeo ?
															<div className="flex-container">
																<span className="cta-link purdue-home-cta-card__link">Watch Video</span>
																<i className="fa-regular fa-circle-play cta-icon"></i>
															</div> : ""}
													</div> : ""
												}
												<div className="flex-container--align-center">
													{item.subtitle ?
														<p className="purdue-home-timeline__card-subtitle">{item.subtitle}</p> : ""
													}
													<p className="purdue-home-timeline__card-title">{item.title}</p>
													{item.subtext ?
														<p className="purdue-home-timeline__card-subtext">{item.subtext}</p> : ""
													}
													{item.linkURL ?
														<div className='purdue-home-button'>{item.linkText}</div> : ""
													}
												</div>
											</div>
										</div>
									})
									}
								</div> : ""
						}

					</div>
				</div>
			</div>
		</div>,
	];
}

export default edit;
import { useState, useEffect } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { normalizeUuid } from '../../utils/normalizeUuid';

const makePanel = () => ( {
	id: crypto.randomUUID(),
	heading: '',
	headingURL: '',
	menuId: 0,
} );

const edit = ( { attributes, setAttributes } ) => {
	const {
		header,
		headerLevel,
		layout,
		background,
		columns,
		paddingTop,
		paddingBottom,
		panels,
		sidebarHeading,
		sidebarHeadingURL,
		sidebarMenuId,
		ctaHeading,
		ctaText,
		ctaButtonLabel,
		ctaButtonURL,
	} = attributes;

	const [ menuOptions, setMenuOptions ] = useState( [] );

	const blockProps = useBlockProps();

	useEffect( () => {
		apiFetch( { path: '/purdue-home/v1/nav-menus/' } )
			.then( ( menus ) => {
				setMenuOptions(
					menus.map( ( m ) => ( { label: m.name, value: String( m.id ) } ) )
				);
			} )
			.catch( () => {} );

		if ( panels.length === 0 ) {
			setAttributes( { panels: [ makePanel() ] } );
		} else {
			setAttributes( { panels: normalizeUuid( [ ...panels ] ) } );
		}
	}, [] );

	const updatePanel = ( index, key, value ) => {
		setAttributes( {
			panels: panels.map( ( p, i ) =>
				i === index ? { ...p, [ key ]: value } : p
			),
		} );
	};

	const addPanel = () => setAttributes( { panels: [ ...panels, makePanel() ] } );

	const removePanel = ( index ) =>
		setAttributes( { panels: panels.filter( ( _, i ) => i !== index ) } );

	const menuOptionsFull = [
		{ label: '— select a menu —', value: '0' },
		...menuOptions,
	];

	const layoutOptions = [
		{ label: 'Grid', value: 'grid' },
		{ label: 'Grid + Sidebar', value: 'feature' },
	];

	const columnOptions = [
		{ label: '2 Columns', value: '2' },
		{ label: '3 Columns', value: '3' },
		{ label: '4 Columns', value: '4' },
	];

	const backgroundOptions = [
		{ label: 'None', value: 'none' },
		{ label: 'Gold', value: 'gold' },
		{ label: 'Black', value: 'black' },
		{ label: 'Gray', value: 'gray' },
	];

	const headerLevelOptions = [
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title="Header" initialOpen={ true }>
					<TextControl
						label="Section Header"
						value={ header }
						onChange={ ( v ) => setAttributes( { header: v } ) }
					/>
					<SelectControl
						label="Header Level"
						value={ headerLevel }
						options={ headerLevelOptions }
						onChange={ ( v ) => setAttributes( { headerLevel: v } ) }
					/>
				</PanelBody>
				<PanelBody title="Layout" initialOpen={ true }>
					<SelectControl
						label="Layout"
						value={ layout }
						options={ layoutOptions }
						onChange={ ( v ) => setAttributes( { layout: v } ) }
						help="Grid + Sidebar adds a right column with a smaller panel and a black CTA block."
					/>
					<SelectControl
						label="Columns"
						value={ columns }
						options={ columnOptions }
						onChange={ ( v ) => setAttributes( { columns: v } ) }
					/>
					<SelectControl
						label="Background"
						value={ background }
						options={ backgroundOptions }
						onChange={ ( v ) => setAttributes( { background: v } ) }
					/>
					<TextControl
						label="Padding Top Class"
						help="e.g. has-padding-top-small"
						value={ paddingTop }
						onChange={ ( v ) => setAttributes( { paddingTop: v } ) }
					/>
					<TextControl
						label="Padding Bottom Class"
						help="e.g. has-padding-bottom-small"
						value={ paddingBottom }
						onChange={ ( v ) => setAttributes( { paddingBottom: v } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="clp-editor">
					{ header && (
						<p className="clp-editor__section-header">
							<strong>{ header }</strong>
						</p>
					) }
					<div className="clp-editor__grid">
						{ panels.map( ( panel, pi ) => (
							<div key={ panel.id } className="clp-editor__panel">
								<TextControl
									label="Panel Heading"
									value={ panel.heading }
									onChange={ ( v ) => updatePanel( pi, 'heading', v ) }
								/>
								<TextControl
									label="Heading URL (optional)"
									value={ panel.headingURL }
									onChange={ ( v ) => updatePanel( pi, 'headingURL', v ) }
								/>
								<SelectControl
									label="Navigation Menu"
									value={ String( panel.menuId ) }
									options={ menuOptionsFull }
									onChange={ ( v ) => updatePanel( pi, 'menuId', Number( v ) ) }
									help="Only two levels of nesting are supported. Items nested more than two levels deep will not be displayed."
								/>
								{ panel.menuId > 0 && (
									<p style={ { fontSize: '0.8rem', color: '#888', margin: '4px 0 8px' } }>
										Menu items rendered on the frontend.
									</p>
								) }
								<Button
									isDestructive
									variant="secondary"
									onClick={ () => removePanel( pi ) }
								>
									Remove Panel
								</Button>
							</div>
						) ) }
					</div>
					<Button variant="primary" onClick={ addPanel }>
						+ Add Panel
					</Button>

					{ layout === 'feature' && (
						<div className="clp-editor__sidebar">
							<p className="clp-editor__sidebar-label">
								<strong>Sidebar (right column)</strong>
							</p>
							<TextControl
								label="Sidebar Panel Heading"
								value={ sidebarHeading }
								onChange={ ( v ) => setAttributes( { sidebarHeading: v } ) }
							/>
							<TextControl
								label="Sidebar Heading URL (optional)"
								value={ sidebarHeadingURL }
								onChange={ ( v ) => setAttributes( { sidebarHeadingURL: v } ) }
							/>
							<SelectControl
								label="Sidebar Navigation Menu"
								value={ String( sidebarMenuId ) }
								options={ menuOptionsFull }
								onChange={ ( v ) => setAttributes( { sidebarMenuId: Number( v ) } ) }
							/>

							<p className="clp-editor__sidebar-label">
								<strong>Sidebar CTA (black block)</strong>
							</p>
							<TextControl
								label="CTA Heading"
								value={ ctaHeading }
								onChange={ ( v ) => setAttributes( { ctaHeading: v } ) }
							/>
							<label className="clp-editor__rich-label">CTA Body</label>
							<RichText
								className="clp-editor__rich"
								tagName="div"
								multiline="p"
								value={ ctaText }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
								onChange={ ( v ) => setAttributes( { ctaText: v } ) }
								placeholder="CTA body text…"
							/>
							<TextControl
								label="Button Label"
								value={ ctaButtonLabel }
								onChange={ ( v ) => setAttributes( { ctaButtonLabel: v } ) }
							/>
							<TextControl
								label="Button URL"
								value={ ctaButtonURL }
								onChange={ ( v ) => setAttributes( { ctaButtonURL: v } ) }
							/>
						</div>
					) }
				</div>
			</div>
		</>
	);
};

export default edit;

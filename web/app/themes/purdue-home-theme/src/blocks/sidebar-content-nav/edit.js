import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { normalizeUuid } from '../../utils/normalizeUuid';

const MAX_MENUS = 5;

export default function Edit( { attributes, setAttributes } ) {
	const { menuIds, contactLabel, contactLinks, showContactBox, id } = attributes;
	const [ menuOptions, setMenuOptions ] = useState( [] );

	useEffect( () => {
		apiFetch( { path: '/purdue-home/v1/nav-menus/' } )
			.then( ( menus ) => {
				setMenuOptions(
					menus.map( ( m ) => ( { label: m.name, value: String( m.id ) } ) )
				);
			} )
			.catch( () => {} );

		// Normalise contact link UUIDs on mount
		if ( contactLinks.length ) {
			const normalised = normalizeUuid( [ ...contactLinks ] );
			setAttributes( { contactLinks: normalised } );
		}
	}, [] );

	const updateMenuId = ( index, value ) => {
		const updated = [ ...menuIds ];
		updated[ index ] = Number( value );
		setAttributes( { menuIds: updated } );
	};

	const addMenu = () => {
		if ( menuIds.length >= MAX_MENUS ) return;
		setAttributes( { menuIds: [ ...menuIds, 0 ] } );
	};

	const removeMenu = ( index ) => {
		setAttributes( { menuIds: menuIds.filter( ( _, i ) => i !== index ) } );
	};

	const addContactLink = () => {
		setAttributes( {
			contactLinks: [
				...contactLinks,
				{ id: crypto.randomUUID(), text: '', url: '' },
			],
		} );
	};

	const updateContactLink = ( index, field, value ) => {
		const updated = contactLinks.map( ( link, i ) =>
			i === index ? { ...link, [ field ]: value } : link
		);
		setAttributes( { contactLinks: updated } );
	};

	const removeContactLink = ( index ) => {
		setAttributes( { contactLinks: contactLinks.filter( ( _, i ) => i !== index ) } );
	};

	const blockProps = useBlockProps( { className: 'scn-block scn-block--editor' } );

	const menuOptionsFull = [
		{ label: '— select a menu —', value: '0' },
		...menuOptions,
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title="Navigation Menus" initialOpen={ true }>
					{ menuIds.map( ( menuId, index ) => (
						<div key={ index } style={ { display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '8px' } }>
							<div style={ { flex: 1 } }>
								<SelectControl
									label={ `Menu ${ index + 1 }` }
									value={ String( menuId ) }
									options={ menuOptionsFull }
									onChange={ ( val ) => updateMenuId( index, val ) }
								/>
							</div>
							<Button
								isDestructive
								variant="secondary"
								onClick={ () => removeMenu( index ) }
								style={ { marginBottom: '8px' } }
							>
								Remove
							</Button>
						</div>
					) ) }
					{ menuIds.length < MAX_MENUS && (
						<Button variant="secondary" onClick={ addMenu }>
							+ Add Menu
						</Button>
					) }
				</PanelBody>

				<PanelBody title="Contact Box" initialOpen={ false }>
					<ToggleControl
						label="Show contact box"
						checked={ showContactBox }
						onChange={ ( val ) => setAttributes( { showContactBox: val } ) }
					/>
					{ showContactBox && (
						<>
							<TextControl
								label="Label"
								value={ contactLabel }
								onChange={ ( val ) => setAttributes( { contactLabel: val } ) }
							/>
							{ contactLinks.map( ( link, index ) => (
								<div key={ link.id || index } style={ { border: '1px solid #ddd', padding: '8px', marginBottom: '8px', borderRadius: '4px' } }>
									<TextControl
										label="Link text"
										value={ link.text }
										onChange={ ( val ) => updateContactLink( index, 'text', val ) }
									/>
									<TextControl
										label="URL"
										value={ link.url }
										onChange={ ( val ) => updateContactLink( index, 'url', val ) }
									/>
									<Button
										isDestructive
										variant="link"
										onClick={ () => removeContactLink( index ) }
									>
										Remove link
									</Button>
								</div>
							) ) }
							<Button variant="secondary" onClick={ addContactLink }>
								+ Add Link
							</Button>
						</>
					) }
				</PanelBody>

				<PanelBody title="Settings" initialOpen={ false }>
					<TextControl
						label="HTML Anchor (id)"
						value={ id }
						onChange={ ( val ) => setAttributes( { id: val } ) }
						help="Appears as the id attribute on the block wrapper."
					/>
				</PanelBody>
			</InspectorControls>

			<nav { ...blockProps } aria-label="Section navigation">
				{ menuIds.length === 0 ? (
					<p style={ { color: '#888', fontStyle: 'italic', padding: '1rem 0' } }>
						Select one or more navigation menus in the sidebar panel.
					</p>
				) : (
					menuIds.map( ( menuId, index ) => {
						const option = menuOptions.find( ( o ) => o.value === String( menuId ) );
						return (
							<div key={ index } className="scn-nav-group">
								<p style={ { fontWeight: 700, margin: '0 0 4px', fontSize: '0.9rem' } }>
									{ option ? option.label : `Menu ${ index + 1 }` }
								</p>
								<p style={ { fontSize: '0.8rem', color: '#888', margin: 0 } }>
									Menu items rendered on the frontend
								</p>
							</div>
						);
					} )
				) }
				{ showContactBox && contactLinks.length > 0 && (
					<aside className="scn-contact-box" aria-label="Contact information">
						<span className="scn-contact-box__label" aria-hidden="true">
							{ contactLabel }
						</span>
						<ul className="scn-contact-box__links">
							{ contactLinks.map( ( link, index ) => (
								<li key={ link.id || index }>
									<span className="scn-contact-box__link">{ link.text || '(link)' }</span>
								</li>
							) ) }
						</ul>
					</aside>
				) }
			</nav>
		</>
	);
}

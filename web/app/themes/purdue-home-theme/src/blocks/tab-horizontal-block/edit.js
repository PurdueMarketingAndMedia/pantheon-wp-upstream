import { InnerBlocks, useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
    PanelBody,
    PanelRow,
    TextControl,
  } from '@wordpress/components';
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add tab content' } ],
];



const edit = ( props ) => {
    const blockProps = useBlockProps();
    return [
        <InspectorControls key="1">
            <PanelBody>
                <PanelRow>
                <TextControl
                    label="HTML Anchor"
                    help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
                    value={ props.attributes.id }
                    onChange={ ( id ) => props.setAttributes( { id } ) }
                />
                </PanelRow>
            </PanelBody>
        </InspectorControls>,
        <div {...blockProps}>
        <div
            className={ `purdue-home-tabs-horizontal__panel ${props.attributes.editorSelected ?" active" : ""}` }
            aria-labelledby={`header-${props.attributes.aria}`} 
            id={`panel-${props.attributes.aria}`}
            {...(props.attributes.id ? { 'data-name': props.attributes.id } : {})}>
            <InnerBlocks
                template={ BLOCKS_TEMPLATE }
                templateLock={ false }
                templateInsertUpdatesSelection={ false }
            />
        </div>
        </div>
    ];
}
export default edit;
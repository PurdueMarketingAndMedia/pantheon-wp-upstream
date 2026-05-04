import { __ } from "@wordpress/i18n";
import {
	RichText,
	InnerBlocks,
  InspectorControls,
  useBlockProps
} from "@wordpress/block-editor";

import {
    PanelBody,
    PanelRow,
    CheckboxControl,
    TextControl,
    RadioControl,
    SelectControl,
} from "@wordpress/components";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";


const BLOCKS_TEMPLATE = [
    [ 'core/paragraph', { placeholder: 'Add content' } ],
];

  
const Edit = ( props ) => {
  const { setAttributes, className } = props;
  const { id, title, blockId, titleLevel, titleSize, background,paddingTop, paddingBottom, removeSidePadding,removeTopBorder,removeBottomBorder, isNarrow} = props.attributes;
  const blockProps = useBlockProps();
  const onChangeTitle = ( title ) => {
      setAttributes({
          title: title,
      });
  }
	useEffect(() => {
		setAttributes( { blockId: props.clientId } );
	}, [])

  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Heading level of the title"
            value={ props.attributes.titleLevel }
            options={ [
              { label: 'H2', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'H4', value: 'h4' },
              { label: 'H5', value: 'h5' },
              { label: 'H6', value: 'h6' },
              { label: 'P', value: 'p' },
            ] }
            onChange={ ( titleLevel ) => {
              props.setAttributes( { titleLevel } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Title Size"
            value={ props.attributes.titleSize }
            options={ [
              { label: 'Large', value: 'large' },    
              { label: 'Small', value: 'small' },   
            ] }
            onChange={ ( titleSize ) => {
              props.setAttributes( { titleSize } )
            } }
          />
        </PanelRow>
        <PanelRow>
        <RadioControl
          label="Choose the background."
          selected={ background }
          options={ [
            { label: 'Gold', value: 'gold' },
            { label: 'Black', value: 'black' },
            { label: 'Gray', value: 'gray' },
            { label: 'None', value: 'none' },
          ] }
          onChange={ ( background ) => setAttributes( { background } ) }
        />
      </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the top"
            value={ paddingTop }
            options={
              [
                { value: 'has-padding-top-none', label: 'None' },
                { value: 'has-padding-top-small', label: 'Small' },
                { value: '', label: 'Medium' },
                { value: 'has-padding-top-large', label: 'Large' },
              ]
            }
            onChange={ ( paddingTop ) => {
              setAttributes( { paddingTop } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the bottom"
            value={ paddingBottom }
            options={
              [
                { value: 'has-padding-bottom-none', label: 'None' },
                { value: 'has-padding-bottom-small', label: 'Small' },
                { value: '', label: 'Medium' },
                { value: 'has-padding-bottom-large', label: 'Large' },
              ]
            }
            onChange={ ( paddingBottom ) => {
              setAttributes( { paddingBottom } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
              label="Remove side padding?"
              help="You can remove the side paddings when use this block inside another container block"
              checked={removeSidePadding}
              onChange={() => {
              setAttributes( { removeSidePadding: !removeSidePadding } )
              }}
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
              label="Remove top border?"
              checked={removeTopBorder}
              onChange={() => {
              setAttributes( { removeTopBorder: !removeTopBorder } )
              }}
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
              label="Remove bottom border?"
              checked={removeBottomBorder}
              onChange={() => {
              setAttributes( { removeBottomBorder: !removeBottomBorder } )
              }}
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
              label="Make accordion narrower?"
              checked={isNarrow}
              onChange={() => {
              setAttributes( { isNarrow: !isNarrow } )
              }}
          />
          </PanelRow>
        <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={ id }
              onChange={ ( id ) => setAttributes( { id } ) }
            />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div { ...blockProps } key="2">
      <div className={`purdue-accordion-wrap purdue-accordion-preview`}>
            <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}${removeSidePadding?" has-no-sidepadding":""}`}> 
            <div className={`purdue-accordion${removeBottomBorder?" has-no-bottomborder":""}${removeTopBorder?" has-no-topborder":""}`}> 
                <RichText
                    tagName={titleLevel}
                    value={title}
                    className={'purdue-accordion--title'}
                    onChange={onChangeTitle}
                    placeholder="Add Title"
                /> 
                <div className="purdue-accordion--content">
                    <InnerBlocks
                        template={ BLOCKS_TEMPLATE }
                        templateLock={ false }
                    />
                </div>
                </div>
            </div>
      </div>
    </div>
  ]
}

export default Edit;
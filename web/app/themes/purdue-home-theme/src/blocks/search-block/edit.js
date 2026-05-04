import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import './editor.scss';

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, background, id, paddingTop, paddingBottom, borderTop, borderBottom} = props.attributes;
  const blockProps = useBlockProps();
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose a background"
            value={ background }
            options={ [
              { label: 'None', value: 'none' },
              { label: 'Black', value: 'black' },
              { label: 'Gray', value: 'gray' },
            ] }
            onChange={ ( background ) => {
              setAttributes( { background } )
            } }
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
            label="Add border at the top?"
            checked={borderTop}
            onChange={() => {
              setAttributes( { borderTop: !borderTop } )
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add border at the bottom?"
            checked={borderBottom}
            onChange={() => {
              setAttributes( { borderBottom: !borderBottom } )
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
    <div {...blockProps} key="2">
    <div className={`purdue-home-search-bar purdue-home-search-bar-editor has-${background}-background`}>   
      {
        borderTop?(
          <div className="section has-padding-bottom-none has-padding-top-none">
            <div className="container">
              <hr/>
            </div>
            </div>
        ):""
      }     
        <div className={`section${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}`}>  
          <div className="container">
            <RichText
              tagName="p"
              value={header}
              className={`purdue-home-search-bar__header`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add header (optional)"              
            ></RichText>
            <div className='search-box'>
              <form className="search-form">
                <i className="fas fa-search search-icon" aria-label="Search for:"></i>
                <input disabled type="search" className="search-field" placeholder="Placeholder will be shown on front end" />
              </form>
            </div>
              <div className="purdue-home-search-bar__links">
                  <span>Most Popular Searches:</span>
                  <span>
                  Popular Search items will be shown on front end.
                  </span>
              </div>
          </div>
        </div>
        {
        borderBottom?(
          <div className="section has-padding-bottom-none has-padding-top-none">
            <div className="container">
              <hr/>
            </div>
            </div>
        ):""
      } 
    </div></div>,
  ];
}
export default edit;
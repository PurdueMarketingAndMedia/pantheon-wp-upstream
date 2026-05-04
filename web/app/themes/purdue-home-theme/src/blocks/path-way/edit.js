import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components"
import { __ } from "@wordpress/i18n";
import { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import { button } from "@wordpress/icons";
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];
import {normalizeUuid} from "../../utils/normalizeUuid";
import { useEffect } from "react";

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { type, isFirst, isLast, contentAlign, imageSize, header, headerLevel, subheader, descText, mediaURL, mediaAlt, links, linkDisplay, addConnector, connectorType, fieldId, id, buttonCSS} = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
    linkCSS:''
  }


	const makeLinks = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {

		let obj;
		if (links.length === 0) {
			obj = [makeLinks()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, [])

	useEffect(() => {
		if (fieldId !== props.clientId) {
			setAttributes({ fieldId: props.clientId });
		}
	}, [fieldId, props.clientId, setAttributes]);

  const handleAddNew = ()=>{
    let newLinks=[...links];
    newLinks.push(makeLinks());
    setAttributes({links: newLinks});
  }
  const handleLinkTextChange = (text, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: text,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleLinkURLChange = (url, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleExternalChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleColorChange = (color, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleWidthChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  fullWidth: !item.fullWidth,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
    const handlelinkCSSChange = (css, index)=>{
    let newLinks= structuredClone(links);
    newLinks[index].linkCSS=css;
    setAttributes({links: newLinks});
  }
let editorFields;
editorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText ? item.linkText : `link ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( val, item.id ) }
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
      
      {
        linkDisplay==="buttons"?
        <PanelRow>
          <SelectControl
            label="Choose a button color"
            value={ item.buttonColor }
            options={ [
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
              { label: 'White', value: 'white' },
            ] }
            onChange={(color) => {
              handleColorChange(color, item.id);
            }}
          />
      </PanelRow>:""
      }
    {
      linkDisplay==="buttons"?
      <PanelRow>
        <CheckboxControl
          label="Make it full width"
          checked={item.fullWidth}
          onChange={() => {
            handleWidthChange(item.id);
          }}
        />
      </PanelRow>:""}
      {
        linkDisplay==="buttons"?
        <PanelRow>
         <TextControl
            label="Button CSS class(es)"
            value={item.linkCSS}
            onChange={(css) => {
              handlelinkCSSChange(css,index);
            }}
          />
        </PanelRow>:""
      }
      <Button
        style={{ marginTop: '5px' }}
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
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose the Type of this block"
            value={ type }
            options={
              [
                { value: 'aligned', label: 'Aligned' },
                { value: 'full', label: 'Full Width' },
              ]
            }
            onChange={ ( type ) => {
              setAttributes( { type } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Align Content"
            value={ contentAlign }
            options={
              [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' },
              ]
            }
            onChange={ ( contentAlign ) => {
              setAttributes( { contentAlign } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Heading Level of the Header"
            help="This only changes the HTML tag. The styles will stay the same."
            value={ headerLevel }
            options={ [
              { label: 'H2', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'H4', value: 'h4' },
              { label: 'H5', value: 'h5' },
              { label: 'H6', value: 'h6' },
            ] }
            onChange={ ( headerLevel ) => {
              setAttributes( { headerLevel } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add Conenctor to next block?"
            checked={addConnector}
            onChange={() => {
              setAttributes( { addConnector: !addConnector} )
            }}
          />
      </PanelRow>
      {
        addConnector?
        <PanelRow>
          <SelectControl
            label="Choose connector type"
            help="Choose Straight if next path way block is the same type (e.g. from alighed to aligned), choose Elbow if next block is a different type (e.g. from aligned to full width)" 
            value={ connectorType }
            options={
              [
                { value: 'straight', label: 'Straight' },
                { value: 'elbow', label: 'Elbow' },
              ]
            }
            onChange={ ( connectorType ) => {
              setAttributes( { connectorType } )
            } }
          />
      </PanelRow>:""
      }
      <PanelRow>
          <CheckboxControl
            label="Is this the first one?"
            help="Check the box if this is the first Path Way block in this group"
            checked={isFirst}
            onChange={() => {
              setAttributes( { isFirst: !isFirst} )
            }}
          />
      </PanelRow>
      <PanelRow>
          <CheckboxControl
            label="Is this the last one?"
            help="Check the box if this is the last Path Way block in this group"
            checked={isLast}
            onChange={() => {
              setAttributes( { isLast: !isLast} )
            }}
          />
      </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose how to display the links"
            value={ linkDisplay }
            options={
              [
                { value: 'buttons', label: 'Buttons' },
                { value: 'dropdown', label: 'Dropdown' },
              ]
            }
            onChange={ ( linkDisplay ) => {
              setAttributes( { linkDisplay } )
            } }
          />
        </PanelRow>
        {type==="aligned"?
        <PanelRow>
          <SelectControl
            label="Choose type of image"
            value={ imageSize }
            options={
              [
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'square', label: 'Square' },
              ]
            }
            onChange={ ( imageSize ) => {
              setAttributes( { imageSize } )
            } }
          />
        </PanelRow>:""}
        <PanelRow>
          <TextControl
            label="Description of the links"
            value={ descText }
            onChange={ ( descText ) => setAttributes( { descText } ) }
          />
        </PanelRow>
        </PanelBody>
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
        {
        linkDisplay==="dropdown"?
        <PanelRow>
         <TextControl
            label="Button CSS class(es)"
            value={ buttonCSS }
            onChange={(buttonCSS) => setAttributes({buttonCSS})}
          />
        </PanelRow>:""
      }
      </PanelBody>
      <PanelBody>
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
      <div className={`purdue-home-path-way purdue-home-path-way-editor${type==="aligned"?" purdue-home-path-way--aligned":" purdue-home-path-way--full"}${addConnector?" purdue-home-path-way--has-connector":""}${connectorType === "elbow"?" purdue-home-path-way--has-connector-elbow":""}${isFirst?" purdue-home-path-way--first":""}`}>   
        <div className={`section has-padding-top-none`}>  
          <div className="container">
            {
              addConnector && isFirst?<div className={`purdue-home-path-way__connector purdue-home-path-way__connector--top`}></div>:""
            }
            {
              addConnector && !isLast?<div className={`purdue-home-path-way__connector purdue-home-path-way__connector--straight`}></div>:""
            }
            {
              addConnector && !isLast && connectorType==="elbow" ?<div className={`purdue-home-path-way__connector purdue-home-path-way__connector--elbow`}></div>:""
            }
            {
              addConnector && !isLast && connectorType==="elbow" && type==="full"?<div className={`purdue-home-path-way__connector purdue-home-path-way__connector--down`}></div>:""
            }
            <div className={`purdue-home-path-way__container${contentAlign==="left"?" purdue-home-path-way__container--reversed":""}${imageSize === "square" && type === "aligned" ? " purdue-home-path-way__container--small-image" : ""}`}>
              <div className="purdue-home-path-way__image-container">
                  <MediaUploadCheck>
                    <MediaUpload
                      allowedTypes={ ['image'] }
                      onSelect={ ( img ) => {
                        setAttributes( {
                          mediaURL: img.url,
                          mediaAlt: img.alt,
                        } );
                      } }
                      render={ ( { open } ) => {
                        return (
                          <div className={`image`}>
                              <img
                                className=""
                                src={mediaURL}
                              />
                            <div className="image-buttons">
                            <Button isPrimary onClick={ open }>{ mediaURL !== '' ? 'Select a new image' : 'Select an image' }</Button>
                            </div>                    
                          </div>
                        );
                      } }
                    />
                  </MediaUploadCheck>   
              </div>
              <div className="purdue-home-path-way__content-container">
                <RichText
                  tagName={headerLevel}
                  value={subheader}
                  className={`purdue-home-path-way__subheader`}
                  onChange={(subheader) => {
                    setAttributes({ subheader});
                  }}
                  placeholder="Add Section Header"
                ></RichText>
                <RichText
                  tagName="p"
                  value={header}
                  className={`purdue-home-path-way__header`}
                  onChange={(header) => {
                    setAttributes({ header});
                  }}
                  placeholder="Add Header"
                ></RichText>
                <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />
                <div className="purdue-home-path-way__list-container">
                  {
                    descText?<span className="purdue-home-path-way__list-desc">{descText}:</span>:""
                  }                    
                  {
                    linkDisplay === "buttons"?
                    <ul className="purdue-home-button-list">
                    {links.length>0 && links[0].linkURL?links.map((link, index) => {
                      return <li key={link.id} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                      </li>
                    }):""}
                  </ul>:""
                  }
                  {
                    linkDisplay === "dropdown"?
                      <form className="purdue-home-select" method="get">
                        <label for={fieldId} className="is-sr-only">Choose a link:</label>
                        <select id={fieldId} name="links">
                        {links.length>0 && links[0].linkURL?links.map((link, index) => {
                          return <option key={index} value={link.linkURL} data-external={link.external}>{link.linkText.trim()}</option>
                        }):""}
                        </select>
                        <button type="button" className="purdue-home-button">Learn More</button>
                      </form>
                    :""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    </div></div>,
  ];
}

export default edit;
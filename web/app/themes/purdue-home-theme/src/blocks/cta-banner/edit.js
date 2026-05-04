import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    PanelRow,
    CheckboxControl,
    TextControl,
    SelectControl,
    Button,
  } from '@wordpress/components';
  
import { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ReactSortable } from 'react-sortablejs';
import "./editor.scss";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";



const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, backgroundPosition, headerFontSize, subheader, mediaType, mediaURL, mediaAlt, mediaTitle, linkDisplay, links, id, fieldId, buttonName} = props.attributes;
  const blockProps = useBlockProps();
  const BLOCKS_TEMPLATE = [
    [ 'core/paragraph', { placeholder: 'Add Content' } ],
  ];
  const ALLOWED_BLOCKS = [
    'core/paragraph', 'gravityforms/form', 'purdue/custom-downloads'
    ]

  setAttributes({ fieldId: props.clientId });
  const removeItem = (identifier) => {
   const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
    buttonCSS:''
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
  const handleExternalChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleButtonCSSChange = (css, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonCSS: css,
		  } : item
	  );
	  setAttributes({ links: newLinks });

  }
let editorFields;
editorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`link ${index+1}`}>
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
      </PanelRow>:""
      }
      {
        linkDisplay==="buttons"?
        <PanelRow>
        <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange(css,item.id);
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
            label="Background position"
            value={ backgroundPosition }
            options={ [
              { label: 'Top', value: 'top' },
              { label: 'Center', value: 'center' },
              { label: 'Bottom', value: 'bottom' },
            ] }
            onChange={ ( backgroundPosition ) => {
              setAttributes( { backgroundPosition } )
            } }
          />
        </PanelRow>


        <PanelRow>
          <SelectControl
            label="Choose a heading size"
            value={ headerFontSize }
            options={ [
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' },
            ] }
            onChange={ ( headerFontSize ) => {
              setAttributes( { headerFontSize } )
            } }
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
        { linkDisplay === "dropdown" ? 
          <PanelRow>
          <TextControl
            label="Dropdown Button Text"
            value={ buttonName }
            placeholder="Learn More"
            onChange={ ( buttonName ) => setAttributes( { buttonName } ) }
          />
        </PanelRow>
        : ""
        }
        <PanelRow>
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={ id }
            onChange={ ( id ) => setAttributes( { id } ) }
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
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">

     
    
    <div className={`purdue-home-cta-banner purdue-home-cta-banner-editor`}>        

        <MediaUploadCheck>
          <MediaUpload
            onSelect={ ( img ) => {
              console.log(img)
              setAttributes( {
                mediaType: img.type,
                mediaURL: img.url,
                mediaAlt: img.alt,
                mediaTitle: img.title,
              } );
              console.log(mediaType)

            } }
            render={ ( { open } ) => {
              return (
                <div className={`image`}>
                    {mediaType==="image" ? 
                    <img
                      className=""
                      src={mediaURL}
                    />:""}
                    {mediaType==="video" ? <video muted playsinline="" src={mediaURL}/>:""}
                  <div className="image-buttons">
                  <Button isPrimary onClick={ open }>{ mediaURL !== '' ? 'Select a new media' : 'Select a media' }</Button>
                  </div>                    
                </div>
              );
            } }
          />
        </MediaUploadCheck>   
        <div className={`section has-padding-exlarge`}>  
          <div className="container">
            <RichText
              tagName="h2"
              value={subheader}
              className={`purdue-home-subheader purdue-home-cta-banner__subheader`}
              onChange={(subheader) => {
                setAttributes({ subheader});
              }}
              placeholder="Add Section Header"
            ></RichText>
            <RichText
              tagName="h3"
              value={header}
              className={`purdue-home-cta-banner__header${headerFontSize === "small" ? " font-size-small":""}${headerFontSize === "medium" ? " font-size-medium":""}`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add header"
            ></RichText>
             <div className={`container has-white-color block-editor-inner-blocks`}>
                <InnerBlocks
                  allowedBlocks={ ALLOWED_BLOCKS }
                />
              </div>
            {
              linkDisplay === "buttons"?
              <ul className="purdue-home-button-list">
              {links.length>0 && links[0].linkURL?links.map((link, index) => {
                return <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
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
                <button type="button" className="purdue-home-button">{buttonName}</button>
              </form>
             :""
            }

          </div>
        </div>
    </div>
    </div>,
  ];
};

export default edit;
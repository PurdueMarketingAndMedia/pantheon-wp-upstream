import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";

import { InspectorControls, RichText, useBlockProps, MediaUploadCheck, MediaUpload,} from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import './editor.scss';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { type,subHeader, text, background, outerBackground, id, buttons, stackButton, mediaType, mediaURL, mediaAlt, mediaTitle } = props.attributes;
  const blockProps = useBlockProps();

	const initialLink = { id, buttonText: '', buttonURL: '', buttonExternal: false, buttonColor: 'black', buttonCSS: ''}
  	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj;
		if (buttons.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(buttons));
		}
		setAttributes({buttons: obj});
	}, [])

  const addItem = () => {
	  let newLinks= [...buttons];
	  newLinks.push(makeLink());
	  setAttributes({buttons: newLinks});
  }

  const removeItems = (id) => {
    const removeItems = buttons.filter( item => item.id !== id );
    setAttributes({
      buttons: removeItems
    })
  }

  const handleLinkTextChange = (text, id)=>{
	  const newLinks = buttons.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonText: text,
		  } : item
	  );
	  setAttributes({ buttons: newLinks });
  }

  const handleLinkURLChange = (url, id)=>{
	  const newLinks = buttons.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonURL: url,
		  } : item
	  );
	  setAttributes({ buttons: newLinks });
  }
  const handleColorChange = (color, id)=>{
	  const newLinks = buttons.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ buttons: newLinks });
  }
  const handleExternalChange = (id)=>{
	  const newLinks = buttons.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonExternal: !item.buttonExternal,
		  } : item
	  );
	  setAttributes({ buttons: newLinks });
  }
  const handleButtonCSSChange = (css, id)=>{
	  const newLinks = buttons.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonCSS: css,
		  } : item
	  );
	  setAttributes({ buttons: newLinks });
  }

  const ALLOWED_MEDIA_TYPES = [ 'image' ];

//following others, saves time
const editorButtons = buttons.map((item, index) => {
  return(
    <PanelBody initialOpen={true} key={item.id} title={item.title?item.title:`Button ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.buttonText }
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
          value={item.buttonURL}
        />
      </PanelRow>
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
        </PanelRow>
      <PanelRow>
        <CheckboxControl
          label="Open link in new tab?"
          checked={item.buttonExternal}
          onChange={() => {
            handleExternalChange(item.id);
          }}
        />
      </PanelRow>
      <PanelRow>
        <TextControl
            label="Button CSS class(es)"
            value={item.buttonCSS}
            onChange={(css) => {
              handleButtonCSSChange(css,item.id);
            }}
          />
      </PanelRow>
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeItems(item.id);
        }}
      >
        Remove Item
      </Button>
    </PanelBody>
  )
})
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Type"
            value={ type }
            options={
              [
                { label: 'Regular', value: 'regular' },
                { label: 'Narrow', value: 'narrow' },
                { label: 'With Image', value: 'image' },
              ]
            }
            onChange={ ( type ) => {
              setAttributes( { type } )
            } }
          />
        </PanelRow>
        {
          type==="narrow"?
          <PanelRow>
            <SelectControl
              label="Outer Backgorund"
              value={ outerBackground }
              options={
                [
                  { label: 'None', value: 'none' },
                  { label: 'Black', value: 'black' },
                  { label: 'Gray', value: 'gray' },
                  { label: 'Gold', value: 'gold' },
                ]
              }
              onChange={ ( outerBackground ) => {
                setAttributes( { outerBackground } )
              } }
            />
          </PanelRow>:""
        }
        {
          type !=="image"?
          <PanelRow>
          <SelectControl
            label={`${type==="Narrow"?"Inner Background":"Background"}`}
            value={ background }
            options={
              [
                { label: 'None', value: 'none' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
                { label: 'Gold', value: 'gold' },
              ]
            }
            onChange={ ( background ) => {
              setAttributes( { background } )
            } }
          />
        </PanelRow>
        : ""
         }
        
        <PanelBody title={__('Buttons')}>
          <PanelRow>
            <ReactSortable
                list={buttons}
                setList={ (val) => {
                  const buttonsID = [],
                    valID = [];

                  buttons.map( (item) => buttonsID.push(item.id))
                  val.map((item) => valID.push(item.id));

                  if(_.isEqual(buttonsID, valID)){
                    return;
                  }

                  setAttributes({
                    buttons: val
                  })
                }}  
                className='sortable-posts'
            >
              {editorButtons}
            </ReactSortable>
          </PanelRow>
          {editorButtons.length < 3 && 
          <Button
              isPrimary
              onClick={() => addItem() }
            >
              Add New Button
            </Button>
          }
        </PanelBody>
        {
           type==="narrow"&&buttons.length>1?
          <PanelRow>
            <CheckboxControl
              label="Stack buttons on deasktop?"
              checked={stackButton}
              onChange={() => {
                setAttributes({stackButton: !stackButton});
              }}
            />
          </PanelRow>:""
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
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-cta-strap${type==="narrow"?" purdue-home-cta-strap__narrow":""} ${type==="image"?" purdue-home-cta-strap__image":""} purdue-home-cta-strap-preview`}>    
        <div className={`section${type==="narrow"?` has-${outerBackground}-background`:` has-${background}-background`}`}>  
          <div className={`container${type==="narrow"?` has-${background}-background`:""}`}>
            <div className='purdue-home-cta-strap__container'>
              <div className='purdue-home-cta-strap__container--left'>
                {
                  type === "image"?
                  <MediaUploadCheck>
                  <MediaUpload
                    onSelect={ ( img ) => {
                      setAttributes( {
                        mediaType: img.type,
                        mediaURL: img.url,
                        mediaAlt: img.alt,
                        mediaTitle: img.title,
                      } );
                      console.log(mediaType)
        
                    } }
                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                    render={ ( { open } ) => {
                      return (
                        <><div className={`image`}>
                          <img
                            className=""
                            src={mediaURL} />
                        </div>
                        <div className="image-buttons">
                            <Button isPrimary onClick={open}>{mediaURL !== '' ? 'Select a new media' : 'Select a media'}</Button>
                        </div></>      
                      );
                    } }
                  />
                </MediaUploadCheck> :""
                }
                <div>
                {
                  type !=="regular"?
                  <RichText
                    tagName="p"
                    value={subHeader}
                    className="purdue-home-cta-strap__subTitle"
                    onChange={(subHeader) => {
                      setAttributes({ subHeader});
                    }}
                    placeholder="Add Section Header"
                  />:""
                }

                  <RichText
                    tagName="p"
                    value={text}
                    className={`purdue-home-cta-strap__content`}
                    onChange={(text) => {
                      setAttributes({ text});
                    }}
                    placeholder="Add content"
                  ></RichText>
                  </div>
              </div>
              <div className='purdue-home-cta-strap__container--right'>
                <ul className='purdue-home-button-list'>
               {buttons.length > 0 && buttons[0].buttonURL?buttons.map(( item, index) => {
                    return <li>
                        <a className={`purdue-home-button${item.buttonColor==="black"?" purdue-home-button--black":""}${item.buttonColor==="white"?" purdue-home-button--white":""}`} href={item.buttonURL} target={`${item.buttonExternal?"_blank":"_self"}`}>{item.buttonText.trim()}</a>
                      </li>
                  }) : ""}  
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>,
  ];
}

export default edit;
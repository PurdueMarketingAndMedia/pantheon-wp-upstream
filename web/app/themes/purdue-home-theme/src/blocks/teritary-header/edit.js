import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button
} from '@wordpress/components';

import { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { ReactSortable } from 'react-sortablejs';
import {normalizeUuid} from "../../utils/normalizeUuid";
import {useEffect} from "react";

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props ) => {
  const { className, setAttributes } = props;
  const {header, background, mediaType, mediaURL, mediaAlt, mediaTitle,links,id} = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink ={
    id:'',
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
  }

	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, []);


const handleAddNewLink = ()=>{
	let newLinks= [...links];
	newLinks.push(makeLink());
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
const handleLinkExternalChange = (id)=>{
  const newLinks = links.map((item) =>
	  item.id === id ? {
		  ...item,
		  external: !item.external,
	  } : item
  );
  setAttributes({ links: newLinks });
}
let linksEditorFields;
linksEditorFields = links.map((item, index) => {   
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
            handleLinkExternalChange(item.id);
          }}
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
          label="Make it full width"
          checked={item.fullWidth}
          onChange={() => {
            handleWidthChange(item.id);
          }}
        />
      </PanelRow>
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
            label="Backgorund"
            value={ background }
            help={background==="image"?"Select a background image on page editor":""}
            options={
              [
                { label: 'None', value: 'none' },
                { label: 'Black', value: 'black' },
                { label: 'Dark Gray', value: 'dark-gray' },
                { label: 'Gold', value: 'gold' },
                { label: 'Image', value: 'image' },
              ]
            }
            onChange={ ( background ) => {
              setAttributes( { background } )
            } }
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
            {linksEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        <PanelRow>
          <Button
            isPrimary
            onClick={() => handleAddNewLink()}
          >
            Add New Link
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-cta-banner purdue-home-teritary-hero purdue-home-cta-hero-editor`}>  
      {
        background==="image"?
        <MediaUploadCheck>
        <MediaUpload
          onSelect={ ( img ) => {
            setAttributes( {
              mediaType: img.type,
              mediaURL: img.url,
              mediaAlt: img.alt,
              mediaTitle: img.title,
            } );
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
      </MediaUploadCheck>:""
      } 

        <div className={`section has-${background}-background has-padding-top-large has-padding-bottom-large`}>  
          <div className={`container`}>
                <RichText
                tagName='h1'
                value={header}
                className={`second-level-page-heading purdue-home-teritary-hero__header`}
                onChange={(header) => {
                  setAttributes({ header});
                }}
                placeholder="Add Page Header"
              ></RichText>
              <div className='purdue-home-teritary-hero_content'>
                <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />
              </div>
              {links.length>0 && links[0].linkURL?links.map((link, index) => {
                return  <ul key={index} className="purdue-home-button-list">                
                <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                    </li>
                </ul>}):""}
          </div>
        </div>
    </div>
    </div>,
  ];
};

export default edit;
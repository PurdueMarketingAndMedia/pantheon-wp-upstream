import { __ }  from '@wordpress/i18n';
import { PanelBody, PanelRow, RadioControl, SelectControl,TextControl,Button,CheckboxControl } from "@wordpress/components";
import { InnerBlocks, InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } from "@wordpress/block-editor";

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];
import { ReactSortable } from 'react-sortablejs';
import './editor.scss';
import { button } from '@wordpress/icons';

import {normalizeUuid} from "../../utils/normalizeUuid";
import { useEffect } from "react";

const edit = props => {
  const { className, setAttributes } = props;
  const { id, header, subheader, subtext, mediaURL, mediaAlt, links, background, borderBottom} = props.attributes;
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
    buttonCSS:''
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
	}, [])

  const handleAddNew = ()=>{
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
  const handleExternalChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleButtonCSSChange = (css, index)=>{
    let newLinks= structuredClone(links);
    newLinks[index].buttonCSS=css;
    setAttributes({links: newLinks});
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
      <PanelRow>
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange(css,index);
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
  return (
    [
      <InspectorControls key="1">
        <PanelBody>

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
        <CheckboxControl
          label="Add a border below intro conent?"
          checked={borderBottom}
          onChange={() => {
            setAttributes( { borderBottom: !borderBottom } );
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
        <div key="2" {...blockProps}>
        <div
         className={ `purdue-home-layout--left-banner purdue-home-layout--left-banner-editor has-${background}-background` }
        >
        <MediaUploadCheck>
          <MediaUpload
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
        <div  className={`section has-padding-top-large has-padding-bottom-large`}>  
          <div className="container">
            <RichText
              tagName="p"
              value={subheader}
              className={`tagged-header tagged-header--gold purdue-home-layout--left-banner__subheader`}
              onChange={(subheader) => {
                setAttributes({ subheader});
              }}
              placeholder="Add Section Header"
            ></RichText>
            <RichText
              tagName="h1"
              value={header}
              className={`second-level-page-heading purdue-home-layout--left-banner__header`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add Page Header"
            ></RichText>
            <RichText
              tagName="p"
              value={subtext}
              className={`purdue-home-layout--left-banner__subtext`}
              onChange={(subtext) => {
                setAttributes({ subtext});
              }}
              placeholder="Add subtext"
            ></RichText>
              <ul className="purdue-home-button-list">
              {links.length>0 && links[0].linkURL?links.map((link, index) => {
                return <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                </li>
              }):""}
            </ul>
          </div>
        </div>
        {
          borderBottom?
          <div className="section has-padding-top-none has-padding-top-none purdue-home-layout--left-banner__border">
            <div className="container">
              <hr />
            </div>
            </div>:""
        }
            <InnerBlocks
              template={ BLOCKS_TEMPLATE }
              templateLock={ false }
            />
      </div>
      </div>,
    ]
  )
}

export default edit;
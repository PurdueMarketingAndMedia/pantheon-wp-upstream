import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from '@wordpress/components';
import './editor.scss';

import { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { ReactSortable } from 'react-sortablejs';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { contentAlign, header, background, subheader, imgs, links, paddingTop, paddingBottom, id} = props.attributes;
  const blockProps = useBlockProps();
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
    let newLinks=[...links];
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
            onClick={() => handleAddNew()}
          >
            Add New Link
          </Button>
        </PanelRow>
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
      <div className={`purdue-home-cta-card-block purdue-home-cta-card-block-editor`}>   
        <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}`}>  
          <div className="container">
            <div className={`purdue-home-cta-card-block__container${contentAlign==="left"?" purdue-home-cta-card-block__container--reversed":""}`}>
              <div className="purdue-home-cta-card-block__image-container">
                <div className={`glide`}>
                  <div className="glide__track" data-glide-el="track">
                  <MediaUploadCheck>
                    <MediaUpload
                      addToGallery={true}
                      multiple={true}
                      gallery={true}
					  value={imgs.map((img) => img.id)}
                      onSelect={ ( imgs ) => {
                        setAttributes( { imgs } )
                      } }
                      render={ ( { open } ) => {
                        return <div className="image-slider-editor">
                        <div className="buttons-container">
                              <button isSecondary onClick={open}>
                                {
                                  imgs.length === 0
                                  ? "Select images"
                                  : "Select new images"
                                }
                              </button>
                        </div>
                        {imgs.length>0?
                         <div className="glide__slides">
                          {imgs.map((img, index)=>{
                            return <div key={index} className="glide__slide">
                            <figure className={`image${img.caption?" has-caption":""}`}>
                                <img src={img.url} alt={img.alt} />
                                <figcaption>{img.caption}</figcaption>
                              </figure>    
                              </div>              
                          })
                        }
                        </div>
                        :""}                       
                      </div>
                      } }
                    />
                  </MediaUploadCheck>   
                  </div>
                  </div>
              </div>
              <div className="purdue-home-cta-card-block__content-container">
                <RichText
                  tagName="h2"
                  value={subheader}
                  className={`purdue-home-cta-card-block__subheader`}
                  onChange={(subheader) => {
                    setAttributes({ subheader});
                  }}
                  placeholder="Add Section Header"
                ></RichText>
                <RichText
                  tagName="h3"
                  value={header}
                  className={`purdue-home-cta-card-block__header`}
                  onChange={(header) => {
                    setAttributes({ header});
                  }}
                  placeholder="Add Header"
                ></RichText>
                <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />
                  <ul className="purdue-home-button-list">
                    {links.length>0 && links[0].linkURL?links.map((link, index) => {
                      return <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                      </li>
                    }):""}
                  </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>,
  ];
};

  export default edit;
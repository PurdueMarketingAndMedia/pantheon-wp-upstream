import './editor.scss';
import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  Button,
  Disabled
} from '@wordpress/components';

import { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } from "@wordpress/block-editor";

import { ReactSortable } from 'react-sortablejs';

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, medias, links, id} = props.attributes;
  const blockProps = useBlockProps();

  const removeLink = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.linkText!== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const removeMedia = (identifier) => {
    const newMedias = medias.filter((item) => {
      return item.mediaId!== identifier;
    });
    setAttributes({ medias: newMedias });
  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonCSS: '',
    external:false,
  }
  const initialMedia ={
    mediaId:0,
    mediaType:'img',
    mediaURL:'',
    mediaAlt:'',
    mediaTitle:'',
  }
  if(links.length ===0){
    setAttributes({links:[initialLink]})
  }
  if(medias.length ===0){
    setAttributes({medias:[initialMedia]})
  }
  const handleAddNewLink = ()=>{
    let newLinks=[...links];
    newLinks.push(initialLink);
    setAttributes({links: newLinks});
  }
  const handleLinkTextChange = (text, index)=>{
    let newLinks=[...links];
    newLinks[index].linkText=text;
    setAttributes({links: newLinks});
  }
  const handleLinkURLChange = (url, index)=>{
    let newLinks=[...links];
    newLinks[index].linkURL=url;
    setAttributes({links: newLinks});
  }

  const handleButtonCSSChange = (val, index)=>{
    let newLinks=[...links];
    newLinks[index].buttonCSS=val;
    setAttributes({links: newLinks});
  }

  const handleExternalChange = (index)=>{
    let newLinks=[...links];
    newLinks[index].external=!newLinks[index].external;
    setAttributes({links: newLinks});
  }
  const handleAddNewMedia = ()=>{
    let newMedias=[...medias];
    newMedias.push(initialMedia);
    setAttributes({medias: newMedias});
  }
  const handleChangeImage = ( img, index ) => {
      let newMedias = [ ...medias ];
      newMedias[ index ].mediaId = img.id;
      newMedias[ index ].mediaType = img.type;
      newMedias[ index ].mediaURL = img.url;
      newMedias[ index ].mediaAlt = img.alt;
      newMedias[ index ].mediaTitle = img.title;
      setAttributes( { medias: newMedias } );
  }; 
let linksEditorFields;
linksEditorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={index} title={item.linkText?item.linkText:`link ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( val, index ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={'Link URL'}
          type="url"
          onChange={(val) => {
            handleLinkURLChange(val, index);
          }}
          value={item.linkURL}
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={'Button CSS Class(es)'}
          onChange={(val) => {
            handleButtonCSSChange(val, index);
          }}
          value={item.buttonCSS}
        />
      </PanelRow>
      <PanelRow>
        <CheckboxControl
          label="Open link in new tab?"
          checked={item.external}
          onChange={() => {
            handleExternalChange(index);
          }}
        />
      </PanelRow>
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeLink(item.linkText);
        }}
      >
        Remove Item
      </Button>
    </PanelBody>
  );
})
let mediaEditorFields;
mediaEditorFields = medias.map((item, index) => {
  return (
    <PanelBody initialOpen={false} key={index} title={`Media ${index+1}`}>
      <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ ( img ) => handleChangeImage (img, index)}
              render={ ( { open } ) => {
                return item.mediaURL !== '' ? (
                  <div>
                    {item.mediaType === 'image'?
                      <img src={item.mediaURL} />
                    :""}
                    {item.mediaType === 'video'?
                      <Disabled>
                        <video muted playsinline="" title={item.mediaTitle} src={item.mediaURL}>
                        </video>
                      </Disabled>
                    :""}
                    <Button
                      isSecondary                        
                      onClick={ open }
                    >
                      Select a New Media
                    </Button>
                  </div>
                ) : (
                    <Button
                    isSecondary
                      onClick={ open }
                    >
                      Open Media Library
                    </Button>);
              } }
            />
          </MediaUploadCheck>
          </PanelRow>
          <PanelRow>
          <Button
            style={{ marginTop: '5px'}}
            isSecondary
            onClick={() => {
              removeMedia(item.mediaId);
            }}
          >
            Remove Media
          </Button>
      </PanelRow>
    </PanelBody>);
})

  return [
    <InspectorControls key="1">
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
        <PanelBody title={__('Medias')}>
          <PanelRow>
          <ReactSortable

              list={medias}
              setList={(val) => {
                let mediaIds = [],
                  values = [];
                  medias.map((item) => mediaIds.push(item.mediaId));
                  val.map((item) => values.push(item.mediaId));
                  if (_.isEqual(mediaIds, values)) {
                    return;
                  }
                  setAttributes({
                    medias: val,
                  });
              }}
              className="sortable-posts"
            >
            {mediaEditorFields}
            </ReactSortable>
          </PanelRow>
          <hr></hr>
          <PanelRow>
            <Button
              isPrimary
              onClick={() => handleAddNewMedia()}
            >
              Add New Media
            </Button>
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
    <div className={`purdue-home-canopy-hero purdue-home-canopy-hero-editor`}>
        <div className="purdue-home-canopy-hero__canopy">
          {
            medias.length>0?
            <div className="continuous-moving-slider-editor">
              <div className="slide-track">
              {medias.map((item, index) => {
                if(index <Math.ceil(medias.length / 2)){
                  return <div  key={index} className="slide">
                    {item.mediaType==="image" ? <img src={item.mediaURL}/>:""}
                    {item.mediaType==="video" ? <video muted playsinline="" src={item.mediaURL}/>:""}
                    </div>
                }
              })}
            </div></div>:""
          }
          {
            medias.length>1?
            <div className="continuous-moving-slider-editor row-2">
              <div className="slide-track">
              {medias.map((item, index) => {
                if(index>=Math.ceil(medias.length / 2)){
                  return <div  key={index} className="slide">
                    {item.mediaType==="image" ? <img src={item.mediaURL}/>:""}
                    {item.mediaType==="video" ? <video muted playsinline="" src={item.mediaURL}/>:""}
                    </div>
                }
              })}
            
            </div></div>:""
          }
        </div>
        <div className={`section`}>  
          <div className="container">
            <RichText
              tagName="h1"
              value={header}
              className={`purdue-home-canopy-hero__header`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add header"
            ></RichText>
              <div className="purdue-home-canopy-hero__links">
                  <span>Quick Links:</span>
                  <ul className="purdue-home-button-list">
                    {links.length>0 && links[0].linkURL?links.map((link, index) => {
                      return <li key={index}><a className={`purdue-home-button ${link.buttonCSS ? link.buttonCSS : ""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                      </li>
                    }):""}
                  </ul>
              </div>
              <div className="purdue-home-canopy-hero__arrow hero-down-arrow" aria-hidden="true">
                <i className="fa-solid fa-chevron-down icon" aria-hidden="true"></i>
              </div>
          </div>
        </div> 
    </div>
    </div>,
  ];
};

export default edit;
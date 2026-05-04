import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
  Disabled
} from '@wordpress/components';
import { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } from '@wordpress/block-editor';
import { ReactSortable } from 'react-sortablejs';
import { __ } from '@wordpress/i18n'
import {normalizeUuid} from "../../utils/normalizeUuid";
import {useEffect} from "react";

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, subtext,  background, medias, links, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeLink = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const removeMedia = (identifier) => {

    const newMedias = medias.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ medias: newMedias });
  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
  }
  const initialMedia ={
    mediaId:0,
    mediaType:'img',
    mediaURL:'',
    mediaAlt:'',
    mediaTitle:'',
  }

	const makeLinks = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});
	const makeMedia = () => ({
		...initialMedia,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj, obj2;
		if (links.length === 0) {
			obj = [makeLinks()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}

		if (medias.length === 0) {
			obj2 = [makeMedia()]
		} else {
			obj2 = normalizeUuid(structuredClone(medias));
		}
		setAttributes({
			links: obj,
			medias: obj2
		});
	}, [])

  const handleAddNewLink = ()=>{
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
  const handleAddNewMedia = ()=>{
    let newMedias=[...medias];
    newMedias.push(makeMedia());
    setAttributes({medias: newMedias});
  }
  const handleChangeImage = ( img, id ) => {
	  const newLinks = medias.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title,
		  } : item
	  );
	  setAttributes({ medias: newLinks });
  }; 
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
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeLink(item.id);
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
    <PanelBody initialOpen={false} key={item.id} title={`Media ${index+1}`}>
      <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ ( img ) => handleChangeImage (img, item.id)}
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
              removeMedia(item.id);
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
          {
            medias.length<7?
            <PanelRow>
            <Button
              isPrimary
              onClick={() => handleAddNewMedia()}
            >
              Add New Media
            </Button>
          </PanelRow>:""
          }

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
    <div className={`purdue-home-media-grid purdue-home-media-grid-editor has-${background}-background`}>
      <div className={`section has-padding-top-large has-padding-bottom-large`}>  
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths">
            {
              medias.length>0?
              medias.map((item, index) => {
                    return index<2?<div key={index} className={`image is-16by9 image-${index}`}>
                      {item.mediaType==="image" ? <img src={item.mediaURL}/>:""}
                      {item.mediaType==="video" ? <video muted playsinline="" src={item.mediaURL}/>:""}
                      </div>:""
                }):""
            }
            <div className="purdue-home-media-grid__content-wrap">
          <div className="purdue-home-media-grid__content">
            <RichText
              tagName="h2"
              value={header}
              className={`purdue-home-media-grid__header`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add header"
            ></RichText>
            <RichText
              tagName="p"
              value={subtext}
              className={`purdue-home-canopy-hero__subtext`}
              onChange={(subtext) => {
                setAttributes({ subtext});
              }}
              placeholder="Add subtext"
            ></RichText>
              <ul className="purdue-home-button-list">
              {links.length>0 && links[0].linkURL?links.map((link, index) => {
                return <li key={link.id} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                </li>
              }):""}
              </ul>
            </div>
            </div>
            </div>
            <div className="column is-two-fifths">
            {
              medias.length>0?
              medias.map((item, index) => {
                    return index>=2?<div key={item.id} className={`image is-16by9 image-${index}`}>
                      {item.mediaType==="image" ? <img src={item.mediaURL}/>:""}
                      {item.mediaType==="video" ? <video muted playsinline="" src={item.mediaURL}/>:""}
                      </div>:""
                }):""
            }
            </div>
         </div>
          </div>
        </div> 
    </div></div>,
  ];
}
export default edit;
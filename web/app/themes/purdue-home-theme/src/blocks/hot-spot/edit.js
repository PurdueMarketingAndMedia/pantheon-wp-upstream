import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  RangeControl,
  TextareaControl,
  SelectControl,
  RadioControl,
  Button,
  Disabled
} from "@wordpress/components"
import { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const Edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, slides, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeSlides = (identifier) => {
    const newSlides = slides.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ slides: newSlides });
  };
  const initialSlides ={
    addLink1: false,
    link1_tag:'',
    link1_title:'',
    link1_content:'',
    link1_linkText:'Learn More',
    link1_linkURL:'',
    link1_external:true,
    link1_X:0,
    link1_Y:0,
    link1_mediaURL:'',
    link1_mediaAlt:'',
    addLink2: false,
    link2_tag:'',
    link2_title:'',
    link2_content:'',
    link2_linkText:'Learn More',
    link2_linkURL:'',
    link2_external:true,
    link2_X:0,
    link2_Y:0,
    link2_mediaURL:'',
    link2_mediaAlt:'',
    mediaId:0,
    mediaURL:'',
    mediaAlt:'',
    mediaCaption:''
  }
	const makeSlide = () => ({
		...initialSlides,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj;
		if (slides.length === 0) {
			obj = [makeSlide()]
		} else {
			obj = normalizeUuid(structuredClone(slides));
		}
		setAttributes({slides: obj});
	}, [])

  const handleAddNewSlide = ()=>{
    let newSlides=[...slides];
    newSlides.push(makeSlide());
    setAttributes({slides: newSlides});
  }
  const handleSlideChangeLinkImage1 = ( img, id ) => {
	const newLinks = slides.map((item) =>
	  item.id === id ? {
		  ...item,
		  link1_mediaURL: img.url,
		  link1_mediaAlt: img.alt,
	  } : item
	);
	setAttributes({ slides: newLinks });
};
const handleSlideChangeLinkImage2 = ( img, id ) => {
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_mediaURL: img.url,
			link2_mediaAlt: img.alt,
		} : item
	);
	setAttributes({ slides: newLinks });
};

const handleSlideLinkTitle1Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_title: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkTitle2Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_title: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkTag1Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_tag: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkTag2Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_tag: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkURL1Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_linkURL: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkText1Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_linkText: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkContent1Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_content: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkURL2Change = (text, id)=>{
  const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_linkURL: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkText2Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_linkText: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLinkContent2Change = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_content: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink1ExternalChange = (id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_external: !item.link1_external,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink2ExternalChange = (id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_external: !item.link2_external,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideAddLink1 = (id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			addLink1: !item.addLink1,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideAddLink2 = (id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			addLink2: !item.addLink2,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink1XChange = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_X: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink2XChange = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_X: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink1YChange = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link1_Y: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideLink2YChange = (text, id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			link2_Y: text,
		} : item
	);
	setAttributes({ slides: newLinks });
}
const handleSlideChangeImage = ( img, id ) => {
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			mediaId: img.id,
			mediaURL: img.url,
			mediaAlt: img.alt,
			mediaCaption: img.caption
		} : item
	);
	setAttributes({ slides: newLinks });
};
const handleImgCaption = (id)=>{
	const newLinks = slides.map((item) =>
		item.id === id ? {
			...item,
			showCaption: !item.showCaption,
		} : item
	);
	setAttributes({ slides: newLinks });
}

let slideEditorFields;
slideEditorFields = slides.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={`Slide ${index+1}`}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => handleSlideChangeImage (img, item.id)}
                allowedTypes={ ['image'] }
                render={ ( { open } ) => {
                  return item.mediaURL !== '' ? (
                    <div>
                      <img src={item.mediaURL} />
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
          <CheckboxControl
            label="Show image caption?"
            checked={ item.showCaption}
            onChange={ () => handleImgCaption( item.id ) }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add a hot spot?"
            checked={item.addLink1}
            onChange={() => {
              handleSlideAddLink1(item.id);
            }}
          />
        </PanelRow>
        {item.addLink1 ?
        <PanelRow>
          <TextControl
            label="Location for hot spot 1"
            value={ item.link1_tag }
            onChange={ ( val ) => handleSlideLinkTag1Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <TextControl
            label="Designate Spot for hot spot 1"
            value={ item.link1_title }
            onChange={ ( val ) => handleSlideLinkTitle1Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <TextareaControl
            label="Additional Info for hot spot 1"
            value={ item.link1_content }
            onChange={ ( val ) => handleSlideLinkContent1Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <TextControl
            label="Link Text for hot spot 1"
            value={ item.link1_linkText }
            onChange={ ( val ) => handleSlideLinkText1Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <TextControl
            label="Link for hot spot 1"
            value={ item.link1_linkURL }
            onChange={ ( val ) => handleSlideLinkURL1Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={ item.link1_external }
            onChange={ () => handleSlideLink1ExternalChange( item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => handleSlideChangeLinkImage1 (img, item.id)}
                allowedTypes={ ['image'] }
                render={ ( { open } ) => {
                  return item.link1_mediaURL !== '' ? (
                    <div>
                      <img src={item.link1_mediaURL} />
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
        </PanelRow>:""}
        {item.addLink1 ?
        <PanelRow>
          <RangeControl
              label="X position for hot spot 1"
              value={ item.link1_X }
              onChange={ ( value ) => handleSlideLink1XChange(value, item.id) }
              min={ 0 }
              max={ 100 }
          />
        </PanelRow>
        :""}
      {item.addLink1 ?
        <PanelRow>
          <RangeControl
              label="Y position for hot spot 1"
              value={ item.link1_Y }
              onChange={ ( value ) => handleSlideLink1YChange(value, item.id) }
              min={ 0 }
              max={ 100 }
          />
        </PanelRow>
        :""}
        {item.addLink1 ?
        <PanelRow>
          <CheckboxControl
            label="Add another hot spot?"
            checked={item.addLink2}
            onChange={() => {
              handleSlideAddLink2(item.id);
            }}
          />
        </PanelRow>
        :""}
      {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <TextControl
            label="Location for hot spot 2"
            value={ item.link2_tag }
            onChange={ ( val ) => handleSlideLinkTag2Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <TextControl
            label="Designated Spot for hot spot 2"
            value={ item.link2_title }
            onChange={ ( val ) => handleSlideLinkTitle2Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2  ?
        <PanelRow>
          <TextareaControl
            label="Additional Info for hot spot 2"
            value={ item.link2_content }
            onChange={ ( val ) => handleSlideLinkContent2Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2  ?
        <PanelRow>
          <TextControl
            label="Link Text for hot spot 2"
            value={ item.link2_linkText }
            onChange={ ( val ) => handleSlideLinkText2Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <TextControl
            label="Link for hot spot 2"
            value={ item.link2_linkURL }
            onChange={ ( val ) => handleSlideLinkURL2Change( val, item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={ item.link2_external }
            onChange={ () => handleSlideLink2ExternalChange( item.id ) }
          />
        </PanelRow>:""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => handleSlideChangeLinkImage2 (img, item.id)}
                allowedTypes={ ['image'] }
                render={ ( { open } ) => {
                  return item.link2_mediaURL !== '' ? (
                    <div>
                      <img src={item.link2_mediaURL} />
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
        </PanelRow>:""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <RangeControl
              label="X position for hot spot 2"
              value={ item.link2_X }
              onChange={ ( value ) => handleSlideLink2XChange(value, item.id) }
              min={ 0 }
              max={ 100 }
          />
        </PanelRow>
        :""}
        {item.addLink1 && item.addLink2 ?
        <PanelRow>
          <RangeControl
              label="Y position for hot spot 2"
              value={ item.link2_Y }
              onChange={ ( value ) => handleSlideLink2YChange(value, item.id) }
              min={ 0 }
              max={ 100 }
          />
        </PanelRow>
        :""}
     
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeSlides(item.id);
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
          <TextControl
            label="Add a header"
            value={ header }
            onChange={ ( header ) => setAttributes( { header } ) }
          />
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
      <PanelBody title={__('Slides')}>
        <PanelRow>
        <ReactSortable
            list={slides}
            setList={(val) => {
              let mediaIds = [],
                values = [];
                slides.map((item) => mediaIds.push(item.mediaId));
                val.map((item) => values.push(item.mediaId));
                if (_.isEqual(mediaIds, values)) {
                  return;
                }
                setAttributes({
                  slides: val,
                });
            }}
            className="sortable-posts"
          >
          {slideEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        <PanelRow>
          <Button
            isPrimary
            onClick={() => handleAddNewSlide()}
          >
            Add New Large Card
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-hot-spot purdue-home-hotspot-editor`}>  
        <h2 className={`purdue-home-hot-spot--header tagged-header`}>{header}</h2>    
        <div className={`glide purdue-home-slide__hot-spot-desktop`}>  
          <div className="glide__track" data-glide-el="track">
            <div className="glide__slides">
              {slides.length===1 && slides[0].mediaId === 0?
              <div style={{textAlign:"center"}}>Please add header and slides using side panel.</div>:""
              }
              {slides.length>0?
                slides.map((item, index) => {
                  return <div key={index} className="glide__slide">
                    <div className="purdue-home-cta-card purdue-home-cta-card--horizontal">
                      <div className="image is-16by9">
                        <img src={item.mediaURL}/>
                      </div>
                      {
                        item.link1_title?
                        <div className="hot-spot" style={{top: `calc(${item.link1_Y}% - 72px)`, left: `calc(${item.link1_X}% - 72px)` }}>
                        <button className="hot-spot-button modal-trigger" data-target={`${item.mediaId}-link-1`}><span className="is-sr-only">Open</span></button>
                        </div>:""
                      }
                      {
                        item.link2_title?
                        <div className="hot-spot" style={{top: `calc(${item.link2_Y}% - 72px)`, left: `calc(${item.link2_X}% - 72px)` }}>
                        <button className="hot-spot-button modal-trigger" data-target={`${item.mediaId}-link-2`}><span className="is-sr-only">Open</span></button>
                        </div>:""
                      }

                    </div>
                    </div>
                }):""
              }
            </div>
          </div>
        </div>
    </div>
    </div>,
  ];
}

export default Edit;
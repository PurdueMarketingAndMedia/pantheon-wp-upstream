import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  Button,
} from "@wordpress/components";
import { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import './editor.scss';
import {normalizeUuid} from "../../utils/normalizeUuid";
import { useEffect } from "react";
import {isBlockIdReserved} from "../../js/back-end/blocks";
import LinkPanelControl from "../../components/linkcomponent";

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { type, header, subheader, subtext, mediaType, mediaURL, mediaAlt, mediaTitle, sliderCards, links, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeSliderCards = (identifier) => {
    const newSliderCards = sliderCards.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ sliderCards: newSliderCards });
  };
  const initialSliderCards ={
    id:"",
    type:"rtb",
    text:'',
    source:'',
    linkURL:'',
    external:true,
    title:'',
    content:'',
    mediaAlt:'',
    mediaURL:''
  }

	const makeCard = () => ({
		...initialSliderCards,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj;
		if (sliderCards.length === 0) {
			obj = [makeCard()]
		} else {
			obj = normalizeUuid(structuredClone(sliderCards));
		}
		setAttributes({sliderCards: obj});
	}, [])

  const handleAddNewSlide = ()=>{
    let newSliderCards= [...sliderCards];
    newSliderCards.push(makeCard());
    setAttributes({sliderCards: newSliderCards});
  }
  const handleSlideTypeChange = (type, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  type: type,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideTextChange = (text, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  text: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideSourceChange = (text, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  source: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideURLChange = (url, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideExternalChange = (id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideTitleChange = (title, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: title,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideContentChange = (content, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  content: content,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
  const handleSlideMediaChange = (img, id)=>{
	  const newSliderCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaAlt: img.alt,
			  mediaURL: img.url,
		  } : item
	  );
	  setAttributes({ sliderCards: newSliderCards });
  }
let editorFields;
editorFields = sliderCards.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.text ? item.text.substring(0, 30) : `Card ${index+1}`}>
      <PanelRow>
        <SelectControl
          label="Slide Type"
          value={ item.type }
          options={ [
            { label: 'RTB Card', value: 'rtb' },
            { label: 'Plain Text', value: 'plain' },
            { label: 'Image', value: 'image' },
          ] }
          onChange={(type) => {
            handleSlideTypeChange(type, item.id);
          }}
        />
    </PanelRow>
    {
      item.type==="rtb"?
      <PanelRow>
        <TextareaControl
          label="RTB Text"
          value={ item.text }
          onChange={ ( val ) => handleSlideTextChange( val, item.id ) }
        />
      </PanelRow>:""
    }
    {
      item.type==="rtb"?
      <PanelRow>
        <TextareaControl
          label="RTB Source Text"
          value={ item.source }
          onChange={ ( val ) => handleSlideSourceChange( val, item.id ) }
        />
      </PanelRow>:""}
      {
      item.type==="rtb"?
      <PanelRow>
        <TextControl
          label={'Link URL to this card'}
          type="url"
          onChange={(val) => {
            handleSlideURLChange(val, item.id);
          }}
          value={item.linkURL}
        />
      </PanelRow>:""}
      {
      item.type==="rtb"?
      <PanelRow>
        <CheckboxControl
          label="Open link in new tab?"
          checked={item.external}
          onChange={() => {
            handleSlideExternalChange(item.id);
          }}
        />
      </PanelRow>:""}
      {
      item.type==="plain"?
      <PanelRow>
        <TextareaControl
          label="Card Title"
          value={ item.title }
          onChange={ ( val ) => handleSlideTitleChange( val, item.id ) }
        />
      </PanelRow>:""}
      {
      item.type==="plain"?
      <PanelRow>
        <TextareaControl
          label="Card Content"
          value={ item.content }
          onChange={ ( val ) => handleSlideContentChange( val, item.id ) }
        />
      </PanelRow>:""}
      {
      item.type==="image"?
      <PanelRow>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={ ( img ) => handleSlideMediaChange (img, item.id)}
          render={ ( { open } ) => {
            return item.mediaURL !== '' ? (
              <div>
                  <img src={item.mediaURL} />
                <Button
                  isSecondary                        
                  onClick={ open }
                >
                  Select a New Image
                </Button>
              </div>
            ) : (
                <Button
                isSecondary
                  onClick={ open }
                >
                  Select an Image
                </Button>);
          } }
        />
      </MediaUploadCheck>
      </PanelRow>:""}
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeSliderCards(item.id);
        }}
      >
        Remove Card
      </Button>
    </PanelBody>
  );
})
//optional links

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
  buttonCSS:'',
  ariaLabel:''
}
	useEffect(() => {
		let obj;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, [])

	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

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

const handleAiraLabelChange = (label, id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				ariaLabel: label
			} : item
		);
		setAttributes({ links: newLinks });
	}


	const handleButtonCSSChange = (css, id) => {
		const newLinks = links.map((item) =>
			item.id === id ? {
				...item,
				buttonCSS: css
			} : item
		);
		setAttributes({ links: newLinks });
}


let linksEditorFields;
linksEditorFields = links.map((item, index) => {   
return (
  <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`link ${index+1}`}>
     <LinkPanelControl
        item={item}
        onLinkTextChange={(val) => handleLinkTextChange(val, item.id)}
        onLinkURLChange={(val) => handleLinkURLChange(val, item.id)}
        onExternalChange={() => handleExternalChange(item.id)}
        onAiraLabelChange={(val) => handleAiraLabelChange(val, item.id)}
        onButtonCSSChange={(css) => handleButtonCSSChange(css, item.id)}
      />
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
            label="Hero Type"
            help="The Vertical Stack option can only have three cards."
            value={ type }
            options={ [
              { label: 'Slider', value: 'slider' },
              { label: 'Vertical Stack', value: 'stack' },
            ] }
            onChange={(type) => {
              setAttributes({type});
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
        <PanelBody title={__('Cards')}>
        <PanelRow>
        <ReactSortable

            list={sliderCards}
            setList={(val) => {
              let ids = [],
                values = [];
                sliderCards.map((item) => ids.push(item.id));
                val.map((item) => values.push(item.id));
                if (_.isEqual(ids, values)) {
                  return;
                }
                setAttributes({
                  sliderCards: val,
                });
            }}
            className="sortable-posts"
          >
          {editorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        {
          (type==="stack"&&sliderCards.length<4)||(type==="slider")?
          <PanelRow>
          <Button
            isPrimary
            onClick={() => handleAddNewSlide()}
          >
            Add New Card
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
            onClick={() => handleAddNew()}
          >
            Add New Link
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-cta-banner purdue-home-rtb-hero${type==="stack"?" purdue-home-rtb-hero--stack":""} purdue-home-rtb-hero-editor`}>   
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
                  <Button isPrimary onClick={ open }>{ mediaURL !== '' ? 'Select a new background media' : 'Select a background media' }</Button>
                  </div>                    
                </div>
              );
            } }
          />
        </MediaUploadCheck>     
        <div className={`section has-padding-top-large has-padding-bottom-large`}>  
          <div className="container">
          <div className="purdue-home-rtb-hero__content-wrap">
            <RichText
              tagName="p"
              value={subheader}
              className={`tagged-header tagged-header--gold purdue-home-rtb-hero__subheader`}
              onChange={(subheader) => {
                setAttributes({ subheader});
              }}
              placeholder="Add Section Header"              
            ></RichText>
            <RichText
              tagName="h1"
              value={header}
              className={`second-level-page-heading purdue-home-rtb-hero__header`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add Page Header"              
            ></RichText>
            <RichText
              tagName="p"
              value={subtext}
              className={`purdue-home-rtb-hero__subtext`}
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

          {type==="slider"&&sliderCards.length>0?
          <div className="purdue-home-rtb-hero__slider-wrap">
            <div className="glide purdue-home-slider--rtb-hero">           
              <div className="glide__track" data-glide-el="track">
                <div className="glide__slides">
                    {sliderCards.map((item, index) => {
                      return <div key={index} className="glide__slide">
                        {
                          item.type==="rtb"?
                          <div className="purdue-home-proofpoint--simple">
                          {item.text?
                          <span className="purdue-home-proofpoint--simple__content">{item.text}</span>:""}
                            {item.source && item.linkURL !== ''?
                          <a href={item.linkURL} className="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source">{item.source}</a>:<span className="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source">{item.source}</span>}
                        </div> :""
                        }
                        {
                          item.type==="plain"?
                          <div className="purdue-home-content-card">
                            <p className="purdue-home-content-card__title">{item.title}</p>
                            <p className="purdue-home-content-card__content">{item.content}</p>
                          </div>:""
                        }
                        {
                          item.type==="image"?
                          <figure className="image">
                            <img src={item.mediaURL} alt={item.mediaAlt}/>
                          </figure>:""
                        }
                      </div>                          
                    })}
                </div>
              </div>
            </div>
          </div>:""}
          {type==="stack"&&sliderCards.length>0?
          <div className="purdue-home-rtb-hero__slider-wrap container">
              <div className="purdue-home-rtb-hero__stack-wrap">
             {sliderCards.map((item, index) => {
              if(index<3){
                return item.type==="rtb"?
                <div key={index} className="purdue-home-proofpoint--simple">
                {item.text?
                <span className="purdue-home-proofpoint--simple__content">{item.text}</span>:""}
                  {item.source && item.linkURL !== ''?
                <a href={item.linkURL} className="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source">{item.source}</a>:<span className="purdue-home-proofpoint__source purdue-home-proofpoint--simple__source">{item.source}</span>}
              </div> :
                (item.type==="plain"?
                <div className="purdue-home-content-card">
                  <p className="purdue-home-content-card__title">{item.title}</p>
                  <p className="purdue-home-content-card__content">{item.content}</p>
                </div>:
                  <figure className="image">
                  <img src={item.mediaURL} alt={item.mediaAlt}/>
                </figure>)
              }
              })              
            }
            </div>
            </div>
          :""}
          </div>
        </div>
    </div>
    </div>,
  ];
}

export default edit;
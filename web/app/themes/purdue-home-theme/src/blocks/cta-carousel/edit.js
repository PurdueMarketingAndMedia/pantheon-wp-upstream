import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    PanelRow,
    CheckboxControl,
    TextControl,
    SelectControl,
    Button,
    Disabled
} from '@wordpress/components';

import { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { ReactSortable } from 'react-sortablejs';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";
const BLOCKS_TEMPLATE = [
    [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { background, header, paddingTop, paddingBottom, cards, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeCard= (identifier) => {
    const newCards = cards.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ cards: newCards });
  };
  const initialCards={
    id:0,
    type:"story",
    backgroundType: 'image',
    backgroundColor: '',
    backgroundURL:'',
    backgroundAlt:'',
    mediaType:'image',
    mediaURL:'',
    mediaAlt:'',
    mediaTitle:'', 
    youtube:'',
    citeName:'',
    citeTitle:'',
    tag:'',
    title:'',
    subtext:'',
    linkText1:'',
    linkURL1:'',
    color1:'gold',
    external1:true,
    linkText2:'',
    linkURL2:'',
    color2:'gold',
    external2:true,
  }


	const makeCard = () => ({
		...initialCards,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj;
		if (cards.length === 0) {
			obj = [makeCard()]
		} else {
			obj = normalizeUuid(structuredClone(cards));
		}
		setAttributes({cards: obj});
	}, [])

  const handleAddNew = ()=>{
    let newCards=[...cards];
    newCards.push(makeCard());
    setAttributes({ cards: newCards });
  }
  const handleCardBackgroundType = ( type, id ) => {
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  backgroundType: type,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  };
  const handleCardbBackgroundColor = ( color, id ) => {
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  backgroundColor: color,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  };
  const handleCardChangeBackground = ( img, id ) => {
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  backgroundURL: img.url,
			  backgroundAlt: img.alt,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  };
  const handleCardChangeImage = ( img, id ) => {
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  };
  const handleTypeChange = (type, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  type: type,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleYoutubeLinkChange = (url, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  youtube: url,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleCiteNameChange = (citeName, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  citeName: citeName,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleCiteTitleChange = (citeTitle, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  citeTitle: citeTitle,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleTagChange = (tag, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  tag: tag,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleTitleChange = (title, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: title,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleSubtextChange = (subtext, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  subtext: subtext,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleLinkText1Change = (linkText, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText1: linkText,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleLinkURL1Change = (url, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL1: url,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleExternal1Change = (id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external1: !item.external1,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleLinkText2Change = (linkText, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText2: linkText,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleColor1Change = (color, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  color1: color,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleColor2Change = (color, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  color2: color,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleLinkURL2Change = (url, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL2: url,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleExternal2Change = (id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external2: !item.external2,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
let editorFields;
editorFields = cards.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={`Card ${index+1}`}>
        <PanelRow>
          <SelectControl
            label="Select Background Type"
            value={ item.backgroundType }
            options={ [
              { label: 'Image', value: 'image' },
              { label: 'Color', value: 'color' },
            ] }
            onChange={(type) => {
              handleCardBackgroundType(type, item.id);
            }}
          />
        </PanelRow>
        {
        item.backgroundType === "color"?
        <PanelRow>
          <SelectControl
            label="Select Background Color"
            value={ item.backgroundColor }
            options={ [
              { label: 'White', value: 'white' },
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
              { label: 'Gray', value: 'gray' },
            ] }
            onChange={(color) => {
              handleCardbBackgroundColor(color, item.id);
            }}
          />
        </PanelRow>:""}
        {item.backgroundType === "image"? 
        <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ ( img ) => handleCardChangeBackground (img, item.id)}
              render={ ( { open } ) => {
                return item.backgroundURL !== '' ? (
                  <div>
                      <img src={item.backgroundURL} />
                    <Button
                      isSecondary                        
                      onClick={ open }
                    >
                      Select a New background Image
                    </Button>
                  </div>
                ) : (
                    <Button
                    isSecondary
                      onClick={ open }
                    >
                      Select a background image
                    </Button>);
              } }
            />
          </MediaUploadCheck>
      </PanelRow>:""}
      <PanelRow>
          <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => handleCardChangeImage (img, item.id)}
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
                        Select a new featured media
                      </Button>
                    </div>
                  ) : (
                      <Button
                      isSecondary
                        onClick={ open }
                      >
                         Select a featured media
                      </Button>);
                } }
              />
            </MediaUploadCheck>
      </PanelRow>
      <PanelRow>
          <SelectControl
            label="Choose Card Type"
            value={ item.type }
            options={ [
              { label: 'Story', value: 'story' },
              { label: 'Quote', value: 'quote' },
              { label: 'Profile', value: 'profile' },
            ] }
            onChange={ ( type ) => handleTypeChange(type, item.id) }
          />
        </PanelRow>
      <PanelRow>
        <TextControl
          label={'Optional YouTube Link URL'}
          type="url"
          onChange={(val) => {
            handleYoutubeLinkChange(val, item.id);
          }}
          value={item.youtube}
        />
      </PanelRow>
      {
        item.type==="story" || item.type === "profile"?
        <PanelRow>
          <TextControl
            label="Title"
            value={ item.title }
            onChange={ ( val ) => handleTitleChange( val, item.id ) }
          />
        </PanelRow>:""
      }
      {
        item.type==="story"?
        <PanelRow>
          <TextControl
            label="Tag"
            value={ item.tag }
            onChange={ ( val ) => handleTagChange( val, item.id ) }
          />
        </PanelRow>:""
      }
      {
        item.type==="quote"  || item.type==="profile"?
        <PanelRow>
          <TextControl
            label="Cite Name"
            value={ item.citeName }
            onChange={ ( val ) => handleCiteNameChange( val, item.id ) }
          />
        </PanelRow>:""
      }
      {
        item.type==="quote" || item.type==="profile"?
        <PanelRow>
          <TextControl
            label="Cite Title"
            value={ item.citeTitle }
            onChange={ ( val ) => handleCiteTitleChange( val, item.id ) }
          />
        </PanelRow>:""
      }
      <PanelRow>
        <TextControl
          label="Content"
          value={ item.subtext }
          onChange={ ( val ) => handleSubtextChange( val, item.id ) }
        />
      </PanelRow>
      {
        item.type!=="profile" && item.youtube==="" ?
      <PanelRow>
        <TextControl
          label={'Link Text #1'}
          onChange={(val) => {
            handleLinkText1Change(val, item.id);
          }}
          value={item.linkText1}
        />
      </PanelRow>:""}
      {
        item.type!=="profile" &&  item.youtube===""?
      <PanelRow>
        <TextControl
          label={'Link URL #1'}
          type="url"
          onChange={(val) => {
            handleLinkURL1Change(val, item.id);
          }}
          value={item.linkURL1}
        />
      </PanelRow>:""}
      {
        item.youtube==="" && item.type!="profile"?
      <PanelRow>
        <CheckboxControl
          label="Open link #1 in new tab?"
          checked={item.external1}
          onChange={() => {
            handleExternal1Change(item.id);
          }}
        />
      </PanelRow>:""}
      {
        item.youtube==="" && item.type!=="profile"?
        <PanelRow>
          <SelectControl
            label="Choose a button color"
            value={ item.color1 }
            options={ [
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
            ] }
            onChange={(color) => {
              handleColor1Change(color, item.id);
            }}
          />
        </PanelRow>:""}
      {
       item.type !== "profile" && item.linkURL1 && item.youtube===""?
        <PanelRow>
        <TextControl
          label={'Link Text #2'}
          onChange={(val) => {
            handleLinkText2Change(val, item.id);
          }}
          value={item.linkText2}
        />
      </PanelRow>:""
      }
      {
         item.type !== "profile" && item.linkURL1 && item.youtube===""?
         <PanelRow>
          <TextControl
            label={'Link URL #2'}
            type="url"
            onChange={(val) => {
              handleLinkURL2Change(val, item.id);
            }}
            value={item.linkURL2}
          />
        </PanelRow>:""
      }
      {
         item.type !== "profile" && item.linkURL1 && item.youtube===""?
         <PanelRow>
          <CheckboxControl
            label="Open link #2 in new tab?"
            checked={item.external2}
            onChange={() => {
              handleExternal2Change(item.id);
            }}
          />
        </PanelRow>:""
      }
      {
        item.type !== "profile" && item.linkURL1 && item.youtube===""?
        <PanelRow>
          <SelectControl
            label="Choose a button color"
            value={ item.color2 }
            options={ [
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
            ] }
            onChange={(color) => {
              handleColor2Change(color, item.id);
            }}
          />
        </PanelRow>:""
      }
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeCard(item.id);
        }}
      >
        Remove Card
      </Button>
    </PanelBody>
  );
})
function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose the background"
            value={ background }
            options={ [
              { label: 'None', value: 'none' },
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
              { label: 'Gray', value: 'gray' },
            ] }
            onChange={ ( background ) => setAttributes( { background } ) }
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
            list={cards}
            setList={(val) => {
              let ids = [],
                values = [];
                cards.map((item) => ids.push(item.id));
                val.map((item) => values.push(item.id));
                if (_.isEqual(ids, values)) {
                  return;
                }
                setAttributes({
                  cards: val,
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
            Add New Card
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-cta-carousel purdue-home-cta-carousel-editor`}>   
        <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}`}>  
          <div className={`container`}>
            <div className={`tagged-header-container`}>
                <RichText
                  tagName="h2"
                  value={header}
                  className={`tagged-header${background!=="gold"?" tagged-header--gold":""}`}
                  onChange={(header) => {
                    setAttributes({ header});
                  }}
                  placeholder="Add header"
                ></RichText>
              </div>
              {
                cards && cards.length>0?
                <div className="purdue-home-cta-carousel__cards">
                  <div className={`glide`}>
                  <div className="glide__track" data-glide-el="track">
                  <div className="glide__slides">
                  {cards.map((item, index) => {
                    const videoId = getVideoId(item.youtube);
                    const defaultThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                    const mediaURL = item.mediaURL? item.mediaURL:defaultThumb;
                    const backgroundColor = `has-${item.backgroundColor}-background`;
                    let backgroundImage = `"backgroundImage:url(${ item.backgroundURL })"`
                     //style={ { backgroundImage: `url(${ item.backgroundURL })` } }
                    return  <div key={index} className="glide__slide">
                      <div className={`purdue-home-cta-card purdue-home-cta-card--horizontal ${backgroundColor} purdue-home-cta-card-carousel--${item.type}`}
                       style={item.backgroundURL ? { backgroundImage: `url(${item.backgroundURL})` } : undefined}
                      >
                        <div
                          className="purdue-home-cta-carousel__card-image"
                        >
                        <div
                          className="image is-16by9"
                        >
                           {item.mediaType === 'image'?
                            <img
                            className="purdue-home-background-image"
                            src={mediaURL}
                          />:""
                          }
                          {item.mediaType === 'video'?
                            <Disabled>
                              <video muted playsinline="" title={item.mediaTitle} src={mediaURL}>
                              </video>
                            </Disabled>
                          :""}
                          {item.youtube ?
                            <div className="flex-container--align-center">
                              <span className="cta-link purdue-home-cta-card__link">Watch Video</span>
                              <i className="fa-regular fa-circle-play cta-icon"></i>
                          </div>:""}
                      </div>
                      </div>
                      <div className="purdue-home-cta-carousel__card-content">

                          {
                            item.type==="quote"?
                            <div className="purdue-home-cta-carousel__card-tag">
                              {
                               item.citeName?
                                <span className="purdue-home-cta-carousel__cite-name">{item.citeName}</span>:""
                              }
                              {
                                item.citeTitle?
                                <span className="purdue-home-cta-carousel__cite-title">{item.citeTitle}</span>:""
                              }
                            </div>:""
                          }
                          {
                            item.type==="story" && item.tag?
                            <div className="purdue-home-cta-carousel__card-tag">
                              <span className="purdue-home-cta-carousel__cite-name">{item.tag}</span>
                            </div>:""
                          }
                          {
                            item.type==="story"?
                            <div className="purdue-home-cta-carousel__story-wrap">
                              {
                               item.title?
                                <p className="purdue-home-cta-carousel__story-title">{item.title}</p>:""
                              }
                              {
                                item.subtext?
                                <p className="purdue-home-cta-carousel__story-content">{item.subtext}</p>:""
                              }
                            </div>:""
                          }
                          {
                            item.type==="quote"&&item.subtext?
                              <p className="purdue-home-cta-carousel__quote-content">{item.subtext}</p>:""
                          }

                          {
                            item.type==="profile"?
                            <div className="purdue-home-cta-carousel__story-wrap cta-profile">
                              {
                               item.title?
                                <p className="purdue-home-cta-carousel__story-title">{item.title}</p>:""
                              }
                              {
                                item.subtext?
                                <p className="purdue-home-cta-carousel__story-content">{item.subtext}</p>:""
                              }
                            </div>:""
                          }
                          
                          {
                            item.type === "profile" ?
                            <div className="purdue-home-cta-carousel__card-tag">
                              {
                               item.citeName?
                                <span className="purdue-home-cta-carousel__cite-name">{item.citeName}</span>:""
                              }
                              {
                                item.citeTitle?
                                <><br /><span className="purdue-home-cta-carousel__cite-title">{item.citeTitle}</span></>:""
                              }
                            </div>:""
                          }

                          {
                            item.type !== "profile" && item.linkURL1 && item.youtube===""?
                            <ul className="purdue-home-button-list">
                              <li><a className={`purdue-home-button${item.color1==="black"?" purdue-home-button--black":""}`} href={item.linkURL1} target={`${item.external1?"_blank":"_self"}`}>{item.linkText1.trim()}</a></li>
                              {
                                item.linkURL2&& item.youtube===""?
                                <li><a className={`purdue-home-button${item.color2==="black"?" purdue-home-button--black":""}`} href={item.linkURL2} target={`${item.external2?"_blank":"_self"}`}>{item.linkText2.trim()}</a></li>
                                :""
                              }
                            </ul>:""                                
                          }
                        </div>
                     </div>
                  </div>
                  })
                }
                </div>
                </div>
                </div>
              </div>:""
              }

          </div>
        </div>
    </div>
    </div>
  ];
};

export default edit;
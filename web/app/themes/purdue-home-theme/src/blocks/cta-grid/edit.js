import { __ } from '@wordpress/i18n';

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  Button,
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
  const { background, hasIntro, hasDecoration, alignment,header, cards, paddingTop, paddingBottom, columns, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeCard= (identifier) => {
    const newCards = cards.filter((item) => {
      return item.id!== identifier;
    });

    setAttributes({ cards: newCards });
  };

  const initialCards={
    mediaId:0,
    mediaURL:'',
    mediaAlt:'',
    subtitle:'',
    title:'',
    subtext:'',
    date:'',
    linkText:'',
    linkURL:'',
    external:true,
    buttonCSS: '',
    linkText2:'',
    linkURL2:'',
    external2:true,
    buttonCSS2:''
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
  }, []);

  const handleAddNew = ()=>{
    let newCards= [...cards];
    newCards.push(makeCard());
    setAttributes({ cards: newCards });
  }
  const handleCardChangeImage = ( img, id ) => {
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaURL: img.url,
			  mediaAlt: img.alt
		  } : item
	  );
	  setAttributes({ cards: newCards });
};
const handleSubtitleChange = (subtitle, id)=>{
	const newCards = cards.map((item) =>
		item.id === id ? {
			...item,
			subtitle: subtitle,
		} : item
	);
	setAttributes({ cards: newCards });
}
  const handleTitleChange = (title, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: title,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleSubtextChange = (subtext, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  subtext: subtext,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleLinkTextChange = (linkText, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: linkText,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleLinkURLChange = (url, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleExternalChange = (id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleButtonCSSChange = (css, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonCSS: css,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }

  const handleLinkText2Change = (linkText2, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText2: linkText2,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }

  const handleLinkURL2Change = (url, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL2: url,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }

  const handleExternal2Change = (id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external2: !item.external2,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }

  const handleButtonCSS2Change = (css, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonCSS2: css,
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }

let editorFields;

editorFields = cards.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.title?item.title:`Card ${index+1}`}>
        <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ ( img ) => handleCardChangeImage (img, item.id)}
              render={ ( { open } ) => {
                return item.mediaURL !== '' ? (
                  <div>
                      <img src={item.mediaURL} />
                    <Button
                      isSecondary                        
                      onClick={ open }
                    >
                      Select a new image
                    </Button>
                  </div>
                ) : (
                    <Button
                    isSecondary
                      onClick={ open }
                    >
                      Select an image
                    </Button>);
              } }
            />
          </MediaUploadCheck>
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Subtitle"
          value={ item.subtitle }
          onChange={ ( val ) => handleSubtitleChange( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Title"
          value={ item.title }
          onChange={ ( val ) => handleTitleChange( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextareaControl
          label="Subtext"
          value={ item.subtext }
          onChange={ ( val ) => handleSubtextChange( val, item.id ) }
        />
      </PanelRow>
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
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange(css, item.id);
          }}
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Link 2 Text"
          value={ item.linkText2 }
          onChange={ ( val ) => handleLinkText2Change( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={'Link 2 URL'}
          type="url"
          onChange={(val) => {
            handleLinkURL2Change(val, item.id);
          }}
          value={item.linkURL2}
        />
      </PanelRow>
      <PanelRow>
        <CheckboxControl
          label="Open link 2 in new tab?"
          checked={item.external2}
          onChange={() => {
            handleExternal2Change(item.id);
          }}
        />
      </PanelRow>
      <PanelRow>
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS2}
          onChange={(css) => {
            handleButtonCSS2Change(css, item.id);
          }}
        />
      </PanelRow>
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
        <CheckboxControl
          label="Include an introduction section?"
          checked={hasIntro}
          onChange={() => {
            setAttributes( { hasIntro:!hasIntro })
          }}
        />
      </PanelRow>
        <PanelRow>
          <SelectControl
            label="Alignment of the cards"
            value={ alignment }
            options={
              [
                { value: '', label: 'Space Between' },
                { value: 'center', label: 'Align Center' },
                { value: 'left', label: 'Align Left' },
              ]
            }
            onChange={ ( alignment ) => {
              setAttributes( { alignment } )
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
        <PanelRow>
          <SelectControl
            label="Number of columns shown on desktop"
            value={ columns }
            options={
              [
                { value: '6', label: '2' },
                { value: '4', label: '3' },
                { value: '3', label: '4' },
              ]
            }
            onChange={ ( columns ) => {
              setAttributes( { columns } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add decoration line after card title?"
            checked={hasDecoration}
            onChange={() => {
              setAttributes({hasDecoration:!hasDecoration})
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

            list={cards}
            setList={(val) => {
              let titles = [],
                values = [];
                cards.map((item) => titles.push(item.title));
                val.map((item) => values.push(item.title));
                if (_.isEqual(titles, values)) {
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
    <div className={`purdue-home-cta-grid purdue-home-cta-grid-editor has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}`}>   
        <div className={`section has-padding-top-large has-padding-bottom-large`}>  
          <div className={`container`}>
            {
              hasIntro?
              <div className="purdue-home-cta-grid__intro">
              <RichText
                tagName='h2'
                value={header}
                className={`purdue-home-intro-text__header header-font-united purdue-home-cta-grid__header`}
                onChange={(header) => {
                  setAttributes({ header});
                }}
                placeholder="Add header"
              ></RichText>
              <div className='purdue-home-cta-grid__content'>
                <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />
              </div>
            </div>:""
            }

              {
                cards && cards.length>0?
                <div className={`purdue-home-cta-grid__cards${alignment==="center"?" align-center":""}${alignment==="left"?" align-left":""}`}>
                  <div className="columns is-multiline">
                  {cards.map((item, index) => {
                    return  <div key={index} className={`column is-${columns}`}>
                      <div className={`purdue-home-cta-card purdue-home-cta-card--stack${hasDecoration?" has-decoration-line":""}`}>
                        <div
                          className="image is-16by9"
                        >
                          {item.mediaURL?
                            <img
                            className="purdue-home-background-image"
                            src={item.mediaURL}
                          />:""
                          }

                      </div>
                      <div className="flex-container--align-center">
                      {item.subtitle?
                        <p className="purdue-home-cta-grid__card-subtitle">{item.subtitle}</p>:""
                      }
                        <p className="purdue-home-cta-grid__card-title">{item.title}</p>
                      {item.subtext?
                        <p className="purdue-home-cta-grid__card-content">{item.subtext}</p>:""
                      }
                      {item.linkURL?
                        <div className='purdue-home-button'>{item.linkText}</div>:""
                      }
                      {item.linkURL2?
                        <div className='purdue-home-button'>{item.linkText2}</div>:""
                      }
                      </div>
                    </div>
                  </div>
                  })
                }
                </div>
              </div>:""
              }

          </div>
        </div>
    </div>
    </div>,
  ];
};
export default edit;
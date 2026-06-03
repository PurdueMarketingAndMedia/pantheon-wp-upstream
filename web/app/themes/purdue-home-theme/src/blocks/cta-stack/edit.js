import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
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
  const { background, header, cards, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeCard= (identifier) => {
    const newCards = cards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ cards: newCards });
  };
  const initialCards={
    mediaId:0,
    mediaURL:'',
    mediaAlt:'',
    title:'',
    subtext:'',
    linkURL:'',
    external:true,
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
  const handleCardChangeImage = ( img, id ) => {
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
};
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
  const handleLinkURLChange = (url, id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
  }
  const handleExternalChange = (id)=>{
	  const newLinks = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ cards: newLinks });
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
          label="Title"
          value={ item.title }
          onChange={ ( val ) => handleTitleChange( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Subtext"
          value={ item.subtext }
          onChange={ ( val ) => handleSubtextChange( val, item.id ) }
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
      <div className={`purdue-home-cta-stack purdue-home-cta-stack-editor has-${background}-background`}>   
          <div className={`section has-padding-top-large has-padding-bottom-large`}>  
            <div className={`container`}>
              <div className="purdue-home-cta-stack__intro">
                <RichText
                  tagName='h2'
                  value={header}
                  className={`purdue-home-intro-text__header header-font-united purdue-home-cta-stack__header`}
                  onChange={(header) => {
                    setAttributes({ header});
                  }}
                  placeholder="Add header"
                ></RichText>
                <div className='purdue-home-cta-stack__content'>
                  <InnerBlocks
                    template={ BLOCKS_TEMPLATE }
                    templateLock={ false }
                  />
                </div>
              </div>
                {
                  cards && cards.length>0?
                  <div className="purdue-home-cta-stack__cards">
                    <div className="columns">
                    {cards.map((item, index) => {
                      return  <div key={index} className="column">
                        <div className={`purdue-home-cta-card purdue-home-cta-card--horizontal`}>
                          <div
                            className="image"
                          >
                            {item.mediaURL?
                              <img
                              className="purdue-home-background-image"
                              src={item.mediaURL}
                            />:""
                            }

                        </div>
                        <div className="flex-container--align-center">
                          {header? <h3 className="purdue-home-cta-stack__card-title">{item.title}</h3> : <h2 className="purdue-home-cta-stack__card-title">{item.title}</h2> }
                          <p className="purdue-home-cta-stack__card-subtext">{item.subtext}</p>
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
}
export default edit;
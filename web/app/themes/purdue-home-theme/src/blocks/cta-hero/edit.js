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
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];
import {normalizeUuid} from "../../utils/normalizeUuid";
import { useEffect } from "react";
import LinkPanelControl from "../../components/linkcomponent";


const edit = ( props ) => {
  const { className, setAttributes } = props;
  const {addHeaderAnimation, header, headerStatic1, headerAnimation, headerStatic2, subheader, cards, links,id} = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
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
		title:'',
		subtext:'',
		linkURL:'',
		external:true,
    ariaLabel: ''
	}

  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
    ariaLabel:'',
    buttonCSS:'',
  }
	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});
	const makeCard = () => ({
		...initialCards,
		id: crypto.randomUUID()
	});

	useEffect(() => {

		let obj, obj2;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		if (cards.length === 0) {
			obj2 = [makeCard()]
		} else {
			obj2 = normalizeUuid(structuredClone(cards));
		}

		setAttributes({cards: obj2});
	}, [])

  const handleAddNewLink = ()=>{
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
  const handleLinkExternalChange = (id)=>{
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
        onExternalChange={() => handleLinkExternalChange(item.id)}
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

  const handleAddNew = ()=>{
    let newCards=[...cards];
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
  const handleTitleChange = (title, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: title
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleSubtextChange = (subtext, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  subtext: subtext
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleCardURLChange = (url, id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url
		  } : item
	  );
	  setAttributes({ cards: newCards });
  }
  const handleExternalChange = (id)=>{
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external
		  } : item
	  );
	  setAttributes({ cards: newCards });	  
  }

   const handleCardAriaLabelChange = (label, id) => {
	  const newCards = cards.map((item) =>
		  item.id === id ? {
			  ...item,
			  ariaLabel: label
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
            handleCardURLChange(val, item.id);
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
          label={"ARIA Label for Link"}
          onChange={(val) => {
            handleCardAriaLabelChange(val, item.id);
          }}
          value={item.ariaLabel}
          help="Provide an accessible label for the link. Defaults to the Link Title if left empty."

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
        <CheckboxControl
            label="Add animation to header text?"
            checked={addHeaderAnimation}
            onChange={() => {
            setAttributes( { addHeaderAnimation: !addHeaderAnimation } )
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
    <div className={`purdue-home-cta-hero purdue-home-cta-hero-editor`}>   
        <div className={`section has-padding-top-large has-padding-bottom-large`}>  
          <div className={`container`}>
              <RichText
                tagName="p"
                value={subheader}
                className={`tagged-header tagged-header--gold purdue-home-cta-hero__subheader`}
                onChange={(subheader) => {
                  setAttributes({ subheader});
                }}
                placeholder="Add Section Header"
              ></RichText>
              {addHeaderAnimation?
                <RichText
                tagName='h1'
                value={headerStatic1}
                className={`second-level-page-heading purdue-home-cta-hero__header`}
                onChange={(headerStatic1) => {
                  setAttributes({ headerStatic1});
                }}
                placeholder="Add page header static part before the animation part"
              ></RichText>:""
              }
              {addHeaderAnimation?
                <RichText
                tagName='h1'
                value={headerAnimation}
                className={`second-level-page-heading purdue-home-cta-hero__header`}
                onChange={(headerAnimation) => {
                  setAttributes({ headerAnimation});
                }}
                placeholder="Add page header animation part, seperate them by comma"
              ></RichText>:""
              }
              {addHeaderAnimation?
                <RichText
                tagName='h1'
                value={headerStatic2}
                className={`second-level-page-heading purdue-home-cta-hero__header`}
                onChange={(headerStatic2) => {
                  setAttributes({ headerStatic2});
                }}
                placeholder="Add page header static part after the animation part"
              ></RichText>:""
              }
              {!addHeaderAnimation?
                <RichText
                tagName='h1'
                value={header}
                className={`second-level-page-heading purdue-home-cta-hero__header`}
                onChange={(header) => {
                  setAttributes({ header});
                }}
                placeholder="Add Page Header"
              ></RichText>:""
              }

              <div className='purdue-home-cta-hero__content'>
                <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />
              </div>
              {links.length>0 && links[0].linkURL?links.map((link, index) => {
                return  <ul key={link.id} className="purdue-home-button-list">
                <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                    </li>
                </ul>}):""}
              {
                cards && cards.length > 0 ? 
                
                <div className="purdue-home-cta-hero__cards">
                  <div className="columns">
                  {cards.map((item, index) => {
                    return  <div key={item.id} className="column">
                      <div className={`purdue-home-cta-card purdue-home-cta-card--horizontal has-content-bottom`}>
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
                      <div className="flex-container--align-bottom">
                        <p className="purdue-home-cta-hero__card-title">{item.title}</p>
                        <p className="purdue-home-cta-hero__card-subtext">{item.subtext}</p>
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
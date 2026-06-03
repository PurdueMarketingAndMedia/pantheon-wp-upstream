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

import { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";
import { button } from "@wordpress/icons";
import LinkPanelControl from "../../components/linkcomponent";
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props )=>{
    const { className, setAttributes } = props;
    const { cards, id} = props.attributes;
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
      title:'',
      subtext:'',
      linkText:'',
      linkURL:'',
      external:true,
      ariaLabel:'',
      buttonCSS:''
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

    const handleAiraLabelChange = (label, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				ariaLabel: label
			} : item
		);
		setAttributes({ cards: newCards });
	}


	const handleButtonCSSChange = (css, id) => {
		const newCards = cards.map((item) =>
			item.id === id ? {
				...item,
				buttonCSS: css
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
        <LinkPanelControl
        item={item}
        onLinkTextChange={(val) => handleLinkTextChange(val, item.id)}
        onLinkURLChange={(val) => handleLinkURLChange(val, item.id)}
        onExternalChange={() => handleExternalChange(item.id)}
        onAiraLabelChange={(val) => handleAiraLabelChange(val, item.id)}
        onButtonCSSChange={(css) => handleButtonCSSChange(css, item.id)}
      />
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
          {
            cards.length<2?
            <PanelRow>
						<Button
							isPrimary
							onClick={() => handleAddNew()}
						>
							Add New Card
						</Button>
					</PanelRow>:""
          }

        </PanelBody>
      </InspectorControls>,
      <div {...blockProps} key="2">
      <div className={`purdue-home-two-column-cta purdue-home-two-column-cta-editor`}>
                {
                  cards && cards.length>0?
                  <div className="purdue-home-two-column-cta__cards">
                    {cards.map((item, index) => {
                      return <div
                          className={`purdue-home-cta-card purdue-home-cta-card--vertical`}
                          key={index}
                          >
                          <div
                            className="image is-4by3"
                          >
                            {item.mediaURL?
                              <img
                              className="purdue-home-background-image"
                              src={item.mediaURL}
                            />:""
                            }

                        </div>
                        <div className="flex-container--align-center">
                          <h2 className="purdue-home-two-column-cta__card-title">{item.title}</h2>
                        {item.subtext?
                          <p className="purdue-home-two-column-cta__card-content">{item.subtext}</p>:""
                        }
                        {item.linkURL?
                          <div className='purdue-home-button'>{item.linkText}</div>:""
                        }
                        </div>
                      </div>
                    })
                  }
                </div>:""
                }
      </div></div>,
    ];
}
export default edit;
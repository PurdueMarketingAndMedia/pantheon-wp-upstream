import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  RadioControl,
  Button,
  Disabled,
  ToggleControl
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  useBlockProps,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";
import "./editor.scss";
import { normalizeUuid } from '../../utils/normalizeUuid.js';
import { useEffect } from "react";
import LinkPanelControl from "../../components/linkcomponent";

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    type,
    columns,
    background,
    paddingTop,
    paddingBottom,
    imgs,
    cards,
    id,
    linkImg,
    removeSidePadding,
    loopSlider,
    aspectRatio,
    align,
  } = props.attributes;
  const blockProps = useBlockProps();
  const removeCard = (identifier) => {
    const newCards = cards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ cards: newCards });
  };
  const initialCards = {
    mediaId: 0,
    mediaURL: "",
    mediaAlt: "",
    title: "",
    subtext: "",
    linkText: "",
    linkURL: "",
    external: true,
    ariaLabel: "",
    buttonCSS: ""
  };

  const makeCard = () => ({
    ...initialCards,
    id: crypto.randomUUID()
  });


  const handleAddNew = () => {
    let newCards = [...cards];
    newCards.push(makeCard());
    setAttributes({ cards: newCards });
  };
  const handleCardChangeImage = (img, id) => {
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
  const handleTitleChange = (title, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          title: title
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleSubtextChange = (subtext, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          subtext: subtext
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleLinkTextChange = (linkText, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          linkText: linkText
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleLinkURLChange = (url, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          linkURL: url
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleExternalChange = (id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          external: !item.external
        } : item
    );
    setAttributes({ cards: newCards });

  };

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

  useEffect(() => {

    let obj;
    let img = [];
    if (cards.length === 0) {
      obj = [makeCard()]
    } else {
      obj = normalizeUuid(structuredClone(cards));
    }
    setAttributes({
      cards: obj
    });
  }, []);


  let editorFields;

  editorFields = cards.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.title ? item.title : `Card ${index + 1}`}
      >
        <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => handleCardChangeImage(img, item.id)}
              render={({ open }) => {
                return item.mediaURL !== "" ? (
                  <div key="1">
                    <img src={item.mediaURL} />
                    <Button isSecondary onClick={open} key="1">
                      Select a New Image
                    </Button>
                  </div>
                ) : (
                  <Button key="2" isSecondary onClick={open}>
                    Select an image
                  </Button>
                );
              }}
            />
          </MediaUploadCheck>
        </PanelRow>
        <PanelRow>
          <TextControl
            label="Title"
            value={item.title}
            onChange={(val) => handleTitleChange(val, item.id)}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="Subtext"
            value={item.subtext}
            onChange={(val) => handleSubtextChange(val, item.id)}
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
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeCard(item.id);
          }}
        >
          Remove Slide
        </Button>
      </PanelBody>
    );
  });
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Number of image shown on desktop"
            value={columns}
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            onChange={(columns) => {
              setAttributes({ columns });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose the background of this slide."
            value={background}
            options={[
              { label: "White", value: "white" },
              { label: "Black", value: "black" },
              { label: "Gray", value: "gray" },
            ]}
            onChange={(background) => setAttributes({ background })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the top"
            value={paddingTop}
            options={[
              { value: "has-padding-top-none", label: "None" },
              { value: "has-padding-top-small", label: "Small" },
              { value: "", label: "Medium" },
              { value: "has-padding-top-large", label: "Large" },
            ]}
            onChange={(paddingTop) => {
              setAttributes({ paddingTop });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the bottom"
            value={paddingBottom}
            options={[
              { value: "has-padding-bottom-none", label: "None" },
              { value: "has-padding-bottom-small", label: "Small" },
              { value: "", label: "Medium" },
              { value: "has-padding-bottom-large", label: "Large" },
            ]}
            onChange={(paddingBottom) => {
              setAttributes({ paddingBottom });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Remove side padding?"
            help="You can remove the side paddings when use this block inside another container block"
            checked={removeSidePadding}
            onChange={() => {
              setAttributes({ removeSidePadding: !removeSidePadding });
            }}
          />
        </PanelRow>
        <PanelRow>
          <ToggleControl
              __nextHasNoMarginBottom
              label="Force Aspect Ratio?"
              help={
                aspectRatio
                    ? 'Force 16x9'
                    : 'No fixed image size.'
              }
              checked={ aspectRatio }
              onChange={ (aspectRatio) => {
                setAttributes({aspectRatio: aspectRatio})
              } }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Loop Slider?"
            checked={loopSlider}
            onChange={() => {
              setAttributes({ loopSlider: !loopSlider });
            }}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose the type of this slide."
            value={type}
            options={[
              { label: "Image", value: "image" },
              { label: "Image with description", value: "imageText" },
            ]}
            onChange={(type) => setAttributes({ type })}
          />
        </PanelRow>
        {type === "imageText" ? (
          <PanelBody title={__("Slides")}>
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
              <Button isPrimary onClick={() => handleAddNew()}>
                Add New Slide
              </Button>
            </PanelRow>
          </PanelBody>
        ) : (
          ""
        )}
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="3">
      <div
        className={`purdue-home-image-slider section purdue-home-image-slider-editor has-${background}-background ${
          paddingTop ? ` ${paddingTop}` : ""
        }${paddingBottom ? ` ${paddingBottom}` : ""}${
          removeSidePadding ? " has-no-sidepadding" : ""
        }`}
        data-columns={columns}
      >
        <div className={`container`}>
          <div className={`glide`}>
            <div className="glide__track" data-glide-el="track">
              {type === "image" ? (
                <MediaUploadCheck>
                  <MediaUpload
                    addToGallery={true}
                    multiple={true}
                    gallery={true}
                    value={imgs.map((img) => img.id)}
                    onSelect={(imgs) => {
                      setAttributes({ imgs });
                    }}
                    render={({ open }) => {
                      return (
                        <div key="1" className="image-slider-editor">
                          <div className="buttons-container">
                            <button onClick={open}>
                              {imgs.length === 0
                                ? "Select images"
                                : "Select new images"}
                            </button>
                          </div>
                          {imgs.length > 0 ? (
                            <div className="glide__slides">
                              {imgs.map((img, index) => {
                                return linkImg ? (
                                  <a
                                    key={img.id}
                                    className="glide__slide"
                                    href={img.url}
                                    target="_blank"
                                  >
                                    <figure>
                                      <img src={img.url} alt={img.alt} />
                                      <figcaption>{img.caption}</figcaption>
                                    </figure>
                                  </a>
                                ) : (
                                  <figure key={index} className="glide__slide">
                                    <img src={img.url} alt={img.alt} />
                                    <figcaption>{img.caption}</figcaption>
                                  </figure>
                                );
                              })}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    }}
                  />
                </MediaUploadCheck>
              ) : cards.length > 0 ? (
                <div className="glide__slides cards-slider">
                  {cards.map((card, index) => {
                    return (
                      <div key={index} className="glide__slide">
                        <div className="purdue-home-cta-card purdue-home-image-slider__card">
                          <div className="purdue-home-image-slider__card-image">
                            <figure className={`image ${aspectRatio ? 'is-16by9' : ''}`}>
                              <img src={card.mediaURL} alt={card.mediaAlt} />
                            </figure>
                          </div>
                          <div className="flex-container flex-container--align-bottom">
                            <p className="purdue-home-image-slider__card-title">
                              {card.title}
                            </p>
                            <p className="purdue-home-image-slider__card-content">
                              {card.subtext}
                            </p>
                            {card.linkURL ? (
                              <div className="purdue-home-button">
                                {card.linkText}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="slider-controls">
              <button className="glide__arrow arrow--left">prev</button>
              <div className="glide__bullets" data-glide-el="controls[nav]">
                {type === "image"
                  ? imgs.map((card, index) => {
                      return (
                        <button
                          key={index}
                          className="glide__bullet"
                          data-glide-dir={index}
                        ></button>
                      );
                    })
                  : cards.map((card, index) => {
                      return (
                        <button
                          key={index}
                          className="glide__bullet"
                          data-glide-dir={index}
                        ></button>
                      );
                    })}
              </div>
              <button className="glide__arrow arrow--right">next</button>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
};
export default edit;
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
} from "@wordpress/components";

import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  useBlockProps,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";
import "./editor.scss";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const edit = (props) => {
  const { className, setAttributes } = props;
  const { smallCards, sliderCards, background, id, paddingTop, paddingBottom } =
    props.attributes;
  const blockProps = useBlockProps();
  const removeSmallCards = (identifier) => {
    const newSmallCards = structuredClone(smallCards.filter((item) => {
      return item.id !== identifier;
    }));
    setAttributes({ smallCards: newSmallCards });
  };
  const removeSliderCards = (identifier) => {
    const newSliderCards = sliderCards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ sliderCards: newSliderCards });
  };
  const initialSmallCards = {
    id: 0,
    mediaId: 0,
    mediaType: "img",
    mediaURL: "",
    mediaAlt: "",
    mediaTitle: "",
    linkType: "",
    linkText: "",
    linkURL: "",
    external: true,
    rtbCSS:''
  };
  const initialSliderCards = {
    id: 0,
    type: "rtb",
    lead: "",
    title: "",
    content: "",
    smallText: "",
    source: "",
    linkURL: "",
    external: true,
    reverseShade: false,
    background: "gold",
    ctaText: "",
    mediaId: 0,
    mediaType: "",
    mediaURL: "",
    mediaAlt: "",
    mediaTitle: "",
    rtbCSS:''
  };


  const makeSmallCard = () => ({
		...initialSmallCards,
		id: crypto.randomUUID()
  });

  const makeSliderCards = () => ({
		...initialSliderCards,
		id: crypto.randomUUID()
  });

	useEffect(() => {
		let obj, obj2;
		if (smallCards.length === 0) {
			obj = [makeSmallCard()]
		} else {
			obj = normalizeUuid(structuredClone(smallCards));
		}

		if (sliderCards.length === 0) {
			obj2 = [makeSliderCards()]
		} else {
			obj2 = normalizeUuid(structuredClone(sliderCards));
		}

		setAttributes({
			smallCards: obj,
			sliderCards: obj2
		});

	}, [])


  const handleAddNewCard = () => {
    let newSmallCards = [...smallCards];
    if (newSmallCards.length <= 1)
		newSmallCards.push(makeSmallCard());

    setAttributes({ smallCards: newSmallCards });
  };
  const handleAddNewSlide = () => {
    let newSliderCards = [...sliderCards];
    if (newSliderCards.length <= 4)
		newSliderCards.push(makeSliderCards());

    setAttributes({ sliderCards: newSliderCards });
  };
  const handleCardLinkTextChange = (text, id) => {
	  const cards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: text,
		  } : item
	  );
	  setAttributes({ smallCards: cards });
  };
  const handleCardLinkTypeChange = (text, id) => {
	  const cards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkType: text,
		  } : item
	  );
	  setAttributes({ smallCards: cards });
  };
  const handleCardLinkURLChange = (url, id) => {
	  const cards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ smallCards: cards });
  };
  const handleCardExternalChange = (id) => {
	  const cards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ smallCards: cards });
  };
  const handleCardChangeImage = (img, id) => {
	  const cards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title
		  } : item
	  );
	  setAttributes({ smallCards: cards });
  };
  const handleSlideTypeChange = (type, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  type: type
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideLeadChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  lead: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideTitleChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideSmallTextChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  smallText: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideSourceChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  source: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideBackgroundChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  background: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideCtaTextChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  ctaText: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideConentChange = (text, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  content: text
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideURLChange = (url, id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideExternalChange = (id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideShadeChange = (id) => {
	  const cards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  reverseShade: !item.reverseShade
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSlideChangeImage = (img, index) => {
	  const cards = sliderCards.map((item) =>
		  item.id === index ? {
			  ...item,
			  mediaId: img.id,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title,
		  } : item
	  );
	  setAttributes({ sliderCards: cards });
  };
  const handleSliderRtbCSSChange = (css, index)=>{
    let newSliderCards = structuredClone(sliderCards);
    newSliderCards[index].rtbCSS = css;
    setAttributes({sliderCards: newSliderCards});
   }
  let cardEditorFields;
  cardEditorFields = smallCards.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={index.id}
        title={item.linkText ? item.linkText : `Card ${index + 1}`}
      >
        <PanelRow>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => handleCardChangeImage(img, item.id)}
              render={({ open }) => {
                return item.mediaURL !== "" ? (
                  <div>
                    {item.mediaType === "image" ? (
                      <img src={item.mediaURL} />
                    ) : (
                      ""
                    )}
                    {item.mediaType === "video" ? (
                      <Disabled>
                        <video
                          muted
                          playsinline=""
                          title={item.mediaTitle}
                          src={item.mediaURL}
                        ></video>
                      </Disabled>
                    ) : (
                      ""
                    )}
                    <Button isSecondary onClick={open}>
                      Select a New Media
                    </Button>
                  </div>
                ) : (
                  <Button isSecondary onClick={open}>
                    Open Media Library
                  </Button>
                );
              }}
            />
          </MediaUploadCheck>
        </PanelRow>
        <PanelRow>
          <RadioControl
            label="Choose the type of this link."
            selected={item.linkType}
            options={[
              { label: "Youtube Video", value: "video" },
              { label: "Link", value: "story" },
              { label: "Image/video clip only", value: "none" },
            ]}
            onChange={(value) => handleCardLinkTypeChange(value, item.id)}
          />
        </PanelRow>
        {item.linkType !== "none" ? (
          <PanelRow>
            <TextareaControl
              label="Link Text"
              value={item.linkText}
              onChange={(val) => handleCardLinkTextChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.linkType !== "none" ? (
          <PanelRow>
            <TextControl
              label={"Link URL"}
              type="url"
              onChange={(val) => {
                handleCardLinkURLChange(val, item.id);
              }}
              value={item.linkURL}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.linkType !== "none" ? (
          <PanelRow>
            <CheckboxControl
              label="Open link in new tab?"
              checked={item.external}
              onChange={() => {
                handleCardExternalChange(item.id);
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
         <PanelRow>
          <TextControl
              label="CSS class(es)"
              value={item.rtbCSS}
              onChange={(css) => {
                handleCardRtbCSSChange(css,index);
              }}
          />
        </PanelRow>
        <Button
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeSmallCards(item.id);
          }}
        >
          Remove Item
        </Button>
      </PanelBody>
    );
  });
  let slideEditorFields;
  slideEditorFields = sliderCards.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.title ? item.title.substring(0, 30) : `Card ${index + 1}`}
      >
        <PanelRow>
          <RadioControl
            label="Choose the type of this slide."
            selected={item.type}
            options={[
              { label: "RTB card", value: "rtb" },
              { label: "Story card", value: "story" },
              { label: "Image/video clip only", value: "image" },
              { label: "Text", value: "text" },
              { label: "Youtube Video", value: "video" },
            ]}
            onChange={(value) => handleSlideTypeChange(value, item.id)}
          />
        </PanelRow>
        {item.type === "rtb" || item.type === "text" ? (
          <PanelRow>
            <RadioControl
              label="Choose the background of this slide."
              selected={item.background}
              options={[
                { label: "Gold", value: "gold" },
                { label: "Black", value: "black" },
                { label: "Gray", value: "gray" },
                { label: "White", value: "white" },
              ]}
              onChange={(value) => handleSlideBackgroundChange(value, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ? (
          <PanelRow>
            <TextControl
              label="RTB Lead Text"
              value={item.lead}
              onChange={(val) => handleSlideLeadChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ? (
          <PanelRow>
            <TextControl
              label="RTB Large Text"
              value={item.title}
              onChange={(val) => handleSlideTitleChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ? (
          <PanelRow>
            <TextareaControl
              label="RTB Small Text"
              value={item.smallText}
              onChange={(val) => handleSlideSmallTextChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ? (
          <PanelRow>
            <TextControl
              label="RTB Source Text"
              value={item.source}
              onChange={(val) => handleSlideSourceChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "story" ||
        item.type === "image" ||
        item.type === "video" ? (
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(img) => handleSlideChangeImage(img, item.id)}
                render={({ open }) => {
                  return item.mediaURL !== "" ? (
                    <div>
                      {item.mediaType === "image" ? (
                        <img src={item.mediaURL} />
                      ) : (
                        ""
                      )}
                      {item.mediaType === "video" ? (
                        <Disabled>
                          <video
                            muted
                            playsinline=""
                            title={item.mediaTitle}
                            src={item.mediaURL}
                          ></video>
                        </Disabled>
                      ) : (
                        ""
                      )}
                      <Button isSecondary onClick={open}>
                        Select a New Media
                      </Button>
                    </div>
                  ) : (
                    <Button isSecondary onClick={open}>
                      Open Media Library
                    </Button>
                  );
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "story" ? (
          <PanelRow>
            <TextControl
              label="CTA Text"
              value={item.ctaText}
              onChange={(val) => handleSlideCtaTextChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "story" ||
        item.type === "text" ||
        item.type === "video" ? (
          <PanelRow>
            <TextControl
              label="Title"
              value={item.title}
              onChange={(val) => handleSlideTitleChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ||
        item.type === "story" ||
        item.type === "video" ? (
          <PanelRow>
            <TextControl
              label={"Link URL to this card"}
              type="url"
              onChange={(val) => {
                handleSlideURLChange(val, item.id);
              }}
              value={item.linkURL}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "rtb" ||
        item.type === "story" ||
        item.type === "video" ? (
          <PanelRow>
            <CheckboxControl
              label="Open link in new tab?"
              checked={item.external}
              onChange={() => {
                handleSlideExternalChange(item.id);
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "story" ? (
          <PanelRow>
            <CheckboxControl
              label="Reverse Shade over the background?"
              help="You can check this box to use white shade over light image."
              checked={item.reverseShade}
              onChange={() => {
                handleSlideShadeChange(item.id);
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.type === "text" ? (
          <PanelRow>
            <TextareaControl
              label={"Add text"}
              onChange={(val) => {
                handleSlideConentChange(val, item.id);
              }}
              value={item.content}
            />
          </PanelRow>
        ) : (
          ""
        )}
        <PanelRow>
          <TextControl
              label="CSS class(es)"
              value={item.rtbCSS}
              onChange={(css) => {
                handleSliderRtbCSSChange(css,index);
              }}
          />
        </PanelRow>

        <Button
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeSliderCards(item.id);
          }}
        >
          Remove Item
        </Button>
      </PanelBody>
    );
  });
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose the background"
            value={background}
            options={[
              { label: "None", value: "none" },
              { label: "Gold", value: "gold" },
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
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody title={__("Small Cards")}>
        <PanelRow>
          <ReactSortable
            list={smallCards}
            setList={(val) => {
              let ids = [],
                values = [];
              smallCards.map((item) => ids.push(item.id));
              val.map((item) => values.push(item.id));
              if (_.isEqual(ids, values)) {
                return;
              }
              setAttributes({
                smallCards: val,
              });
            }}
            className="sortable-posts"
          >
            {cardEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        {smallCards.length <= 2 ? (
          <PanelRow>
            <Button isPrimary onClick={() => handleAddNewCard()}>
              Add New Small Card
            </Button>
          </PanelRow>
        ) : (
          ""
        )}
      </PanelBody>
      <PanelBody title={__("Large Cards")}>
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
            {slideEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        {sliderCards.length <= 4 ? (
          <PanelRow>
            <Button isPrimary onClick={() => handleAddNewSlide()}>
              Add New Large Card
            </Button>
          </PanelRow>
        ) : (
          ""
        )}
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
      <div
        className={`purdue-home-mixed-rtb purdue-home-mixed-rtb-editor${
          paddingTop ? ` ${paddingTop}` : ""
        }${
          paddingBottom ? ` ${paddingBottom}` : ""
        } has-${background}-background`}
      >
        <div className={`section`}>
          <div className="container">
            <div className="columns">
              {smallCards.length > 0 &&
              (smallCards[0].mediaURL || smallCards[0].linkURL) ? (
                <div className="column">
                  {smallCards.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className={`purdue-home-cta-card purdue-home-cta-card--horizontal${
                          item.linkType === "none"
                            ? " purdue-home-cta-card--nolink"
                            : ""
                        }`}
                      >
                        <div className="image is-16by9">
                          {item.mediaType === "image" ? (
                            <img
                              className="purdue-home-background-image"
                              src={item.mediaURL}
                            />
                          ) : (
                            ""
                          )}
                          {item.mediaType === "video" ? (
                            <video
                              className="purdue-home-background-image"
                              muted
                              playsinline=""
                              src={item.mediaURL}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        {item.linkType !== "none" ? (
                          <div className="flex-container--align-center">
                            <span className="cta-link purdue-home-cta-card__link">
                              {item.linkText}
                            </span>
                            {item.linkType === "story" ? (
                              <i className="fa-regular fa-circle-right cta-icon"></i>
                            ) : (
                              ""
                            )}
                            {item.linkType === "video" ? (
                              <i className="fa-regular fa-circle-play cta-icon"></i>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              {sliderCards.length > 0
                ? sliderCards.map((item, index) => {
                    if (
                        index <= 3
                    )
                      return (
                        <div key={item.id} className="column">
                          {item.type === "rtb" ? (
                            <div
                              className={`purdue-home-proofpoint has-${item.background}-background`}
                            >
                              <div className="flex-container--align-center">
                                {item.lead ? (
                                  <span className="lead-text purdue-home-proofpoint__lead">
                                    {item.lead}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {item.title ? (
                                  <span className="large-text purdue-home-proofpoint__highlighted">
                                    {item.title}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {item.smallText ? (
                                  <span className="small-text purdue-home-proofpoint__content">
                                    {item.smallText}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {item.source && item.linkURL !== "" ? (
                                  <span className="source purdue-home-proofpoint__source">
                                    {item.source}
                                  </span>
                                ) : (
                                  <span className="source purdue-home-proofpoint__source">
                                    {item.source}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.type === "story" ? (
                            <div
                              key={item.id}
                              className={`purdue-home-cta-card purdue-home-cta-card--vertical${
                                item.reverseShade ? " has-reverse-shade" : ""
                              }`}
                            >
                              <div className={`image is-4by5`}>
                                {item.mediaType === "image" ? (
                                  <img
                                    className="purdue-home-background-image"
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                                {item.mediaType === "video" ? (
                                  <video
                                    className="purdue-home-background-image"
                                    muted
                                    playsinline=""
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div
                                key={item.id}
                                className="flex-container--align-vertical-between"
                              >
                                <p className="purdue-home-cta-card__cta-text">
                                  {item.ctaText}
                                </p>
                                <p
                                  className="cta-link purdue-home-cta-card__link"
                                  target={`${
                                    item.external ? "_blank" : "_self"
                                  }`}
                                >
                                  {item.title}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.type === "image" ? (
                            <div
                              key={item.id}
                              className="purdue-home-cta-card purdue-home-cta-card--vertical purdue-home-cta-card--nolink"
                            >
                              <div className="image">
                                {item.mediaType === "image" ? (
                                  <img
                                    className="purdue-home-background-image"
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                                {item.mediaType === "video" ? (
                                  <video
                                    className="purdue-home-background-image"
                                    muted
                                    playsinline=""
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.type === "text" ? (
                            <div
                              key={item.id}
                              className={`purdue-home-content-card has-${item.background}-background`}
                            >
                              <p className="purdue-home-content-card__title">
                                {item.title}
                              </p>
                              <p className="purdue-home-content-card__content">
                                {item.content}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.type === "video" ? (
                            <div
                              key={item.id}
                              className={`purdue-home-cta-card purdue-home-cta-card--horizontal`}
                            >
                              <div className="image is-16by9">
                                {item.mediaType === "image" ? (
                                  <img
                                    className="purdue-home-background-image"
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                                {item.mediaType === "video" ? (
                                  <video
                                    className="purdue-home-background-image"
                                    muted
                                    playsinline=""
                                    src={item.mediaURL}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className="flex-container--align-center">
                                <span className="cta-link purdue-home-cta-card__link">
                                  {item.title}
                                </span>

                                {item.linkType === "video" ? (
                                  <i className="fa-regular fa-circle-play cta-icon"></i>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
};

export default edit;

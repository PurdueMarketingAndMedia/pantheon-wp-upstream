import { __, date } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  RadioControl,
  ToggleControl,
  Button,
  Disabled,
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";
const { useEffect, useState } = wp.element;
import { ReactSortable } from "react-sortablejs";
import "./editor.scss";
import ServerSideRender from "@wordpress/server-side-render";
import {normalizeUuid} from "../../utils/normalizeUuid";
const { apiFetch } = wp;
const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    heading,
    type,
    source,
    buttonColor,
    showTag,
    showPostType,
    showDate,
    showImage,
    feedURLFeatured,
    feedURLList,
    featuredHeading,
    listHeading,
    hasSelectedCatTerms,
    selectedCatTerms,
    smallCards,
    sliderCards,
    id,
    paddingTop,
    paddingBottom,
    linkText,
    linkURL,
    external,
  } = props.attributes;
  const blockProps = useBlockProps();

  const fetchPath = "/wp/v2/";
  const [catTerms, setCatTerms] = useState([]);
  useEffect(() => {
    Promise.all([
      apiFetch({ path: `${fetchPath}categories?per_page=100&page=1` }),
      apiFetch({ path: `${fetchPath}categories?per_page=100&page=2` }),
    ])
      .then((terms) => {
        const options = [...terms[0], ...terms[1]].map((p) => {
          return {
            label: p.name,
            value: p.slug,
          };
        });
        setCatTerms(options);
      })
      .catch((error) => {
      });
  }, []);

  const removeSmallCards = (identifier) => {
    const newSmallCards = smallCards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ smallCards: newSmallCards });
  };
  const removeSliderCards = (identifier) => {
    const newSliderCards = sliderCards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ sliderCards: newSliderCards });
  };
  const initialSmallCards = {
    tag: "",
    postType: "",
    date: "",
    time: "",
    title: "",
    linkURL: "",
    external: true,
    mediaId: 0,
    mediaType: "",
    mediaURL: "",
    mediaAlt: "",
    mediaTitle: "",
  };
  const initialSliderCards = {
    tag: "",
    postType: "",
    date: "",
    time: "",
    title: "",
    linkURL: "",
    external: true,
    linkType: "",
    mediaId: 0,
    mediaType: "",
    mediaURL: "",
    mediaAlt: "",
    mediaTitle: "",
  };

	const makeSmallCard = () => ({
		...initialSmallCards,
		id: crypto.randomUUID()
	});
	const makeSliderCard = () => ({
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
			obj2 = [makeSliderCard()]
		} else {
			obj2 = normalizeUuid(structuredClone(sliderCards));
		}
		setAttributes({
			smallCards: obj,
			sliderCards: obj2,
		});
	}, []);

  const handleAddNewCard = () => {
    let newSmallCards = [...smallCards];
    newSmallCards.length <= 2 ? newSmallCards.push(makeSmallCard()) : "";
    setAttributes({ smallCards: newSmallCards });
  };
  const handleAddNewSlide = () => {
    let newSliderCards = [...sliderCards];
    newSliderCards.push(makeSliderCard());
    setAttributes({ sliderCards: newSliderCards });
  };
  const handleCardTitleChange = (text, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: text,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardTagChange = (text, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  tag: text,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardPostTypeChange = (text, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  postType: text,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardDateChange = (text, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  date: text,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardTimeChange = (text, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  time: text,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardLinkURLChange = (url, id) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardExternalChange = (index) => {
	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ smallCards: newCards });
  };
  const handleCardImageChange = (img, id) => {
	  console.log(img);
	  console.log(id);

	  const newCards = smallCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title
		  } : item
	  );
	  setAttributes({ smallCards: newCards });

  };
  const handleSlideTitleChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  title: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSlideTagChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  tag: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSlidePostTypeChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  postType: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSliderDateChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  date: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSliderTimeChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  time: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };

  const handleSliderLinkTypeChange = (text, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkType: text,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSlideURLChange = (url, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSlideExternalChange = (index) => {
	const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  const handleSlideChangeImage = (img, id) => {
	  const newCards = sliderCards.map((item) =>
		  item.id === id ? {
			  ...item,
			  mediaId: img.id,
			  mediaType: img.type,
			  mediaURL: img.url,
			  mediaAlt: img.alt,
			  mediaTitle: img.title
		  } : item
	  );
	  setAttributes({ sliderCards: newCards });
  };
  let cardEditorFields;
  cardEditorFields = smallCards.map((item, index) => {
    return (
      <PanelBody initialOpen={false} key={item.id} title={`Link ${index + 1}`}>
        <PanelRow>
          <TextareaControl
            label="Title"
            value={item.title}
            onChange={(val) => handleCardTitleChange(val, item.id)}
          />
        </PanelRow>
        {showPostType && type === "50-50-post" ? (
          <PanelRow>
            <TextControl
              label={"Post Type"}
              value={item.postType}
              onChange={(val) => handleCardPostTypeChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {showTag ? (
          <PanelRow>
            <TextControl
              label={type !== "50-50-post" ? "Tag" : "Taxonomy Tag"}
              value={item.tag}
              onChange={(val) => handleCardTagChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {type !== "50-50-post" ? (
          <PanelRow>
            <TextControl
              label="Date"
              help="Format: Month date, Year"
              value={item.date}
              onChange={(val) => handleCardDateChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {type !== "50-50-post" ? (
          <PanelRow>
            <TextControl
              label="Time"
              value={item.time}
              onChange={(val) => handleCardTimeChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {type === "50-50" || type === "50-50-post" ? (
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(img) => handleCardImageChange(img, item.id)}
                render={({ open }) => {
                  return item.mediaURL !== "" ? (
                    <div>
                      {item.mediaType === "image" ? (
                        <img src={item.mediaURL} />
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
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={item.external}
            onChange={() => {
              handleCardExternalChange(item.id);
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
        title={item.linkText ? item.linkText : `Slide ${index + 1}`}
      >
        <PanelRow>
          <RadioControl
            label="Choose the type of this link."
            selected={item.linkType}
            options={[
              { label: "Youtube Video", value: "video" },
              { label: "Story", value: "story" },
            ]}
            onChange={(value) => handleSliderLinkTypeChange(value, item.id)}
          />
        </PanelRow>
        <PanelRow>
          <TextareaControl
            label="Title"
            value={item.title}
            onChange={(val) => handleSlideTitleChange(val, item.id)}
          />
        </PanelRow>
        {item.linkType === "story" && showPostType && type === "50-50-post" ? (
          <PanelRow>
            <TextControl
              label="Post Type"
              value={item.postType}
              onChange={(val) => handleSlidePostTypeChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.linkType === "story" && showTag ? (
          <PanelRow>
            <TextControl
              label={type !== "50-50-post" ? "Tag" : "Taxonomy Tag"}
              value={item.tag}
              onChange={(val) => handleSlideTagChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.linkType === "story" && type !== "50-50-post" ? (
          <PanelRow>
            <TextControl
              label="Date"
              help="Format: Month date, Year"
              value={item.date}
              onChange={(val) => handleSliderDateChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {item.linkType === "story" && type !== "50-50-post" ? (
          <PanelRow>
            <TextControl
              label="Time"
              value={item.time}
              onChange={(val) => handleSliderTimeChange(val, item.id)}
            />
          </PanelRow>
        ) : (
          ""
        )}
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
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={item.external}
            onChange={() => {
              handleSlideExternalChange(item.id);
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
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
        <PanelRow>
          <RadioControl
            label="Choose the type of the layout."
            selected={type}
            options={[
              { label: "60/40", value: "60-40" },
              { label: "50/50", value: "50-50" },
              { label: "50/50 - With Post Type", value: "50-50-post" },
            ]}
            onChange={(type) => setAttributes({ type })}
          />
        </PanelRow>
        <PanelRow>
          <RadioControl
            label="Choose the type of the source."
            selected={source}
            options={[
              { label: "Manually enter", value: "manual" },
              { label: "Autopopulate", value: "auto" },
              { label: "RSS", value: "rss" },
            ]}
            onChange={(source) => setAttributes({ source })}
          />
        </PanelRow>
        {source === "rss" || source === "auto" ? (
          <PanelRow>
            <TextControl
              label={"Header of this whole section"}
              onChange={(heading) => {
                setAttributes({ heading });
              }}
              value={heading}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {(source === "rss" || source === "auto") && type === "60-40" ? (
          <PanelRow>
            <TextControl
              label={"Header of the left section"}
              onChange={(featuredHeading) => {
                setAttributes({ featuredHeading });
              }}
              value={featuredHeading}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {(source === "rss" || source === "auto") && type === "60-40" ? (
          <PanelRow>
            <TextControl
              label={"Header of the right section"}
              onChange={(listHeading) => {
                setAttributes({ listHeading });
              }}
              value={listHeading}
            />
          </PanelRow>
        ) : (
          ""
        )}
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
            label={"Link Text to this section"}
            onChange={(linkText) => {
              setAttributes({ linkText });
            }}
            value={linkText}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Link URL to this section"}
            type="url"
            onChange={(linkURL) => {
              setAttributes({ linkURL });
            }}
            value={linkURL}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={external}
            onChange={() => {
              setAttributes({ external: !external });
            }}
          />
        </PanelRow>
        {type !== "60-40" ? (
          <PanelRow>
            <SelectControl
              label="Button Color"
              value={buttonColor}
              options={[
                { value: "gold", label: "Gold" },
                { value: "black", label: "Black" },
              ]}
              onChange={(buttonColor) => {
                setAttributes({ buttonColor });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {source === "rss" ? (
          <PanelRow>
            <TextControl
              label={"Feed URL for the Featured news"}
              type="url"
              onChange={(feedURLFeatured) => {
                setAttributes({ feedURLFeatured });
              }}
              value={feedURLFeatured}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {source === "rss" ? (
          <PanelRow>
            <TextControl
              label={"Feed URL for the news List"}
              help="if left empty it'll use the same RSS feed for the featured section"
              type="url"
              onChange={(feedURLList) => {
                setAttributes({ feedURLList });
              }}
              value={feedURLList}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {source === "auto" ? (
          <>
            <PanelRow>
              <ToggleControl
                label="Categories"
                checked={hasSelectedCatTerms}
                help={
                  hasSelectedCatTerms
                    ? "Choose by categories"
                    : "Include all categories"
                }
                onChange={(hasSelectedCatTerms) => {
                  setAttributes({ hasSelectedCatTerms });
                }}
              />
            </PanelRow>
            {hasSelectedCatTerms ? (
              <PanelRow>
                <SelectControl
                  multiple
                  label="Choose Categories"
                  value={selectedCatTerms}
                  options={catTerms}
                  onChange={(selectedCatTerms) => {
                    setAttributes({ selectedCatTerms });
                  }}
                />
              </PanelRow>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        <PanelRow>
          <CheckboxControl
            label={
              type !== "50-50-post"
                ? "Show Tag of the News?"
                : "Show Taxonomy Tag of the News?"
            }
            checked={showTag}
            onChange={() => {
              setAttributes({ showTag: !showTag });
            }}
          />
        </PanelRow>
        {type === "50-50-post" ? (
          <PanelRow>
            <CheckboxControl
              label="Show Post Type?"
              checked={showPostType}
              onChange={() => {
                setAttributes({ showPostType: !showPostType });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}

        {type !== "60-40" ? (
          <PanelRow>
            <CheckboxControl
              label="Show Featured Image?"
              checked={showImage}
              onChange={() => {
                setAttributes({ showImage: !showImage });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {type !== "50-50-post" ? (
          <PanelRow>
            <CheckboxControl
              label="Show Date of the News?"
              checked={showDate}
              onChange={() => {
                setAttributes({ showDate: !showDate });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
      </PanelBody>
      {source === "manual" ? (
        <PanelBody title={__("Slides")}>
          <PanelRow>
            <ReactSortable
              list={sliderCards}
              setList={(val) => {
                let titles = [],
                  values = [];
                sliderCards.map((item) => titles.push(item.title));
                val.map((item) => values.push(item.title));
                if (_.isEqual(titles, values)) {
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
          {sliderCards.length < 1 ? (
            <PanelRow>
              <Button isPrimary onClick={() => handleAddNewSlide()}>
                Add New Slide
              </Button>
            </PanelRow>
          ) : (
            ""
          )}
        </PanelBody>
      ) : (
        ""
      )}
      {source === "manual" ? (
        <PanelBody title={__("Links")}>
          <PanelRow>
            <ReactSortable
              list={smallCards}
              setList={(val) => {
                let titles = [],
                  values = [];
                smallCards.map((item) => titles.push(item.title));
                val.map((item) => values.push(item.title));
                if (_.isEqual(titles, values)) {
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
          {smallCards.length <= 3 ? (
            <PanelRow>
              <Button isPrimary onClick={() => handleAddNewCard()}>
                Add New List Item
              </Button>
            </PanelRow>
          ) : (
            ""
          )}
        </PanelBody>
      ) : (
        ""
      )}
    </InspectorControls>,
    <div {...blockProps} key="2">
      <div className={`purdue-home-news-events-editor`}>
        {source === "manual" ? (
          <div
            className={`purdue-home-news-and-events ${
              type !== "50-50-post" ? `` : `post-50-50`
            }`}
          >
            <div
              className={`section${paddingTop ? ` ${paddingTop}` : ""}${
                paddingBottom ? ` ${paddingBottom}` : ""
              }`}
            >
              <div className="container">
                {type === "60-40" ? (
                  <div className="columns is-mulitline align-bottom">
                    <div className="column is-4">
                      <RichText
                        tagName="h2"
                        value={heading}
                        className={`purdue-home-news-events__header`}
                        onChange={(heading) => {
                          setAttributes({ heading });
                        }}
                        placeholder="Add section header"
                      ></RichText>
                    </div>
                    <div className="column is-narrow">
                      <a
                        className="purdue-home-button"
                        href={linkURL}
                        target={`${external ? "_blank" : "_self"}`}
                      >
                        {linkText.trim()}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className={`tagged-header-container`}>
                    <RichText
                      tagName="h2"
                      value={heading}
                      className={`tagged-header purdue-home-news-events__header--tagged`}
                      onChange={(heading) => {
                        setAttributes({ heading });
                      }}
                      placeholder="Add section header"
                    ></RichText>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="columns">
                  <div className="column">
                    {type === "60-40" ? (
                      <div className={`tagged-header-container`}>
                        <RichText
                          tagName="h3"
                          value={featuredHeading}
                          className={`tagged-header`}
                          onChange={(featuredHeading) => {
                            setAttributes({ featuredHeading });
                          }}
                          placeholder="Add header to the slider"
                        ></RichText>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="glide purdue-home-news-events__slider">
                      <div className="glide__track" data-glide-el="track">
                        <div className="glide__slides">
                          {sliderCards.length > 0
                            ? sliderCards.map((item, index) => {
                                return (
                                  <div
                                    key={item.id}
                                    className={`purdue-home-cta-card purdue-home-cta-card--news post-type-${
                                      item.postType
                                        ? item.postType
                                            .replace(/\s+/g, "-")
                                            .toLowerCase()
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
                                    {item.linkType === "story" ? (
                                      <div className="flex-container--align-vertical-bottom">
                                        <div className="purdue-home-news-events__content">
                                          {showTag &&
                                          item.tag &&
                                          type !== "50-50-post" ? (
                                            <p className="purdue-home-news-events__tag">
                                              {item.tag}
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                          <p className="purdue-home-news-events__title">
                                            {item.title}
                                          </p>
                                          {(showTag || showPostType) &&
                                          type === "50-50-post" ? (
                                            <p className="purdue-home-news-events__date">
                                              <span
                                                className={`purdue-posttype-tag`}
                                              >
                                                {showPostType
                                                  ? item.postType
                                                  : ""}{" "}
                                                {showPostType && showTag
                                                  ? " | "
                                                  : ""}{" "}
                                                {showTag ? item.tag : ""}
                                              </span>
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                          {showDate && type !== "50-50-post" ? (
                                            <p className="purdue-home-news-events__date">
                                              <span className="date">
                                                {item.date}
                                              </span>
                                              {showDate && item.time
                                                ? " | "
                                                : ""}
                                              <span className="time">
                                                {item.time}
                                              </span>
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {item.linkType === "video" ? (
                                      <div className="flex-container--align-center">
                                        <span className="cta-link purdue-home-cta-card__link">
                                          {item.title}
                                        </span>
                                        <i className="fa-regular fa-circle-play cta-icon"></i>
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
                  <div className="column">
                    {type === "60-40" ? (
                      <div className={`tagged-header-container`}>
                        <RichText
                          tagName="h3"
                          value={listHeading}
                          className={`tagged-header`}
                          onChange={(listHeading) => {
                            setAttributes({ listHeading });
                          }}
                          placeholder="Add header to the list"
                        ></RichText>
                      </div>
                    ) : (
                      ""
                    )}
                    {smallCards.length > 0
                      ? smallCards.map((item, index) => {
                          return (
                            <div
                              key={item.id}
                              className={`purdue-home-news-events__list  post-type-${
                                item.postType
                                  ? item.postType
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()
                                  : ""
                              }`}
                            >
                              {type === "50-50-post" ? (
                                <div className="columns">
                                  {showImage ? (
                                    <div className="column is-4">
                                      <div className="image is-16by9">
                                        {item.mediaType === "image" ? (
                                          <img
                                            className="purdue-home-background-image"
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
                                  <div className="column">
                                    <p className="purdue-home-news-events__title">
                                      {item.title}
                                    </p>
                                    {showTag || showPostType ? (
                                      <p className="purdue-home-news-events__date">
                                        {showPostType ? (
                                          <span
                                            className={`purdue-posttype-tag`}
                                          >
                                            {item.postType}
                                          </span>
                                        ) : (
                                          ""
                                        )}{" "}
                                        {showPostType && showTag ? " | " : ""}{" "}
                                        {showTag ? item.tag : ""}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : type === "50-50" ? (
                                <div className="columns">
                                  {showImage ? (
                                    <div className="column is-4">
                                      <div className="image is-16by9">
                                        {item.mediaType === "image" ? (
                                          <img
                                            className="purdue-home-background-image"
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
                                  <div className="column">
                                    {showTag && item.tag ? (
                                      <p className="purdue-home-news-events__tag">
                                        {item.tag}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    <p className="purdue-home-news-events__title">
                                      {item.title}
                                    </p>
                                    {showDate ? (
                                      <p className="purdue-home-news-events__date">
                                        {item.date ? (
                                          <span className="date">
                                            {item.date}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {item.time && item.date ? " | " : ""}
                                        {item.time ? (
                                          <span className="time">
                                            {item.time}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-container flex-container--align-center">
                                  {showTag && item.tag ? (
                                    <p className="purdue-home-news-events__tag">
                                      {item.tag}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  <p className="purdue-home-news-events__title">
                                    {item.title}
                                  </p>
                                  {showDate ? (
                                    <p className="purdue-home-news-events__date">
                                      {item.date ? (
                                        <span className="date">
                                          {item.date}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {item.time && item.date ? " | " : ""}
                                      {item.time ? (
                                        <span className="time">
                                          {item.time}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      : ""}
                    {type !== "60-40" && linkURL && linkText ? (
                      <a
                        className={`purdue-home-button purdue-home-news-events__list-button${
                          buttonColor && buttonColor === "black"
                            ? " purdue-home-button--black"
                            : ""
                        }`}
                        href={linkURL}
                        target={`${external ? "_blank" : "_self"}`}
                      >
                        {linkText.trim()}
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Disabled>
            <ServerSideRender
              block="purdue/news-and-events"
              attributes={props.attributes}
            />
          </Disabled>
        )}
      </div>
    </div>,
  ];
};
export default edit;

import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";

import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  InnerBlocks,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";
import "./editor.scss";
import { useState } from "@wordpress/element";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    type,
    mediaURL,
    mediaAlt,
    header,
    subheader,
    text,
    paddingTop,
    paddingBottom,
    links,
    buttonLinks,
    imgs,
    items,
    token,
    id,
  } = props.attributes;
  const blockProps = useBlockProps();

  const [error, setError] = useState(null);
  const removeLink = (identifier) => {
    const newlinks = buttonLinks.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ buttonLinks: newlinks });
  };

  const initialButtonLink = {
    linkText: "",
    linkURL: "",
    buttonColor: "gold",
    fullWidth: false,
    external: false,
  };

	const makeButtonLink = () => ({
		...initialButtonLink,
		id: crypto.randomUUID()
	});

	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {
		let obj, obj2;
		if (buttonLinks.length === 0) {
			obj = [makeButtonLink()]
		} else {
			obj = normalizeUuid(structuredClone(buttonLinks));
		}

		if (links.length === 0) {
			obj2 = [makeLink()]
		} else {
			obj2 = normalizeUuid(structuredClone(links));
		}
		setAttributes({
			buttonLinks: obj,
			links: obj2
		});
	}, [])



  const handleAddNewButtonLink = () => {
    let newLinks = [...buttonLinks];
    newLinks.push(makeButtonLink());
    setAttributes({ buttonLinks: newLinks });
  };
  const handleButtonLinkTextChange = (text, id) => {
	  const newLinks = buttonLinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: text,
		  } : item
	  );
	  setAttributes({ buttonLinks: newLinks });
  };
  const handleButtonLinkURLChange = (url, id) => {
	  const newLinks = buttonLinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ buttonLinks: newLinks });
  };
  const handleButtonColorChange = (color, id) => {
	  const newLinks = buttonLinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ buttonLinks: newLinks });
  };
  const handleButtonWidthChange = (id) => {
		const newLinks = buttonLinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  fullWidth: !item.fullWidth,
		  } : item
		);
		setAttributes({ buttonLinks: newLinks });
  };
  const handleButtonExternalChange = (index) => {
	  const newLinks = buttonLinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ buttonLinks: newLinks });
  };
  let linksEditorFields;
  linksEditorFields = buttonLinks.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.linkText ? item.linkText : `Button ${index + 1}`}
      >
        <PanelRow>
          <TextControl
            label="Link Text"
            value={item.linkText}
            onChange={(val) => handleButtonLinkTextChange(val, item.id)}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Link URL"}
            type="url"
            onChange={(val) => {
              handleButtonLinkURLChange(val, item.id);
            }}
            value={item.linkURL}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={item.external}
            onChange={() => {
              handleButtonExternalChange(item.id);
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose a button color"
            value={item.buttonColor}
            options={[
              { label: "Gold", value: "gold" },
              { label: "Black", value: "black" },
              { label: "White", value: "white" },
            ]}
            onChange={(color) => {
              handleButtonColorChange(color, item.id);
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Make it full width"
            checked={item.fullWidth}
            onChange={() => {
              handleButtonWidthChange(item.id);
            }}
          />
        </PanelRow>
        <Button
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeLink(item.id);
          }}
        >
          Remove Item
        </Button>
      </PanelBody>
    );
  });
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink = {
    linkText: "Facebook",
    linkURL: "",
    external: true,
  };

  const handleAddNew = () => {
    let newLinks = [...links];
    newLinks.push(makeLink());
    setAttributes({ links: newLinks });
  };
  const handleLinkTextChange = (text, id) => {
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: text,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  };
  const handleLinkURLChange = (url, id) => {
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  };
  const handleExternalChange = (id) => {
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  };
  let editorFields;
  editorFields = links.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.linkText ? item.linkText : `link ${index + 1}`}
      >
        <PanelRow>
          <SelectControl
            label="Social Media"
            value={item.linkText}
            options={[
              { label: "Facebook", value: "Facebook" },
              { label: "Instagram", value: "Instagram" },
              { label: "Twitter", value: "Twitter" },
              { label: "LinkedIN", value: "LinkedIN" },
              { label: "YouTube", value: "YouTube" },
              { label: "SnapChat", value: "SnapChat" },
            ]}
            onChange={(val) => handleLinkTextChange(val, item.id)}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Social Media Link"}
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
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeItem(item.id);
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
            label="How to add media"
            value={type}
            help={`${
              type === "plugin"
                ? "Use the block provided by a plugin to add a 3x2 grid"
                : ""
            }`}
            options={[
              { value: "plugin", label: "Plugin" },
              { value: "manual", label: "Manual upload" },
              { value: "facebook", label: "Facebook API" },
            ]}
            onChange={(type) => {
              setAttributes({ type });
            }}
          />
        </PanelRow>
        {type === "facebook" ? (
          <PanelRow>
            <TextControl
              label="Add Token"
              help="Add the token got from your facebook API. Need to refresh the token every 60 days."
              value={token}
              onChange={(token) => setAttributes({ token })}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {type === "facebook" ? (
          <Button
            isPrimary
            onClick={() => {
              fetch(
                `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
              )
                .then((result) => result.json())
                .then((x) => {
                  setAttributes({ token: x.access_token });
                })
                .catch((error) => {
                  setError(error);
                });
            }}
          >
            Update Token
          </Button>
        ) : (
          ""
        )}
        {type === "facebook" ? (
          <p style={{ fontSize: "14px" }}>
            Click to update the token after it's 24 hours old and before it's 2
            month old. <br />
          </p>
        ) : (
          ""
        )}

        {type === "facebook" && error ? (
          <p style={{ fontSize: "14px", color: "red" }}>
            {error}
            <br />
          </p>
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
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody title={__("Button Links")}>
        <PanelRow>
          <ReactSortable
            list={buttonLinks}
            setList={(val) => {
              let linkTexts = [],
                values = [];
              buttonLinks.map((item) => linkTexts.push(item.linkText));
              val.map((item) => values.push(item.linkText));
              if (_.isEqual(linkTexts, values)) {
                return;
              }
              setAttributes({
                buttonLinks: val,
              });
            }}
            className="sortable-posts"
          >
            {linksEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        <PanelRow>
          <Button isPrimary onClick={() => handleAddNewButtonLink()}>
            Add New Button
          </Button>
        </PanelRow>
      </PanelBody>
      <PanelBody title={__("Social Links")}>
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
            {editorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        <PanelRow>
          <Button isPrimary onClick={() => handleAddNew()}>
            Add New Link
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
      <div
        className={`purdue-home-instagram-feed purdue-home-instagram-feed-editor`}
      >
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(img) => {
              setAttributes({
                mediaURL: img.url,
                mediaAlt: img.alt,
              });
            }}
			value={mediaURL}
			render={({ open }) => {
              return (
                <div
                  className={`image`}
                  style={{ backgroundImage: `url(${mediaURL})` }}
                  aria-label={mediaAlt}
                >
                  <div className="image-buttons">
                    <Button isPrimary onClick={open}>
                      {mediaURL !== ""
                        ? "Select a new background image"
                        : "Select a background image"}
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        </MediaUploadCheck>
        <div
          className={`section${paddingTop ? ` ${paddingTop}` : ""}${
            paddingBottom ? ` ${paddingBottom}` : ""
          }`}
        >
          <div className={`container`}>
            <div className={`columns`}>
              <div className={`column`}>
                <div className={`tagged-header-container`}>
                  <RichText
                    tagName="p"
                    value={subheader}
                    className={`tagged-header tagged-header--gold`}
                    onChange={(subheader) => {
                      setAttributes({ subheader });
                    }}
                    placeholder="Add Section Header"
                  ></RichText>
                </div>
                <RichText
                  tagName="h2"
                  value={header}
                  className={`purdue-home-instagram-feed__header`}
                  onChange={(header) => {
                    setAttributes({ header });
                  }}
                  placeholder="Add Header"
                ></RichText>
                <RichText
                  tagName="p"
                  value={text}
                  className={`purdue-home-instagram-feed__text`}
                  onChange={(text) => {
                    setAttributes({ text });
                  }}
                  placeholder="Add paragraph text"
                ></RichText>
                <ul className="purdue-home-button-list">
                  {buttonLinks.length > 0 && buttonLinks[0].linkURL
                    ? buttonLinks.map((link, index) => {
                        return (
                          <li
                            key={index}
                            className={`${
                              link.fullWidth
                                ? " purdue-home-button-wrap--full"
                                : ""
                            }`}
                          >
                            <a
                              className={`purdue-home-button${
                                link.buttonColor === "black"
                                  ? " purdue-home-button--black"
                                  : ""
                              }${
                                link.buttonColor === "white"
                                  ? " purdue-home-button--white"
                                  : ""
                              }`}
                              href={link.linkURL}
                              target={`${link.external ? "_blank" : "_self"}`}
                            >
                              {link.linkText.trim()}
                            </a>
                          </li>
                        );
                      })
                    : ""}
                </ul>
                <div className="purdue-home-instagram-feed__list-container">
                  <ul className="purdue-home-instagram-feed__list">
                    {links.length > 0 && links[0].linkURL
                      ? links.map((link, index) => {
                          return (
                            <li key={index}>
                              {link.linkText === "Facebook" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    Facebook
                                  </span>
                                  <i class="fa-brands fa-square-facebook"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {link.linkText === "Twitter" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    Twitter
                                  </span>
                                  <i class="fa-brands fa-square-x-twitter"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {link.linkText === "LinkedIN" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    LinkedIN
                                  </span>
                                  <i class="fa-brands fa-linkedin"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {link.linkText === "Instagram" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    Instagram
                                  </span>
                                  <i class="fa-brands fa-square-instagram"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {link.linkText === "YouTube" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    YouTube
                                  </span>
                                  <i class="fa-brands fa-square-youtube"></i>
                                </a>
                              ) : (
                                ""
                              )}
                              {link.linkText === "SnapChat" ? (
                                <a
                                  title={link.linkText}
                                  href={link.linkURL}
                                  target={`${
                                    link.external ? "_blank" : "_self"
                                  }`}
                                >
                                  <span className="screen-reader-text">
                                    SnapChat
                                  </span>
                                  <i class="fa-brands fa-square-snapchat"></i>
                                </a>
                              ) : (
                                ""
                              )}
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
              </div>
              <div className={`column`}>
                {type === "plugin" ? (
                  <InnerBlocks
                    template={BLOCKS_TEMPLATE}
                    templateLock={false}
                  />
                ) : (
                  ""
                )}
                {type === "manual" ? (
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
                          <div className="image-slider-editor">
                            <div className="buttons-container">
                              <button isPrimary onClick={open}>
                                {imgs.length === 0
                                  ? "Select 6 images"
                                  : "Select new images"}
                              </button>
                            </div>
                            {imgs.length > 0 ? (
                              <div className="purdue-home-instagram-feed__image-container">
                                {imgs.map((img, index) => {
                                  return index < 6 ? (
                                    <figure
                                      key={index}
                                      className="purdue-home-instagram-feed__image image is-1by1"
                                    >
                                      <img src={img.url} alt={img.alt} />
                                    </figure>
                                  ) : (
                                    ""
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
                ) : (
                  ""
                )}
                {type === "facebook" ? (
                  <div className="facebook-api-feed">
                    {error
                      ? error
                      : "Please see the feed on the front end of the page."}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
};
export default edit;

import { __ } from "@wordpress/i18n";

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
  Disabled,
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
const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];
import "./editor.scss";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";
import LinkPanelControl from "../../components/linkcomponent";

function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    contentAlign,
    layout,
    header,
    background,
    subheader,
    mediaType,
    mediaURL,
    mediaAlt,
    mediaTitle,
    youtubeLink,
    links,
    paddingTop,
    paddingBottom,
    id,
  } = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const videoId = getVideoId(youtubeLink);
  const initialLink = {
    linkText: "",
    linkURL: "",
    buttonColor: "gold",
    fullWidth: false,
    external: false,
  };
	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});


	useEffect(() => {

		let obj;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, [])

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
  const handleColorChange = (color, id) => {
      const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  };
  const handleWidthChange = (id) => {
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  fullWidth: !item.fullWidth,
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

  let editorFields;
  editorFields = links.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.linkText ? item.linkText : `link ${index + 1}`}
      >
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
            value={item.buttonColor}
            options={[
              { label: "Gold", value: "gold" },
              { label: "Black", value: "black" },
              { label: "White", value: "white" },
            ]}
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
            label="Backgorund"
            value={background}
            options={[
              { label: "None", value: "none" },
              { label: "Black", value: "black" },
              { label: "Gray", value: "gray" },
              { label: "Gold", value: "gold" },
            ]}
            onChange={(background) => {
              setAttributes({ background });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Layout"
            help="Ratio of image to text"
            value={layout}
            options={[
              { value: "60-40", label: "60:40" },
              { value: "50-50", label: "50:50" },
            ]}
            onChange={(layout) => {
              setAttributes({ layout });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Align Content"
            value={contentAlign}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
            onChange={(contentAlign) => {
              setAttributes({ contentAlign });
            }}
          />
        </PanelRow>

        <PanelRow>
          <TextControl
            label={"Add a YouTube URL"}
            type="url"
            onChange={(youtubeLink) => {
              setAttributes({ youtubeLink });
            }}
            value={youtubeLink}
          />
        </PanelRow>
        {youtubeLink && !videoId ? (
          <p style={{ color: "red" }}>Please enter a valid Youtube URL.</p>
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
      </PanelBody>
      <PanelBody title={__("Links")}>
        <PanelRow>
          <ReactSortable
            list={links}
            setList={(val) => {
              let linkURLs = [],
                values = [];
              links.map((item) => linkURLs.push(item.linkURL));
              val.map((item) => values.push(item.linkURL));
              if (_.isEqual(linkURLs, values)) {
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
      <PanelBody>
        <PanelRow>
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
      <div
        className={`purdue-home-featured-story purdue-home-featured-story-editor`}
      >
        <div
          className={`section has-${background}-background ${
            paddingTop ? ` ${paddingTop}` : ""
          }${paddingBottom ? ` ${paddingBottom}` : ""}`}
        >
          <div className="container">
            <div className={`tagged-header-container`}>
              <RichText
                tagName="p"
                value={subheader}
                className={`tagged-header${
                  background !== "gold" ? " tagged-header--gold" : ""
                }`}
                onChange={(subheader) => {
                  setAttributes({ subheader });
                }}
                placeholder="Add Section Header"
              ></RichText>
            </div>
            <div
              className={`columns purdue-home-featured-story__container${
                contentAlign === "left"
                  ? " purdue-home-featured-story__container--reversed"
                  : ""
              }${
                layout === "50-50"
                  ? " purdue-home-featured-story__container--50"
                  : ""
              }`}
            >
              <div className="column purdue-home-featured-story__image-container">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(img) => {
                      setAttributes({
                        mediaType: img.type,
                        mediaURL: img.url,
                        mediaAlt: img.alt,
                        mediaTitle: img.title,
                      });
                    }}
                    render={({ open }) => {
                      return mediaURL !== "" ? (
                        youtubeLink && videoId ? (
                          <div
                            className={`purdue-home-cta-card purdue-home-cta-card--horizontal purdue-home-cta-card--video`}
                          >
                            <div className="image is-16by9">
                              {mediaType === "image" ? (
                                <img
                                  className="purdue-home-background-image"
                                  src={mediaURL}
                                />
                              ) : (
                                ""
                              )}
                              {mediaType === "video" ? (
                                <video
                                  className="purdue-home-background-image"
                                  muted
                                  playsinline=""
                                  src={mediaURL}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="flex-container flex-container--align-center">
                              <span className="cta-link purdue-home-cta-card__link">
                                Watch Video
                              </span>
                              <i className="fa-regular fa-circle-play cta-icon"></i>
                            </div>
                            <Button isPrimary onClick={open}>
                              Select a new image/video clip
                            </Button>
                          </div>
                        ) : (
                          <figure>
                            {mediaType === "image" ? (
                              <img src={mediaURL} />
                            ) : (
                              ""
                            )}
                            {mediaType === "video" ? (
                              <Disabled>
                                <video
                                  controls
                                  playsinline=""
                                  title={mediaTitle}
                                  src={mediaURL}
                                ></video>
                              </Disabled>
                            ) : (
                              ""
                            )}
                            <Button isPrimary onClick={open}>
                              Select a new image/video clip
                            </Button>
                          </figure>
                        )
                      ) : (
                        <Button isSecondary onClick={open}>
                          Add an image/video clip
                        </Button>
                      );
                    }}
                  />
                </MediaUploadCheck>
              </div>
              <div className="column purdue-home-featured-story__content-container">
                <RichText
                  tagName="h2"
                  value={header}
                  className={`purdue-home--featured-story__header`}
                  onChange={(header) => {
                    setAttributes({ header });
                  }}
                  placeholder="Add header"
                ></RichText>
                <InnerBlocks template={BLOCKS_TEMPLATE} templateLock={false} />
                <ul className="purdue-home-button-list">
                  {links.length > 0 && links[0].linkURL
                    ? links.map((link, index) => {
                        return (
                          <li
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
};

export default edit;

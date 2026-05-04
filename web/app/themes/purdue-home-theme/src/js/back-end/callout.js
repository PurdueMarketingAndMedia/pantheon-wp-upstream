import { __ } from "@wordpress/i18n";
import { createHigherOrderComponent } from "@wordpress/compose";

import { Fragment, useEffect } from "@wordpress/element";
import {
  InspectorControls,
  RichText,
  MediaPlaceholder,
  MediaUploadCheck,
  MediaUpload,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  ToggleControl,
  SelectControl,
  Button,
  TextControl,
  TextareaControl,
  CheckboxControl,
} from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";

function addCalloutSettings(settings, name) {
  if (typeof settings.attributes !== "undefined") {
    //adding our settings to just core/paragraph
    if (name == "core/paragraph") {
      settings.attributes = Object.assign(settings.attributes, {
        modifier: {
          type: "string",
          default: "none",
        },
        showCallout: {
          type: "boolean",
          default: false,
        },
        media: {
          type: "string",
          default: "upload",
        },
        mediaId: {
          type: "number",
          default: 0,
        },
        mediaUrl: {
          type: "string",
          default: "",
        },
        mediaAlt: {
          type: "string",
          default: "",
        },
        calloutText: {
          type: "string",
          default: "",
        },
        isButton: {
          type: "boolean",
          default: false,
        },
        buttonText: {
          type: "string",
          default: "",
        },

        linkText: {
          type: "string",
          default: "",
        },
        external: {
          type: "boolean",
          default: false,
        },
        youtubeURL: {
          type: "string",
          default: "",
        },
        vimeoURL: {
          type: "string",
          default: "",
        },
        youtubeTitle: {
          type: "string",
          default: "",
        },
        vimeoRatio: {
          type: "string",
          default: "16by9",
        },
        initialWords: {
          type: "string",
          default: "WEST LAFAYETTE, Ind.",
        },
        addInitialWords: {
          type: "boolean",
          default: false,
        },
      });
    }
  }

  return settings;
}
/**
 * Registering hook name
 * unique name
 * Callback function
 */
addFilter(
  "blocks.registerBlockType",
  "rkv/callout/attribute",
  addCalloutSettings
);

//applying callout settings to Inspector to all core/paragraphs
const calloutInspectorControls = createHigherOrderComponent((BlockEdit) => {
  //creating
  return (props) => {
    const { attributes, setAttributes } = props;
    const {
      modifier,
      showCallout,
      media,
      mediaId,
      mediaUrl,
      mediaAlt,
      calloutText,
      isButton,
      buttonText,
      external,
      linkText,
      youtubeURL,
      youtubeTitle,
      vimeoURL,
      vimeoRatio,
      initialWords,
      addInitialWords,
    } = attributes;

    const onSelectMedia = (media) => {
      setAttributes({
        mediaId: media.id,
        mediaUrl: media.url,
        mediaAlt: media.alt,
      });
    };

    const removeMedia = () => {
      setAttributes({
        mediaId: 0,
        mediaUrl: "",
        mediaAlt: "",
      });
    };
    function getVideoId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url?.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    }
    function getVimeoId(url) {
      const regEx =
        /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/?(showcase\/)*([0-9))([a-z]*\/)*([0-9]{6,11})[?]?.*/;
      const match = url?.match(regEx);
      return match && match.length == 7 ? match[6] : null;
    }
    //if block isnt core/paragraph return normal
    if (props.name !== "core/paragraph") {
      return <BlockEdit {...props} />;
    }

    //link external or not
    let mediaURL = mediaUrl;
    if (media === "youtube") {
      const videoId = getVideoId(youtubeURL);
      setAttributes({
        mediaId: 0,
        mediaUrl: "",
        mediaAlt: "",
      });
      mediaURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } else if (media === "vimeo") {
      const videoId = getVimeoId(vimeoURL);
      setAttributes({
        mediaId: 0,
        mediaUrl: "",
        mediaAlt: "",
      });
      mediaURL = `https://vumbnail.com/${videoId}.jpg`;
    }
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={"Custom Controls"}>
            <PanelRow>
              <SelectControl
                label="Select a Custom Control"
                help="Call out can only be applied on a post."
                value={modifier}
                options={[
                  { label: "None", value: "none" },
                  { label: "Add call out", value: "callout" },
                  { label: "Add leading text", value: "lead" },
                ]}
                onChange={(newModifier) => {
                  setAttributes({ modifier: newModifier });
                  if (newModifier === "callout") {
                    setAttributes({
                      showCallout: true,
                      addInitialWords: false,
                    });
                  } else if (newModifier === "lead") {
                    setAttributes({
                      addInitialWords: true,
                      showCallout: false,
                    });
                  } else {
                    setAttributes({
                      showCallout: false,
                      addInitialWords: false,
                    });
                  }
                }}
              />
            </PanelRow>
            {showCallout && (
              <>
                <PanelRow>
                  <SelectControl
                    label="Media Source"
                    value={media}
                    options={[
                      { label: "Image", value: "upload" },
                      { label: "Youtube", value: "youtube" },
                      { label: "Vimeo", value: "vimeo" },
                    ]}
                    onChange={(media) => {
                      setAttributes({ media });
                    }}
                  />
                </PanelRow>
                {media === "upload" ? (
                  <PanelRow>
                    <div className="editor-post-featured-image__container">
                      <MediaUpload
                        allowedTypes={["image"]}
                        onSelect={onSelectMedia}
                        value={mediaId}
                        render={({ open }) => (
                          <Button
                            className={`components-button ${
                              mediaId == 0
                                ? "editor-post-featured-image__toggle"
                                : "editor-post-featured-image__preview"
                            } `}
                            onClick={open}
                          >
                            {mediaId == 0 && "Choose an Image"}
                            {mediaId != undefined && <img src={mediaUrl} />}
                          </Button>
                        )}
                      />
                      {mediaId != 0 && (
                        <MediaUploadCheck>
                          <Button
                            onClick={removeMedia}
                            isPrimary
                            style={{ marginTop: "1rem" }}
                          >
                            Remove Image
                          </Button>
                        </MediaUploadCheck>
                      )}
                    </div>
                  </PanelRow>
                ) : (
                  ""
                )}
                {media === "youtube" && (
                  <PanelRow>
                    <TextControl
                      label="Add Youtube video URL"
                      value={youtubeURL}
                      onChange={(youtubeURL) => setAttributes({ youtubeURL })}
                    />
                  </PanelRow>
                )}
                {media === "vimeo" && (
                  <PanelRow>
                    <TextControl
                      label="Add Vimeo video URL"
                      value={vimeoURL}
                      onChange={(vimeoURL) => setAttributes({ vimeoURL })}
                    />
                  </PanelRow>
                )}
                {media === "vimeo" && (
                  <PanelRow>
                    <SelectControl
                      label="Video aspect ratio"
                      value={vimeoRatio}
                      options={[
                        { label: "16by9", value: "16by9" },
                        { label: "9by16", value: "9by16" },
                        { label: "square", value: "square" },
                        { label: "21by9", value: "21by9" },
                      ]}
                      onChange={(vimeoRatio) => {
                        setAttributes({ vimeoRatio });
                      }}
                    />
                  </PanelRow>
                )}
                {media === "vimeo" ? (
                  <PanelRow>
                    <TextControl
                      label="Add video title"
                      value={youtubeTitle}
                      onChange={(youtubeTitle) =>
                        setAttributes({ youtubeTitle })
                      }
                    />
                  </PanelRow>
                ) : (
                  ""
                )}
                <PanelRow>
                  <TextareaControl
                    label="Add Call Out text"
                    value={calloutText}
                    onChange={(calloutText) => setAttributes({ calloutText })}
                  />
                </PanelRow>
                <PanelRow>
                  <ToggleControl
                    label={"Add Button"}
                    checked={isButton}
                    help={isButton ? "Add buton text" : "Add Button"}
                    onChange={(checkedButton) =>
                      setAttributes({ isButton: checkedButton })
                    }
                  />
                </PanelRow>
              </>
            )}
            {showCallout && isButton && (
              <PanelRow>
                <TextControl
                  label="Link URL"
                  type="url"
                  value={linkText}
                  onChange={(linkText) => setAttributes({ linkText })}
                />
              </PanelRow>
            )}
            {showCallout && isButton && (
              <PanelRow>
                <TextControl
                  label="Button Text"
                  value={buttonText}
                  onChange={(buttonText) => setAttributes({ buttonText })}
                />
              </PanelRow>
            )}
            {showCallout && isButton && (
              <PanelRow>
                <CheckboxControl
                  label="Open link in new tab?"
                  checked={external}
                  onChange={() => setAttributes({ external: !external })}
                />
              </PanelRow>
            )}
            {addInitialWords ? (
              <PanelRow>
                <TextControl
                  label="Leading Text"
                  value={initialWords}
                  onChange={(initialWords) => setAttributes({ initialWords })}
                />
              </PanelRow>
            ) : (
              ""
            )}
          </PanelBody>
        </InspectorControls>

        {
          //checking if show callout box is set to true
          showCallout ? (
            <div className="purdue-home-callout purdue-callout-preview wp-block">
              <div
                className={`callout-wrapper${
                  isButton && media === "upload" ? " has-link" : ""
                }`}
              >
                {mediaURL ? (
                  <figure>
                    <img src={mediaURL} className="callout-block-image" />
                  </figure>
                ) : (
                  ""
                )}
                {calloutText ? (
                  <p className="callout__text">{calloutText}</p>
                ) : (
                  ""
                )}
                {isButton ? (
                  media === "upload" ? (
                    <p className={`cta-link`}>{buttonText}</p>
                  ) : (
                    <button class="purdue-home-button">{buttonText}</button>
                  )
                ) : (
                  ""
                )}
              </div>
              <BlockEdit {...props} />
            </div>
          ) : addInitialWords ? (
            <div {...useBlockProps()} className="purdue-initial-words-wrap">
              <p className="purdue-initial-words">{initialWords} - </p>
              <BlockEdit {...props} />
            </div>
          ) : (
            <BlockEdit {...props} />
          )
        }
      </Fragment>
    );
  };
}, "calloutInspectorControls");

addFilter("editor.BlockEdit", "rkv/callout", calloutInspectorControls);

function calloutSaveProps(element, block, attributes) {
  const {
    modifier,
    showCallout,
    media,
    mediaId,
    mediaUrl,
    mediaAlt,
    calloutText,
    isButton,
    buttonText,
    external,
    linkText,
    youtubeURL,
    youtubeTitle,
    vimeoURL,
    vimeoRatio,
    initialWords,
    addInitialWords,
  } = attributes;

  if (block.name === "core/paragraph") {
    return <div>{element}</div>;
  }

  return element;
}
addFilter("blocks.getSaveContent", "rkv/callout/rel", calloutSaveProps);

import { __ } from "@wordpress/i18n";

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
  Disabled,
  ToolbarGroup,
  Panel,
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  useBlockProps,
  BlockControls,
} from "@wordpress/block-editor";
const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];
import { useState } from "@wordpress/element";
import { pencil } from "@wordpress/icons";
import "./editor.scss";

function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const edit = (props) => {
  const blockProps = useBlockProps();
  const { className, setAttributes } = props;
  const {
    background,
    header,
    buttonText,
    mediaType,
    mediaURL,
    mediaAlt,
    mediaTitle,
    youtubeLink,
    paddingTop,
    paddingBottom,
    removeSidePadding,
    id,
    aspectRatio
  } = props.attributes;
  const onSubmitURL = (e) => {
    e.preventDefault();
    if (youtubeLink) {
      setIsEditing(false);
    }
  };
  const [isEditing, setIsEditing] = useState(!youtubeLink);

  const toolbarControls = [
    {
      icon: pencil,
      title: __("Edit URL"),
      onClick: () => setIsEditing(true),
    },
  ];
  const handleChangeImage = (img) => {
    setAttributes({
		mediaType: img.type,
		mediaURL: img.url,
		mediaAlt: img.alt,
		mediaTitle: img.title
	});
  };
  const videoId = getVideoId(youtubeLink);
  const iframeMarkup = (
    <div className="iframe-container is-sr-only">
      <iframe
        id={videoId}
        className="storyline-youtube"
        title={mediaTitle}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
  const defaultThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  return [
    <BlockControls key="1">
      <ToolbarGroup controls={toolbarControls} />
    </BlockControls>,
    <InspectorControls key="2">
      <PanelBody>
        <PanelRow>
          <TextControl
            label="Add Header"
            value={header}
            onChange={(header) => setAttributes({ header })}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="Add Play Button Text"
            value={buttonText}
            onChange={(buttonText) => setAttributes({ buttonText })}
          />
        </PanelRow>

        <PanelRow>
          <SelectControl
            label="Aspect Ratio"
            value={aspectRatio}
            options={[ 
              {label: "16 by 9", value: "is-16by9"},
              {label: "9 by 16", value: "is-9by16"},
            ]}
            onChange={(aspectRatio) => {
              setAttributes({ aspectRatio });
            }}
          />
        </PanelRow>

        <PanelRow>          
          <SelectControl
            label="Background"
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
          <div className="block-ediotr-field-wrap">
            <p>Add a thumb image or Video preview</p>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(img) => handleChangeImage(img)}
                render={({ open }) => {
                  return mediaURL !== "" ? (
                    <div>
                      {mediaType === "image" ? <img src={mediaURL} /> : ""}
                      {mediaType === "video" ? (
                        <Disabled>
                          <video
                            muted
                            playsinline=""
                            title={mediaTitle}
                            src={mediaURL}
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
          </div>
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding top"
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
            label="Padding bottom"
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
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="3">
      <div className={`purdue-home-video-embed purdue-home-video-embed-editor`}>
        <div
          className={`section has-${background}-background ${
            paddingTop ? ` ${paddingTop}` : ""
          }${paddingBottom ? ` ${paddingBottom}` : ""}${
            removeSidePadding ? "has-no-sidepadding" : ""
          }`}
        >
          <div className={`container`}>
            {isEditing ? (
              <div className={"youtube-link-editor"}>
                <p>Enter Youtube URL in the box and then click "Submit"</p>
                <form onSubmit={onSubmitURL} className="youtube-link-form">
                  <TextControl
                    placeholder={__("Enter URL here…")}
                    value={youtubeLink}
                    type="url"
                    onChange={(youtubeLink) => setAttributes({ youtubeLink })}
                    className="youtube-link-input"
                  />
                  <Button isPrimary type="submit">
                    {__("Submit")}
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                {header ? (
                  <div className={`tagged-header-container`}>
                    <h2 className="tagged-header purdue-home-video-embed__header">
                      {header}
                    </h2>
                  </div>
                ) : (
                  ""
                )}
                {videoId ? (
                  <div
                    className={`purdue-home-cta-card purdue-home-cta-card--horizontal purdue-home-cta-card--video`}
                  >
                    <div className={`image ${ aspectRatio ? aspectRatio : "is-16by9" }`}>
                      {mediaType === "image" ? (
                        <img
                          className="purdue-home-background-image"
                          src={mediaURL ? mediaURL : defaultThumb}
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
                        {buttonText ? buttonText : "Watch Video"}
                      </span>
                      <i className="fa-regular fa-circle-play cta-icon"></i>
                    </div>
                    {iframeMarkup}
                  </div>
                ) : (
                  <p>Please enter a valid Youtube URL.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
  ];
};
export default edit;

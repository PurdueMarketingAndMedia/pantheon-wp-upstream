import "./editor.scss";

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  Button,
  Disabled,
} from "@wordpress/components";

//import { InspectorControls, MediaUploadCheck, MediaUpload, RichText } from '@wordpress/blocks';

import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    header,
    imgURL,
    imgAlt,
    youtubeURL,
    showOnce,
    tag,
    subtext,
    linkText,
    linkURL,
    external,
    id,
  } = props.attributes;
  const blockProps = useBlockProps();
  const removeMedia = () => {
    setAttributes({
      imgUrl: "",
      imgAlt: "",
    });
  };
  function getVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }
  const videoId = getVideoId(youtubeURL);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <TextControl
            label="Call to action text"
            value={linkText}
            onChange={(linkText) => setAttributes({ linkText })}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="Link address"
            type="url"
            value={linkURL}
            onChange={(linkURL) => setAttributes({ linkURL })}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Open link in new tab?"
            checked={external}
            onChange={() => setAttributes({ external: !external })}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="Youtube video link"
            help="Add a youtube video link to feature a video in the alert page"
            type="url"
            value={youtubeURL}
            onChange={(youtubeURL) => setAttributes({ youtubeURL })}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Show the alert only once?"
            checked={showOnce}
            onChange={() => setAttributes({ showOnce: !showOnce })}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div key="2" {...blockProps}>
      <div className={`modal alert-page-widget alert-page-widget-editor`}>
        <div className="modal-background"></div>
        <div className="modal-close" aria-label="close"></div>
        <div className="modal-content">
          {youtubeURL && youtubeURL !== "" ? (
            <div className="iframe-container">
              <iframe
                className="modal-youtube-video"
                id={videoId}
                src={videoUrl}
              ></iframe>
            </div>
          ) : (
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(img) => {
                  setAttributes({
                    imgURL: img.url,
                    imgAlt: img.alt,
                  });
                }}
                render={({ open }) => {
                  return (
                    <div className={`image-container`}>
                      <img className={"image"} src={imgURL} alt={imgAlt} />
                      <div className="image-buttons">
                        <Button isPrimary onClick={open}>
                          {imgURL !== ""
                            ? "Select a new image"
                            : "Select an image"}
                        </Button>
                        {imgURL ? (
                          <Button
                            isSecondary
                            className={"remove-image-button"}
                            onClick={removeMedia}
                          >
                            Remove image
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                }}
              />
            </MediaUploadCheck>
          )}

          <RichText
            tagName="p"
            value={tag}
            className={`aler-page__tag`}
            onChange={(tag) => {
              setAttributes({ tag });
            }}
            placeholder="Add tag"
          ></RichText>
          <RichText
            tagName="h2"
            value={header}
            className={`aler-page__header`}
            onChange={(header) => {
              setAttributes({ header });
            }}
            placeholder="Add header"
          ></RichText>
          <RichText
            tagName="p"
            value={subtext}
            className={`aler-page__subtext`}
            onChange={(subtext) => {
              setAttributes({ subtext });
            }}
            placeholder="Add subtext"
          ></RichText>
          <div
            className="purdue-home-button"
            href={linkURL}
            target={`${external ? "_blank" : "_self"}`}
          >
            {linkText}
          </div>
        </div>
      </div>
    </div>,
  ];
};

export default edit;

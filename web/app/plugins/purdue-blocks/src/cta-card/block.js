/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  Button,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("purdue-blocks/cta-card", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("CTA Card"), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="external-link-square-alt"
      className="svg-inline--fa fa-external-link-square-alt fa-w-14"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="#8E6F3E"
        d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"
      ></path>
    </svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */

  attributes: {
    subText: { type: "string", default: "" },
    link: { type: "string", default: "" },
    ctaText: { type: "string", default: "" },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    external: { type: "boolean", default: false },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Create a card with an image, some text, and a call to action button."
  ),

  edit: (props) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Open link in new tab?"
              checked={props.attributes.external}
              onChange={() =>
                props.setAttributes({ external: !props.attributes.external })
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={"bulma-blocks-editor-link-card"}>
        <div className="content">
          <span>Choose an image.</span>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => {
                props.setAttributes({
                  imgUrl: img.sizes.full.url,
                  altText:
                    props.attributes.altText !== ""
                      ? props.attributes.altText
                      : img.alt,
                });
              }}
              render={({ open }) => {
                return props.attributes.imgUrl !== "" ? (
                  <div className={"bulma-blocks-editor-link-card__preview"}>
                    <figure className={"image"}>
                      <img
                        alt={props.attributes.altText}
                        src={props.attributes.imgUrl}
                      />
                    </figure>
                    <Button
                      className={"bulma-blocks-editor-link-card__button"}
                      onClick={open}
                    >
                      Select a New Image
                    </Button>
                  </div>
                ) : (
                  <div className={"bulma-blocks-editor-link-card__container"}>
                    <p className={"bulma-blocks-editor-link-card__description"}>
                      Pick an image from the media library.
                    </p>
                    <Button
                      className={"bulma-blocks-editor-link-card__button"}
                      onClick={open}
                    >
                      Open Media Library
                    </Button>
                  </div>
                );
              }}
            />
          </MediaUploadCheck>
        </div>
        <div className="content">
          <span>Add Link Card text.</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.subText !== ""
                    ? props.attributes.subText
                    : ""
                }
                className="input"
                type="text"
                placeholder="Card text..."
                onChange={(e) => {
                  props.setAttributes({ subText: e.target.value });
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="content">
          <span>Add the text for the cta button.</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.ctaText !== ""
                    ? props.attributes.ctaText
                    : ""
                }
                className="input"
                type="text"
                placeholder="CTA Text..."
                onChange={(e) => {
                  props.setAttributes({ ctaText: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add the link.</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.link !== "" ? props.attributes.link : ""
                }
                className="input"
                type="text"
                placeholder="Paste permalink or url..."
                onChange={(e) => {
                  props.setAttributes({ link: e.target.value });
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: (props) => {
    const returned = (
      <div
        target={props.attributes.external ? "_blank" : "_self"}
        className={"card cta-card"}
        rel="noopener noreferrer"
      >
        <div className={"card-image"}>
          <figure className="image">
            <img src={props.attributes.imgUrl} alt={props.attributes.altText} />
          </figure>
        </div>
        <div className={"card-content"}>
          <p>{props.attributes.subText}</p>
          <a href={props.attributes.link} className={"cta-card__button"}>
            {props.attributes.ctaText}
          </a>
        </div>
      </div>
    );
    return returned;
  },
});

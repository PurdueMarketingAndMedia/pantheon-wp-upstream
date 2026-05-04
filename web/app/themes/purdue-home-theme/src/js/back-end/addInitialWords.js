import { __ } from "@wordpress/i18n";
import { createHigherOrderComponent } from "@wordpress/compose";

import { Fragment } from "@wordpress/element";
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
  Button,
  TextControl,
  CheckboxControl,
} from "@wordpress/components";
import { addFilter } from "@wordpress/hooks";

function addInitialWordsSettings(settings, name) {
  if (typeof settings.attributes !== "undefined") {
    //adding our settings to just core/paragraph
    if (name == "core/paragraph") {
      settings.attributes = Object.assign(settings.attributes, {
        initialWords: {
          type: "string",
          default: "",
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
  "purdue/initialwords/attributes",
  addInitialWordsSettings
);

//applying callout settings to Inspector to all core/paragraphs
const initialWordsInspectorControls = createHigherOrderComponent(
  (BlockEdit) => {
    //creating
    return (props) => {
      const { attributes, setAttributes } = props;

      const { initialWords, addInitialWords } = props.attributes;

      //if block isnt core/paragraph return normal
      if (props.name !== "core/paragraph") {
        return <BlockEdit {...props} />;
      }

      return (
        <Fragment>
          <InspectorControls>
            <BlockEdit {...props} />
            <PanelBody title={"Initial Words"}>
              <PanelRow>
                <ToggleControl
                  label={"Add Initial Words"}
                  checked={addInitialWords}
                  help={
                    addInitialWords
                      ? "Show Add Initial Words"
                      : "Add Initial Words is not being shown"
                  }
                  onChange={() =>
                    setAttributes({ addInitialWords: !addInitialWords })
                  }
                />
              </PanelRow>
            </PanelBody>
          </InspectorControls>

          {addInitialWords ? (
            <div {...useBlockProps()} className="purdue-initial-words-wrap">
              <RichText
                tagName="p"
                value={initialWords}
                placeholder={"Add Initial Words"}
                onChange={(initialWords) => {
                  setAttributes({ initialWords });
                }}
                className="purdue-initial-words"
              />
              <BlockEdit {...props} />
            </div>
          ) : (
            <BlockEdit {...props} />
          )}
        </Fragment>
      );
    };
  },
  "initialWordsInspectorControls"
);

addFilter(
  "editor.BlockEdit",
  "purdue/initialwords",
  initialWordsInspectorControls
);

function initialWordsSaveProps(element, block, attributes) {
  const { addInitialWords, initialWords } = props.attributes;

  if (block.name === "core/paragraph") {
    return <div>{element}</div>;
  }

  return element;
}
addFilter(
  "blocks.getSaveContent",
  "purdue/initialwords/rel",
  initialWordsSaveProps
);

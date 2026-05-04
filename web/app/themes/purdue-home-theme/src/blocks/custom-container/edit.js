import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  RadioControl,
  SelectControl,
  TextControl,
  CheckboxControl,
} from "@wordpress/components";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import "./editor.scss";

const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];

const Edit = (props) => {
  const { className, setAttributes } = props;
  const { id, background, paddingTop, paddingBottom, sidePadding } =
    props.attributes;
  const blockProps = useBlockProps();
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <RadioControl
            label="Choose the background."
            selected={background}
            options={[
              { label: "Gold", value: "gold" },
              { label: "Black", value: "black" },
              { label: "Gray", value: "gray" },
              { label: "Gray Gradient", value: "gradient" },
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
          <SelectControl
            label="Padding on the side"
            help="Standard side padding is the padding used for the page container."
            value={sidePadding}
            options={[
              { value: "standard", label: "Standard" },
              { value: "no", label: "None" },
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            onChange={(sidePadding) => {
              setAttributes({ sidePadding });
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

    <div key="2" {...blockProps}>
      <div
        className={`purdue-home-custom-container has-${background}-background`}
      >
        <div
          className={`section has-${background}-background ${
            paddingTop ? ` ${paddingTop}` : ""
          }${
            paddingBottom ? ` ${paddingBottom}` : ""
          } has-${sidePadding}-sidepadding`}
        >
          <InnerBlocks template={BLOCKS_TEMPLATE} templateLock={false} />
        </div>
      </div>
    </div>,
  ];
};

export default Edit;

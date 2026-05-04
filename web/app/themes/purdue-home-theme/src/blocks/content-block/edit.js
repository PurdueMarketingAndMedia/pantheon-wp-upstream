import "./editor.scss";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  RadioControl,
  SelectControl,
  TextControl,
} from "@wordpress/components";

import {
  InspectorControls,
  InnerBlocks,
  useBlockProps,
  RichText,
} from "@wordpress/block-editor";

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    id,
    addHeader,
    header,
    headerColor,
    width,
    withSidebar,
    sidebarLocationDesktop,
    sidebarLocationMobile,
    bgColor,
    border,
    twoColumn,
    paddingTop,
    paddingBottom,
    stackReverseMobile,
    divider,
    verticalCenter,
  } = props.attributes;
  const blockProps = useBlockProps();
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <CheckboxControl
            label="Add a Header to this section?"
            help="Add a header using richtext on the page editor"
            checked={addHeader}
            onChange={() => {
              setAttributes({ addHeader: !addHeader });
            }}
          />
        </PanelRow>

        {bgColor === "" ? (
            <PanelRow>
              <SelectControl
                label="Choose header background color"
                value={headerColor}
                options={[
                  { value: "gold", label: "Gold" },
                  { value: "black", label: "Black" },
                ]}
                onChange={(headerColor) => setAttributes({ headerColor })}
              />
          </PanelRow>
        ) : ("")
        }
        
        <PanelRow>
          <SelectControl
            label="Background Color"
            value={bgColor}
            options={[
              { value: "", label: "None" },
              { value: "has-black-background", label: "Black" },
              { value: "has-gray-background", label: "Gray" },
              { value: "has-gold-background", label: " Gold" },
            ]}
            onChange={(bgColor) => {
              setAttributes({ bgColor });
            }}
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
          <CheckboxControl
            label="Add a border at the bottom?"
            checked={border}
            onChange={() => {
              setAttributes({ border: !border });
            }}
          />
        </PanelRow>
        <PanelRow>
          <RadioControl
            label="Main content aria width"
            selected={width}
            options={[
              { label: "Narrow", value: "narrow" },
              { label: "Wide", value: "wide" },
            ]}
            onChange={(width) => {
              setAttributes({ width });
            }}
          />
        </PanelRow>
        {width === "narrow" ? (
          <PanelRow>
            <CheckboxControl
              label="Add A Sidebar?"
              help="Would you like to add sidebar to this page?"
              checked={withSidebar}
              onChange={() => {
                setAttributes({ withSidebar: !withSidebar });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "narrow" && withSidebar ? (
          <PanelRow>
            <RadioControl
              label="Sidebar Location On Desktop"
              help="Choose to place sidebar on the left/right side of the main content."
              selected={sidebarLocationDesktop}
              options={[
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ]}
              onChange={(option) => {
                setAttributes({ sidebarLocationDesktop: option });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "narrow" && withSidebar ? (
          <PanelRow>
            <RadioControl
              label="Sidebar Location On Mobile"
              help="Choose to place sidebar above/below the main content."
              selected={sidebarLocationMobile}
              options={[
                { label: "Above main content", value: "above" },
                { label: "Below main content", value: "below" },
              ]}
              onChange={(option) => {
                setAttributes({ sidebarLocationMobile: option });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "wide" ? (
          <PanelRow>
            <CheckboxControl
              label="Put content in two columns?"
              checked={twoColumn}
              onChange={() => {
                setAttributes({ twoColumn: !twoColumn });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "wide" && twoColumn ? (
          <PanelRow>
            <CheckboxControl
              label="Center content vertically?"
              checked={verticalCenter}
              onChange={() => {
                setAttributes({ verticalCenter: !verticalCenter });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "wide" && twoColumn ? (
          <PanelRow>
            <CheckboxControl
              label="Reverse the stack order the columns on mobile?"
              checked={stackReverseMobile}
              onChange={() => {
                setAttributes({ stackReverseMobile: !stackReverseMobile });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {width === "wide" && twoColumn ? (
          <PanelRow>
            <CheckboxControl
              label="Add a divider between columns?"
              checked={divider}
              onChange={() => {
                setAttributes({ divider: !divider });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
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
        className={`section${withSidebar ? " page-layout-with-sidebar" : ""}${
          bgColor ? ` ${bgColor}` : ""
        }
${paddingTop ? ` ${paddingTop}` : ""}
${paddingBottom ? ` ${paddingBottom}` : ""}
${border ? ` has-border-bottom` : ""}
${width === "wide" ? ` page-layout-wide` : ""}
${width === "wide" && twoColumn ? " page-layout-two-column" : ""}
${
  width === "wide" && twoColumn && stackReverseMobile
    ? " page-layout-two-column-reverser"
    : ""
}
${
  width === "wide" && twoColumn && divider
    ? " page-layout-two-column-divider"
    : ""
}
${
  width === "wide" && twoColumn && verticalCenter
    ? " page-layout-two-column-verticalCenter"
    : ""
}`}
      >
        <div
          className={`container${
            sidebarLocationDesktop === "left" && width === "narrow"
              ? " desktop-reverse"
              : ""
          }${
            (width === "narrow" && sidebarLocationMobile === "above") ||
            (width === "wide" && stackReverseMobile)
              ? " mobile-reverse"
              : ""
          }`}
        >
          {addHeader ? (
            <div
              className={`tagged-header-container${
                width === "narrow" && !withSidebar
                  ? " tagged-header-container-narrow"
                  : ""
              }${
                bgColor !== "has-gold-background" && bgColor !==""
                  ? " tagged-header-container-gold"
                  : bgColor === ""
                  ? ` tagged-header-container-${headerColor}`
                  : ""
              }`}
            >
              <RichText
                tagName="h2"
                value={header}
                className={`tagged-header${
                  bgColor !== "has-gold-background" && bgColor !== ""
                    ? " tagged-header--gold"
                    : bgColor === ""
                    ?` tagged-header--${headerColor}`
                    : ""
                }`}
                onChange={(header) => {
                  setAttributes({ header });
                }}
                placeholder="Add header"
                keepPlaceholderOnFocus={true}
              ></RichText>
            </div>
          ) : (
            ""
          )}
          <InnerBlocks
            template={[
              [
                "core/columns",
                { className: "page-layout-columns columns is-multiline" },
                [
                  [
                    "core/column",
                    { className: "column is-full-tablet page-layout-main" },
                    [
                      [
                        "core/paragraph",
                        {
                          placeholder:
                            "Start typing to add content, or remove this default paragraph block and then add new blocks.",
                        },
                      ],
                    ],
                  ],
                  [
                    "core/column",
                    {
                      className:
                        "column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar",
                    },
                    [
                      [
                        "core/paragraph",
                        {
                          placeholder:
                            "Start typing to add content, or remove this default paragraph block and then add new blocks.",
                        },
                      ],
                    ],
                  ],
                ],
              ],
            ]}
            templateInsertUpdatesSelection={false}
          />
        </div>
      </div>
    </div>,
  ];
};
export default edit;

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
  RichText,
  useBlockProps,
  InnerBlocks,
  blockEditorStore
} from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import { useEffect } from "@wordpress/element";
import {normalizeUuid} from "../../utils/normalizeUuid";

const edit = (props) => {
  const { setAttributes, clientId } = props;
  const {
    header,
    background,
    minHeight,
    subheader,
    subtext,
    imageAlignDesktop,
    imageAlignMobile,
    noDiagonal,
    loopVideo,
    mediaType,
    mediaURL,
    mediaAlt,
    mediaTitle,
    links,
    id,
  } = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink = {
    id: "",
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


  const handleAddNew = () => {
    let newLinks = [...links];
    newLinks.push(makeLink());
    setAttributes({ links: newLinks });
  };
  const handleLinkTextChange = (text, id) => {
      let newLinks = links.map((item) =>
        item.id === id ? {
          ...item,
          linkText: text,
        } : item
      );
      setAttributes({ links: newLinks });
  };
  const handleLinkURLChange = (url, id) => {
    let newLinks = links.map((item) =>
        item.id === id ? {
          ...item,
          linkURL: url,
        } : item
    );
    setAttributes({ links: newLinks });
  };
  const handleColorChange = (color, id) => {
    let newLinks = links.map((item) =>
        item.id === id ? {
          ...item,
          buttonColor: color,
        } : item
    );
    setAttributes({ links: newLinks });
  };
  const handleWidthChange = (id) => {
    let newLinks = links.map((item) =>
        item.id === id ? {
          ...item,
          fullWidth: !item.fullWidth,
        } : item
    );
    setAttributes({ links: newLinks });
  };
  const handleExternalChange = (id) => {
    let newLinks = links.map((item) =>
        item.id === id ? {
          ...item,
          external: !item.external,
        } : item
    );
    setAttributes({ links: newLinks });
  };


   const isLegacySubtext =
    subtext &&
    typeof subtext === "string" &&
    !subtext.trim().startsWith("<!-- wp:");

 const BLOCKS_TEMPLATE = isLegacySubtext
    ? [
        [
          "core/paragraph",
          {
            placeholder: "Add Content",
            content: subtext,
          },
        ],
      ]
    : [
        ["core/paragraph", { placeholder: "Add Content" }],
      ];

// Use `useSelect` to get the inner blocks for this block
const innerBlocksContent = useSelect(
  (select) => {
      const blockEditor = select('core/block-editor');
      const innerBlocks = blockEditor.getBlocks(clientId);
      return wp.blocks.serialize(innerBlocks); // Serialize inner blocks
  },
  [clientId] // Dependencies
);

useEffect(() => {
  // Only update subtext if it's not legacy and the content has changed
  if (
    typeof innerBlocksContent === "string" &&
    innerBlocksContent.trim().startsWith("<!-- wp:") &&
    subtext !== innerBlocksContent
  ) {
    setAttributes({ subtext: innerBlocksContent });
  }
}, [innerBlocksContent]);

  useEffect(() => {
    let obj;
    if (links.length === 0) {
      obj = [makeLink()]
    } else {
      obj = normalizeUuid(structuredClone(links));
    }
    setAttributes({links: obj});
  }, []);

  let editorFields;
  editorFields = links.map((item, index) => {
    return (
      <PanelBody
        initialOpen={false}
        key={item.id}
        title={item.linkText ? item.linkText : `link ${index + 1}`}
      >
        <PanelRow>
          <TextControl
            label="Link Text"
            value={item.linkText}
            onChange={(val) => handleLinkTextChange(val, item.id)}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Link URL"}
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
            label="Choose the background"
            value={background}
            options={[
              { label: "None", value: "none" },
              { label: "Gold", value: "gold" },
              { label: "Black", value: "black" },
              { label: "Gray", value: "gray" },
            ]}
            onChange={(background) => setAttributes({ background })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Position of the image/video clip on Desktop"
            value={imageAlignDesktop}
            options={[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
            ]}
            onChange={(imageAlignDesktop) =>
              setAttributes({ imageAlignDesktop })
            }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Position of the image/video clip on Mobile"
            value={imageAlignMobile}
            options={[
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" },
            ]}
            onChange={(imageAlignMobile) => setAttributes({ imageAlignMobile })}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Loop the video?"
            help="Only set this when you has a video on this block."
            checked={loopVideo}
            onChange={() => {
              setAttributes({ loopVideo: !loopVideo });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Remove the diagonal?"
            checked={noDiagonal}
            onChange={() => {
              setAttributes({ noDiagonal: !noDiagonal });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Minimum height of this block"
            value={minHeight}
            options={[
              { label: "0", value: "0" },
              { label: "300px", value: "300" },
              { label: "500px", value: "500" },
              { label: "700px", value: "700" },
            ]}
            onChange={(minHeight) => setAttributes({ minHeight })}
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
      <PanelBody title={__("Links")}>
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
        className={`purdue-home-diagonal-hero purdue-home-diagonal-hero-editor has-${background}-background
                    ${imageAlignDesktop === "left" ? " image-align-left-desktop" : ""}
                    ${imageAlignMobile === "top" ? " image-align-bottom-mobile" : ""}
                    ${minHeight !== "0" ? ` minheight-${minHeight}` : ""}
                    ${noDiagonal ? " no-diagonal" : ""}`}
      >
        <div
          className={`section has-padding-top-large has-padding-bottom-large`}
        >
            <div className={`purdue-home-diagonal-hero__content`}>
              <RichText
                tagName="p"
                value={subheader}
                className={`tagged-header purdue-home-diagonal-hero__subheader${
                  background !== "gold" ? " tagged-header--gold" : ""
                }`}
                onChange={(subheader) => {
                  setAttributes({ subheader });
                }}
                placeholder="Add Section Header"
              ></RichText>
              <RichText
                tagName="h1"
                value={header}
                className={`second-level-page-heading purdue-home-diagonal-hero__header `}
                onChange={(header) => {
                  setAttributes({ header });
                }}
                placeholder="Add Page Header"
              ></RichText>

               <InnerBlocks
                 template={BLOCKS_TEMPLATE}
               />

              <ul className="purdue-home-button-list">
                {links.length > 0 && links[0].linkURL
                  ? links.map((link, index) => {
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
            </div>
        </div>
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
              return (
                <div className={`image`}>
                  {mediaType === "image" ? (
                    <img className="" src={mediaURL} />
                  ) : (
                    ""
                  )}
                  {mediaType === "video" ? (
                    <video muted playsinline="" src={mediaURL} />
                  ) : (
                    ""
                  )}
                  <div className="image-buttons">
                    <Button isPrimary onClick={open}>
                      {mediaURL !== ""
                        ? "Select a new media"
                        : "Select a media"}
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        </MediaUploadCheck>
      </div>
    </div>,
  ];
};
export default edit;

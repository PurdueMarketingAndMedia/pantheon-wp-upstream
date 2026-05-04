import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  Button,
} from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from "react-sortablejs";
const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];
import "./editor.scss";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";


const edit = (props) => {
  const { className, setAttributes } = props;
  const { links, id, heading, style } = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newLinks = structuredClone(links.filter((item) => {
      return item.id !== identifier;
    }));
    setAttributes({ links: newLinks });
  };
  const initialRtb = {
    id: 0,
    linkText: "",
    linkURL: "",
    external: true,
  };

  const makeInitialRtb = () => ({
    ...initialRtb,
    id: crypto.randomUUID()
  });


  useEffect(() => {

    let newLinks;
    if (links.length === 0) {
      newLinks = [makeInitialRtb()]
    } else {
      newLinks = normalizeUuid(structuredClone(links));
    }
    setAttributes({links: newLinks});
  }, []);

  const handleAddNew = () => {
    let newLinks = [...links];
    newLinks.push(makeInitialRtb());
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
        title={item.linkText ? item.linkText : `Link ${index + 1}`}
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
        <Button
          style={{ marginTop: "5px" }}
          isSecondary
          onClick={() => {
            removeItem(item.id);
          }}
        >
          Remove Card
        </Button>
      </PanelBody>
    );
  });
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <TextControl
            label="Heading"
            help=""
            value={heading}
            onChange={(heading) => setAttributes({ heading })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Style Type"
            value={style}
            options={[
              { value: "popout", label: "Popout" },
              { value: "static", label: "Static" },
            ]}
            onChange={(style) => {
              setAttributes({ style });
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
      <PanelBody title={__("Links")}>
        <PanelRow>
          <ReactSortable
            list={links}
            setList={(val) => {
              let contents = [],
                values = [];
              links.map((item) => contents.push(item.linkText));
              val.map((item) => values.push(item.linkText));
              if (_.isEqual(contents, values)) {
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
      {style === "popout" ? (
        <div
          className={`purdue-home-quick-links purdue-home-quick-links-editor`}
        >
          <button
            className="accordion__heading"
            aria-controls="quick-links-content"
            aria-expanded="false"
          >
            {heading}
          </button>
          <ul
            id="quick-links-content"
            className="accordion__content navbar-find-info__items"
          >
            {links && links.length > 0 && links[0].linkURL ? (
              links.map((link, index) => {
                return (
                  <li
                    key={index}
                    className={`quick-link__item navbar-other-links`}
                  >
                    <a href={link.linkURL} className="quick-link__link">
                      {link.linkText}
                    </a>
                  </li>
                );
              })
            ) : (
              <p>Please add links using the right panel.</p>
            )}
          </ul>
        </div>
      ) : (
        <div
          className={`purdue-home-quick-links-static purdue-home-quick-links-editor`}
        >
          <div className={`tagged-header-container`}>
            <h2 className={`tagged-header`}>{heading}</h2>
          </div>
          <ul className="quick-links-content">
            {links && links.length > 0 && links[0].linkURL ? (
              links.map((link, index) => {
                return (
                  <li key={index} className={`quick-link__item`}>
                    <a href={link.linkURL} className="quick-link__link">
                      {link.linkText}
                    </a>
                  </li>
                );
              })
            ) : (
              <p>Please add links using the right panel.</p>
            )}
          </ul>
        </div>
      )}
    </div>,
  ];
};
export default edit;

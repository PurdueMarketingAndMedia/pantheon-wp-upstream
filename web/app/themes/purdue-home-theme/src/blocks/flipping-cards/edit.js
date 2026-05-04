import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  Button,
  Disabled,
  BaseControl,
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
import "./editor.scss";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const BLOCKS_TEMPLATE = [
  ["core/paragraph", { placeholder: "Body content copy" }],
];

const edit = (props) => {
  const { className, setAttributes } = props;
  const {
    background,
    header,
    content,
    cards,
    columns,
    paddingTop,
    paddingBottom,
    removeSidePadding,
    id,
  } = props.attributes;
  const blockProps = useBlockProps();
  const removeCard = (identifier) => {
    const newCards = cards.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ cards: newCards });
  };

  const initialCards = {
    id: 0,
    mediaURL:
      "https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg",
    mediaAlt: "",
    backImageURL:
      "https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg",
    backImageAlt: "",
    title: "",
    showTitle: false,
    subtitle1: "",
    subtitle2: "",
    subtitle3: "",
    content1: "",
    content2: "",
    content3: "",
  };

  const makeCard = () => ({
    ...initialCards,
    id: crypto.randomUUID()
  });

  useEffect(() => {
    let obj;
    if (cards.length === 0) {
      obj = [makeCard()]
    } else {
      obj = normalizeUuid(structuredClone(cards));
    }
    setAttributes({cards: obj});
  }, []);


  const handleAddNew = () => {
    let newCards = [...cards];
    newCards.push(makeCard());
    setAttributes({ cards: newCards });
  };

  const handleChangeContent = (content, id) => {
    const newquoteGroup = quoteGroup.map((item) =>
        item.id === id ? { ...item, quoteContent: content } : item
    );

    setAttributes({
      quoteGroup: newquoteGroup,
      _refreshNonce: Date.now(), // still forces ServerSideRender to refresh
    });
  };

  const handleCardChangeImage = (img, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          mediaURL: img.url,
          mediaAlt: img.alt
        } : item
    );
    setAttributes({ cards: newCards });
  };

  const handleCardChangeBackImage = (img, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          backImageURL: img.url,
          backImageAlt: img.alt
        } : item
    );
    setAttributes({ cards: newCards });
  };

  const handleTitleChange = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          title: text
        } : item
    );
    setAttributes({ cards: newCards });
  };

  const handleSubTitle1Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          subtitle1: text
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleSubTitle2Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          subtitle2: text
        } : item
    );
    setAttributes({ cards: newCards });
  };

  const handleSubTitle3Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          subtitle3: text
        } : item
    );
    setAttributes({ cards: newCards });
  };

  const handleContent1Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          content1: text
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleContent2Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          content2: text
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleContent3Change = (text, id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          content3: text
        } : item
    );
    setAttributes({ cards: newCards });
  };
  const handleShowTitleChange = (id) => {
    const newCards = cards.map((item) =>
        item.id === id ? {
          ...item,
          showTitle: !item.showTitle
        } : item
    );
    setAttributes({ cards: newCards });
  };

  let editorFields;

  editorFields =
    cards &&
    cards.map((item, index) => {
      return (
        <PanelBody
          initialOpen={false}
          key={item.id}
          title={`Card ${index + 1}`}
        >
          <PanelRow>
            <MediaUploadCheck>
              <BaseControl label="Front Image Upload">
                <MediaUpload
                  onSelect={(img) => handleCardChangeImage(img, item.id)}
                  render={({ open }) => {
                    return item.mediaURL !== "" ? (
                      <div>
                        <img src={item.mediaURL} />
                        <Button isSecondary onClick={open}>
                          Select a new image
                        </Button>
                      </div>
                    ) : (
                      <Button isSecondary onClick={open}>
                        Select an image
                      </Button>
                    );
                  }}
                />
              </BaseControl>
            </MediaUploadCheck>
          </PanelRow>
          <PanelRow>
            <MediaUploadCheck>
              <BaseControl label="Back Image Upload">
                <MediaUpload
                  onSelect={(img) => handleCardChangeBackImage(img, item.id)}
                  render={({ open }) => {
                    return item.backImageURL !== "" ? (
                      <div>
                        <img src={item.backImageURL} />
                        <Button isSecondary onClick={open}>
                          Select a new image
                        </Button>
                      </div>
                    ) : (
                      <Button isSecondary onClick={open}>
                        Select an image
                      </Button>
                    );
                  }}
                />
              </BaseControl>
            </MediaUploadCheck>
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Title"
              value={item.title}
              onChange={(val) => handleTitleChange(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="SubTitle #1"
              value={item.subtitle1}
              onChange={(val) => handleSubTitle1Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Content #1"
              value={item.content1}
              onChange={(val) => handleContent1Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="SubTitle #2"
              value={item.subtitle2}
              onChange={(val) => handleSubTitle2Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Content #2"
              value={item.content2}
              onChange={(val) => handleContent2Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="SubTitle #3"
              value={item.subtitle3}
              onChange={(val) => handleSubTitle3Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Content #3"
              value={item.content3}
              onChange={(val) => handleContent3Change(val, item.id)}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Show Title on the front of the card?"
              checked={item.showTitle}
              onChange={() => handleShowTitleChange(item.id)}
            />
          </PanelRow>
          <Button
            style={{ marginTop: "5px" }}
            isSecondary
            onClick={() => {
              removeCard(item.id);
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
              label="Number of columns shown on desktop"
              value={columns}
              options={[
                { value: "12", label: "1" },
                { value: "6", label: "2" },
                { value: "4", label: "3" },
                { value: "3", label: "4" },
              ]}
              onChange={(columns) => {
                setAttributes({ columns });
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
      <PanelBody title={__("Cards")}>
        <PanelRow>
          <ReactSortable
            list={cards}
            setList={(val) => {
              let ids = [],
                values = [];
              cards.map((item) => ids.push(item.id));
              val.map((item) => values.push(item.id));
              if (_.isEqual(ids, values)) {
                return;
              }
              setAttributes({
                cards: val,
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
            Add New Card
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
      <div
        className={`purdue-home-flipping-cards purdue-home-flipping-cards-editor`}
      >
        <div
          className={`section has-${background}-background ${
            paddingTop ? ` ${paddingTop}` : ""
          }${paddingBottom ? ` ${paddingBottom}` : ""}${
            removeSidePadding ? " has-no-sidepadding" : ""
          }`}
        >
          <div className={`container`}>
            <RichText
              tagName="h2"
              value={header}
              className={`flipping-cards-header`}
              onChange={(header) => {
                setAttributes({ header });
              }}
              placeholder="Add header"
              keepPlaceholderOnFocus={true}
            ></RichText>
            <RichText
              tagName="p"
              value={content}
              className={`flipping-cards-intro`}
              onChange={(content) => {
                setAttributes({ content });
              }}
              placeholder="Add Intro"
              keepPlaceholderOnFocus={true}
            ></RichText>

            <div className="flipping-cards-wrap">
              {cards.length > 0 && cards[0]["title"] ? (
                <div className="columns is-multiline">
                  {cards.map((card) => {
                    return (
                      <div className="column is-full-mobile is-half-tablet is-3-desktop">
                        <div className="flipping-card">
                          <div class="flipping-card-inner">
                            <div className="flipping-card-front">
                              <div class="flipping-icon front"></div>
                              <figure className="image is-3by5">
                                <img src={`${card.mediaURL}`} alt="" />
                              </figure>
                              {card.showTitle ? (
                                <p className="flipping-card-front__title">
                                  {card.title}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="flipping-card-back">
                              <div class="flipping-icon back"></div>
                              <figure className="image is-3by2">
                                <img src={`${card.backImageURL}`} alt="" />
                              </figure>
                              <div className="flipping-card-back__content">
                                {card.showTitle ? (
                                  <p className="flipping-card-back__title">
                                    {card.title}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.subtitle1 ? (
                                  <p className="flipping-card-back__subtitle">
                                    {card.subtitle1}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.content1 ? (
                                  <p className="flipping-card-back__text">
                                    {card.content1}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.subtitle2 ? (
                                  <p className="flipping-card-back__subtitle">
                                    {card.subtitle2}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.content2 ? (
                                  <p className="flipping-card-back__text">
                                    {card.content2}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.subtitle3 ? (
                                  <p className="flipping-card-back__subtitle">
                                    {card.subtitle3}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {card.content3 ? (
                                  <p className="flipping-card-back__text">
                                    {card.content3}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ marginTop: "3rem" }}>
                  Please add cards on the right panel.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];
};
export default edit;

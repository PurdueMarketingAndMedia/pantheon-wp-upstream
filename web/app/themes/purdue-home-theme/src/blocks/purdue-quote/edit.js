import { __ } from "@wordpress/i18n";

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  TextareaControl,
  Disabled,
  Button,
} from "@wordpress/components";
import { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Quote content copy' } ],
];
import { ReactSortable } from 'react-sortablejs';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';
import { contextConnectWithoutRef } from "@wordpress/components/build-types/context";
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const edit = ( props )=>{
  const blockProps = useBlockProps();
  const { className, setAttributes } = props;
  const { type, background, contentAlign, imgURL, imgAlt, quoteGroup, alignment,citeName, citeTitle, paddingTop, paddingBottom, removeSidePadding, id} = props.attributes;
  const initialCard={
    id:0,
    quoteContent: '',
    name:'',
    nameTitle:'',
    ctaText:'',
    ctaLink: '',
    external: false,
  }

  const makeCard = () => ({
    ...initialCard, id: crypto.randomUUID()
  })

  useEffect(() => {
    let grp;
    if (quoteGroup.length === 0) {
      grp = [makeCard()]
    } else {
      grp = normalizeUuid(structuredClone(quoteGroup));
    }
    setAttributes({quoteGroup: grp});
  }, []);



  const handleAddQuote = () => {
    let newquoteGroup=[...quoteGroup];
    newquoteGroup.push(makeCard());
    setAttributes({ quoteGroup: newquoteGroup });
  };

  const handleRemoveQuote = ( identifier ) => {
    const newquoteGroup = quoteGroup.filter((item) => {
      return item.id!== identifier;
    });

    setAttributes( { quoteGroup:newquoteGroup } );
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

  const handleChangeName = ( name, id ) => {
    const newquoteGroup = quoteGroup.map((item) =>
        item.id === id ? { ...item, name: name } : item
    );
    setAttributes({ quoteGroup: newquoteGroup, _refreshNonce: Date.now() });
  }; 
  const handleChangeTitle = ( title, id ) => {
    const newquoteGroup = quoteGroup.map((item) =>
        item.id === id ? { ...item, nameTitle: title } : item
    );
    setAttributes({ quoteGroup: newquoteGroup, _refreshNonce: Date.now() });
  }; 
  let editorFields;

editorFields = quoteGroup && quoteGroup.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={`Quote ${index+1}`}>
      <PanelRow>
        <TextareaControl
          label="Quote content"
          value={ item.quoteContent }
          onChange={ ( val ) => handleChangeContent( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Cite Name"
          value={ item.name }
          onChange={ ( val ) => handleChangeName( val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label="Title"
          value={ item.nameTitle }
          onChange={ ( val ) => handleChangeTitle( val, item.id ) }
        />
      </PanelRow>       
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          handleRemoveQuote(item.id);
        }}
      >
        Remove Quote
      </Button>
    </PanelBody>
  );
})
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose block type"
            value={ type }
            options={
              [
                { value: 'simple', label: 'Simple' },
                { value: 'mark', label: 'Quote with big quote mark' },
                { value: 'image', label: 'Quote with image' },
                { value: 'slider', label: 'Quote slider' },
              ]
            }
            onChange={ ( type ) => {
              setAttributes( { type } )
            } }
          />
        </PanelRow>
        {
          type === "simple"?
          <PanelRow>
          <SelectControl
            label="Alignment"
            value={ alignment }
            options={
              [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
              ]
            }
            onChange={ ( alignment ) => {
              setAttributes( { alignment } )
            } }
          />
        </PanelRow>:""
        }
        {
          type === "image"?
          <PanelRow>
          <SelectControl
            label="Align image"
            value={ contentAlign }
            options={
              [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' },
              ]
            }
            onChange={ ( contentAlign ) => {
              setAttributes( { contentAlign } )
            } }
          />
        </PanelRow>:""
        }{
          type !== "image"?
          <PanelRow>
          <SelectControl
            label="Choose the background"
            value={ background }
            options={ [
              { label: 'None', value: 'none' },
              { label: 'Black', value: 'black' },
              { label: 'Gold', value: 'gold' },
            ] }
            onChange={ ( background ) => setAttributes( { background } ) }
          />
        </PanelRow>:""
        }
        <PanelRow>
          <SelectControl
            label="Padding top"
            value={ paddingTop }
            options={
              [
                { value: 'has-padding-top-none', label: 'None' },
                { value: 'has-padding-top-small', label: 'Small' },
                { value: '', label: 'Medium' },
                { value: 'has-padding-top-large', label: 'Large' },
              ]
            }
            onChange={ ( paddingTop ) => {
              setAttributes( { paddingTop } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding bottom"
            value={ paddingBottom }
            options={
              [
                { value: 'has-padding-bottom-none', label: 'None' },
                { value: 'has-padding-bottom-small', label: 'Small' },
                { value: '', label: 'Medium' },
                { value: 'has-padding-bottom-large', label: 'Large' },
              ]
            }
            onChange={ ( paddingBottom ) => {
              setAttributes( { paddingBottom } )
            } }
          />
        </PanelRow>
        {
          type === "simple"?
          <PanelRow>
          <CheckboxControl
            label="Remove side padding?"
            help="You can remove the side paddings when use this block inside another container block"
            checked={removeSidePadding}
            onChange={() => {
              setAttributes( { removeSidePadding: !removeSidePadding } )
            }}
          />
        </PanelRow>:""
        }
        <PanelRow>
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={ id }
            onChange={ ( id ) => setAttributes( { id } ) }
          />
        </PanelRow>
        </PanelBody>
        {
          type==="slider"?
          <PanelBody title={__('Quotes')}>
          <PanelRow>
          <ReactSortable
              list={quoteGroup}
              setList={(val) => {
                let ids = [],
                  values = [];
                  quoteGroup.map((item) => ids.push(item.id));
                  val.map((item) => values.push(item.id));
                  if (_.isEqual(ids, values)) {
                    return;
                  }
                  setAttributes({
                    quoteGroup: val,
                  });
              }}
              className="sortable-posts"
            >
            {editorFields}
            </ReactSortable>
          </PanelRow>
          <hr></hr>
          <PanelRow>
            <Button
              isPrimary
              onClick={() => handleAddQuote()}
            >
              Add New Quote
            </Button>
          </PanelRow>
        </PanelBody>:""
        }
    </InspectorControls>,
    <div {...blockProps} key="2">
    {type==="slider"?
    <Disabled>
    <ServerSideRender
      block="purdue/purdue-quote"
      attributes={ props.attributes }
    />
  </Disabled>:
    <div className={`purdue-home-quote purdue-home-quote-editor`}>   
        <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}
        ${paddingBottom?` ${paddingBottom}`:''}
        ${removeSidePadding?" has-no-sidepadding":""}
        ${type==="simple" && alignment==="center"?" align-center":""}
        ${type==="mark" ?" has-quote-mark":""}
        ${type==="image" ?" has-feature-image":""}
        ${type==="image" && contentAlign==="right"?" has-feature-image--right":""}
        `}>  
      <div className={`container`}>
        <div className="purdue-home-quote-card">
        {
          type==="image"?
          <MediaUploadCheck>
                <MediaUpload
                  onSelect={ ( img ) => {
                    setAttributes( {
                      imgURL: img.url, 
                      imgAlt: img.alt
                    } );
                  } }
                  render={ ( { open } ) => {
                    return (
                      <div className={`image is-16by9`}>
                        <img
                          src={ imgURL }
                          alt={ imgAlt }
                        />
                        <div className="image-buttons">
                        <Button isPrimary onClick={ open }>{ imgURL !== '' ? 'Select a new image' : 'Select an image' }</Button>
                        </div>                    
                      </div>
                    );
                  } }
                />
              </MediaUploadCheck>
              :""}
            <div className={`purdue-home-quote-content`}>
              <blockquote>
                  <InnerBlocks
                    template={ BLOCKS_TEMPLATE }
                    templateLock={ false }
                  />
              </blockquote>
              <RichText
                tagName="p"
                value={citeName}
                className={`purdue-home-quote__name`}
                onChange={(citeName) => {
                  setAttributes({ citeName});
                }}
                placeholder="Add attribution name"
              ></RichText>
              <RichText
                tagName="p"
                value={citeTitle}
                className={`purdue-home-quote__title`}
                onChange={(citeTitle) => {
                  setAttributes({ citeTitle});
                }}
                placeholder="Add attribution title"
              ></RichText>
          </div>
        </div>
        </div>
        </div>
    </div>}
    </div>,
  ];
}
export default edit;
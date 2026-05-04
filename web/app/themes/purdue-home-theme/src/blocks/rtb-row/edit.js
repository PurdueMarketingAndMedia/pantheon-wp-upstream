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
import { ReactSortable } from 'react-sortablejs';
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];
import "./editor.scss";
import { useEffect } from "react";
import { isBlockIdReserved } from "../../js/back-end/blocks";
import {normalizeUuid} from "../../utils/normalizeUuid";


const edit = ( props )=>{
    const { className, setAttributes, clientId } = props;
    const { background, layout, rtbs, columns, paddingTop, paddingBottom, id, blockId} = props.attributes;
    const blockProps = useBlockProps();


    useEffect(() => {
      // Make sure the block gets a unique ID assigned
      if (!blockId || isBlockIdReserved(blockId, clientId)) {
        setAttributes({ blockId: clientId })
      }
	  let obj;
	  if (rtbs.length === 0) {
		  obj = [makeRtb()]
	  } else {
			obj = normalizeUuid(structuredClone(rtbs));
	  }
	  setAttributes({rtbs: obj});
    }, [])

    const removeItem = (identifier) => {
		const newRtbs= rtbs.filter((item) => {
			return item.id !== identifier;
		});
		setAttributes({ rtbs: newRtbs });
    };

    const initialRtb ={
      highlight:'',
      content:'',
      source:'',
      linkURL:'',
      external: true,
    }

	const makeRtb = () => ({
		...initialRtb,
		id: crypto.randomUUID()
	});

    const handleAddNew = ()=>{
      let newRtbs= [...rtbs];
      newRtbs.push(makeRtb());
      setAttributes({rtbs: newRtbs});
    }
    const handleContentChange = (text, id)=>{
		const newRtbs = rtbs.map((item) =>
			item.id === id ? {
				...item,
				content: text,
			} : item
		);
		setAttributes({ rtbs: newRtbs });
    }
    const handleSourceChange = (text, id)=>{
		const newRtbs = rtbs.map((item) =>
			item.id === id ? {
				...item,
				source: text,
			} : item
		);
		setAttributes({ rtbs: newRtbs });
    }
    const handleHighlightChange = (text, id)=>{
		const newRtbs = rtbs.map((item) =>
			item.id === id ? {
				...item,
				highlight: text,
			} : item
		);
		setAttributes({ rtbs: newRtbs });
    }
    const handleLinkURLChange = (url, id)=>{
		const newRtbs = rtbs.map((item) =>
			item.id === id ? {
				...item,
				linkURL: url,
			} : item
		);
		setAttributes({ rtbs: newRtbs });
    }
    const handleExternalChange = (id)=>{
		const newRtbs = rtbs.map((item) =>
			item.id === id ? {
				...item,
				external: !item.external,
			} : item
		);
		setAttributes({ rtbs: newRtbs });
    }
  let editorFields;
  editorFields = rtbs.map((item, index) => {   
    return (
      <PanelBody initialOpen={false} key={item.id} title={`Card ${index+1}`}>
        <PanelRow>
          <TextControl
            label="Hightlighted Text"
            value={ item.highlight }
            onChange={ ( val ) => handleHighlightChange( val, item.id ) }
          />
        </PanelRow>
        <PanelRow>
          <TextareaControl
            label="Content"
            value={ item.content }
            onChange={ ( val ) => handleContentChange( val, item.id ) }
          />
        </PanelRow>
        <PanelRow>
          <TextareaControl
            label="Source Text"
            value={ item.source }
            onChange={ ( val ) => handleSourceChange( val, item.id ) }
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={'Link URL'}
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
          style={{ marginTop: '5px' }}
          isSecondary
          onClick={() => {
            removeItem(item.id);
          }}
        >
          Remove Card
        </Button>
      </PanelBody>
    );
  })
    return [
      <InspectorControls key="1">
        <PanelBody>
          <PanelRow>
            <SelectControl
              label="Backgorund"
              value={ background }
              options={
                [
                  { label: 'None', value: 'none' },
                  { label: 'Black', value: 'black' },
                  { label: 'Gray', value: 'gray' },
                  { label: 'Gold', value: 'gold' },
                ]
              }
              onChange={ ( background ) => {
                setAttributes( { background } )
              } }
            />
          </PanelRow>   
          <PanelRow>
            <SelectControl
              label="Choose the number of clumns to display on desktop."
              value={ props.attributes.columns }
              options={ [
                { label: 'Auto', value: 'auto' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ] }
              onChange={ ( columns ) => {
                props.setAttributes( { columns } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Layout of the card"
              value={ layout }
              options={
                [
                  { label: 'Horizontal', value: 'horizontal' },
                  { label: 'Vertical', value: 'vertical' },
                ]
              }
              onChange={ ( layout ) => {
                setAttributes( { layout } )
              } }
            />
          </PanelRow>      
          <PanelRow>
            <SelectControl
              label="Padding at the top"
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
              label="Padding at the bottom"
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
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={ id }
              onChange={ ( id ) => setAttributes( { id } ) }
            />
          </PanelRow>
          </PanelBody>
          <PanelBody title={__('Cards')}>
					<PanelRow>
          <ReactSortable

							list={rtbs}
							setList={(val) => {
								let contents = [],
									values = [];
                  rtbs.map((item) => contents.push(item.content));
                  val.map((item) => values.push(item.content));
                  if (_.isEqual(contents, values)) {
                    return;
                  }
                  setAttributes({
                    rtbs: val,
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
							onClick={() => handleAddNew()}
						>
							Add New Card
						</Button>
					</PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div id={ `block-${blockId} `} {...blockProps} key="2">
      <div className={`purdue-home-rtb-row purdue-home-rtb-row-editor has-${background}-background`}>  
        <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}`}>  
          <div className={`container`}>
          <div className={`columns`}>
              {rtbs.length > 0 && rtbs[0].highlight?rtbs.map((rtb, index) => {
                return <div key={index} className={`column${columns === "1"?" is-full-desktop is-full-tablet is-full-mobile":""}${columns === "2"?" is-half-desktop is-half-tablet is-full-mobile":""}
                ${columns === "3"?" is-one-third-widescreen is-half-desktop is-half-tablet is-full-mobile":""}
                ${columns === "4"?" is-one-quarter-widescreen is-half-desktop is-half-tablet is-full-mobile":""}`}>
                  <div className={`purdue-home-rtb-horizontal${layout==="vertical"?" purdue-home-rtb-horizontal--vertical":""}`}>
                  <div className={`columns`}>
                  <div className={`column`}>
                  {rtb.highlight?<span className={`purdue-home-rtb-horizontal__highlight`}>{rtb.highlight.trim()}</span>:""}
                  </div>
                  <div className={`column`}>
                  {rtb.content?<span className={`purdue-home-rtb-horizontal__content`}>{rtb.content}</span>:""}
                  {rtb.source && rtb.linkURL !== ''?
                            <a href={rtb.linkURL} className="purdue-home-rtb-horizontal__source">{rtb.source}</a>:<span className="purdue-home-rtb-horizontal__source">{rtb.source}</span>}
                  </div>
                  </div>
                  </div>
                </div>
              }):<p>Please add cards using the right panel.</p>}
            </div>
            </div>
        </div>
      </div></div>,
    ];
  }
export default edit;
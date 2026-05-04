import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";

import { InspectorControls, InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor"
import { ReactSortable } from 'react-sortablejs';
import './editor.scss';
import {useEffect} from "react";
import {normalizeUuid} from "../../utils/normalizeUuid";

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { background, layout, header, headerType, headerLevel, subheader, subheaderType, paddingTop, paddingBottom, removeSidePadding, links, id} = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id!== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
  }
	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {

		let obj;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, [])

  const handleAddNew = ()=>{
    let newLinks= [...links];
    newLinks.push(makeLink());
    setAttributes({links: newLinks});
  }
  const handleLinkTextChange = (text, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkText: text,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleLinkURLChange = (url, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkURL: url,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleColorChange = (color, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleWidthChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  fullWidth: !item.fullWidth,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleExternalChange = (index)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
let editorFields;
editorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`link ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( val, item.id ) }
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
          <SelectControl
            label="Choose a button color"
            value={ item.buttonColor }
            options={ [
              { label: 'Gold', value: 'gold' },
              { label: 'Black', value: 'black' },
              { label: 'White', value: 'white' },
            ] }
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
        Remove Item
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
            label="Layout"
            value={ layout }
            options={
              [
                { value: 'one-centered', label: 'One Column Centered' },
                { value: 'one-left', label: 'One Column Left Aligned' },
                { value: 'two', label: 'Two Columns' },
                { value: 'two-line', label: 'Two Columns with connected line' },
              ]
            }
            onChange={ ( layout ) => {
              setAttributes( { layout } )
            } }
          />
        </PanelRow>

        <PanelRow>
          <SelectControl
            label="Heading Level of the Header"
            value={ headerLevel }
            options={ [
              { label: 'H2', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'H4', value: 'h4' },
              { label: 'H5', value: 'h5' },
              { label: 'H6', value: 'h6' },
            ] }
            onChange={ ( headerLevel ) => {
              setAttributes( { headerLevel } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Header Style"
            value={ headerType }
            options={ [
              { label: 'Acumin', value: 'acumin' },
              { label: 'United Sans', value: 'united' },
            ] }
            onChange={ ( headerType ) => {
              setAttributes( { headerType } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Section Header Style"
            value={ subheaderType }
            options={ [
              { label: 'Plain', value: 'plain' },
              { label: 'Has background', value: 'background' },
            ] }
            onChange={ ( subheaderType ) => {
              setAttributes( { subheaderType } )
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
        <CheckboxControl
          label="Remove side padding?"
          help="You can remove the side paddings when use this block inside another container block"
          checked={removeSidePadding}
          onChange={() => {
            setAttributes( { removeSidePadding: !removeSidePadding } )
          }}
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
        <PanelBody title={__('Links')}>
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
          <Button
            isPrimary
            onClick={() => handleAddNew()}
          >
            Add New Link
          </Button>
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-intro-text purdue-home-intro-text-editor has-layout-${layout}`}>   
        <div className={`section has-${background}-background ${paddingTop?` ${paddingTop}`:''}${paddingBottom?` ${paddingBottom}`:''}${removeSidePadding?" has-no-sidepadding":""}`}>  
          <div className={`container`}>
            {headerType === "acumin" ?subheaderType === "background"?
            layout === "two" || layout === "two-line"?                
            <div className={`tagged-header-container`}>
            <RichText
              tagName="p"
              value={subheader}
              className={`tagged-header${background!=="gold"?" tagged-header--gold":""}`}
              onChange={(subheader) => {
                setAttributes({ subheader});
              }}
              placeholder="Add Section Header"
              
            ></RichText>
          </div>:
              <RichText
                tagName="p"
                value={subheader}
                className={`tagged-header${background!=="gold"?" tagged-header--gold":""}`}
                onChange={(subheader) => {
                  setAttributes({ subheader});
                }}
                placeholder="Add Section Header"                
              ></RichText>:
                <RichText
                  tagName="p"
                  value={subheader}
                  className={`purdue-home-subheader`}
                  onChange={(subheader) => {
                    setAttributes({ subheader});
                  }}
                  placeholder="Add Section Header"
                ></RichText>:""
            }
              <div className={`columns${layout === "two" || layout === "two-line"? " has-two-columns":""}${layout === "two-line" ? " has-line":""}`}>
                <div className='column'>
                  <RichText
                    tagName={headerLevel}
                    value={header}
                    className={`purdue-home-intro-text__header header-font-${headerType}`}
                    onChange={(header) => {
                      setAttributes({ header});
                    }}
                    placeholder="Add Header"
                  ></RichText>
                </div>
                <div className='column'>
                  <InnerBlocks
                    template={ BLOCKS_TEMPLATE }
                    templateLock={ false }
                  />
                </div>
              </div>
              <div className="purdue-home-intro-text__list-container">
                <ul className="purdue-home-intro-text__list">
                {links.length>0 && links[0].linkURL?links.map((link, index) => {
                  return <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                  </li>
                }):""}
              </ul>
              </div>
          </div>
        </div>
    </div>
    </div>,
  ];
}

export default edit;
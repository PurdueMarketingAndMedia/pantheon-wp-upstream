import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  TextareaControl,
  SelectControl,
  Button,
} from "@wordpress/components"
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { ReactSortable } from 'react-sortablejs';
import "./editor.scss";
import {useEffect} from "react";
import {isBlockIdReserved} from "../../js/back-end/blocks";
import {normalizeUuid} from "../../utils/normalizeUuid";
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { type, alignment, background, links, id, buttonCSS} = props.attributes;
  const blockProps = useBlockProps();
  const removeItem = (identifier) => {
    const newlinks = links.filter((item) => {
      return item.id !== identifier;
    });
    setAttributes({ links: newlinks });
  };
  const initialLink ={
    linkText:'',
    linkSubtext:'',
    linkURL:'',
    external:false,
    buttonColor: 'gold',
    fullWidth: false,
    buttonCSS:'',
    ariaLabel:''
  }
	useEffect(() => {
		let obj;
		if (links.length === 0) {
			obj = [makeLink()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}
		setAttributes({links: obj});
	}, [])

	const makeLink = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

  const handleAddNew = ()=>{
    let newLinks = [...links];
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
  const handleLinkSubtextChange = (subtext, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  linkSubtext: subtext,
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
  const handleExternalChange = (id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  external: !item.external,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }
  const handleButtonCSSChange = (css, id)=>{
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonCSS: css,
		  } : item
	  );
	  setAttributes({ links: newLinks });
  }


   const handleAriaLabelChange = (label, id) => {
	  const newLinks = links.map((item) =>
		  item.id === id ? {
			  ...item,
			  ariaLabel: label
		  } : item
	  );
	  setAttributes({ links: newLinks });	  
  }
  
let editorFields;
editorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`Button ${index+1}`}>
      <PanelRow>
        <TextControl
          label={`${type==="complex"?"Title":"Button Text"}`}
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( val, item.id ) }
        />
      </PanelRow>
      {
        type==="complex"?
      <PanelRow>
        <TextareaControl
          label="Content"
          value={ item.linkSubtext }
          onChange={ ( val ) => handleLinkSubtextChange( val, item.id ) }
        />
      </PanelRow>:""}
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
        <TextControl
          label={"ARIA Label for Link"}
          onChange={(val) => {
            handleAriaLabelChange(val, item.id);
          }}
          value={item.ariaLabel}
          help={`Provide an accessible label for the link. Defaults to the ${type==="complex"?"Title":"Button Text"} if left empty.`}

        />
      </PanelRow>
      {
        type==="simple"?
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
        </PanelRow>:""
      }
      {
        type==="simple"?
        <PanelRow>
        <CheckboxControl
          label="Make it full width"
          checked={item.fullWidth}
          onChange={() => {
            handleWidthChange(item.id);
          }}
        />
      </PanelRow>:""
      }
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
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange(css,item.id);
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
            label="Button Type"
            value={ type }
            options={
              [
                { label: 'Simple Buttons', value: 'simple' },
                { label: 'Buttons With Description', value: 'complex' },
              ]
            }
            onChange={ ( type ) => {
              setAttributes( { type } )
            } }
          />
        </PanelRow> 
        {
          type==="simple"?
          <PanelRow>
          <SelectControl
            label="Alignment"
            value={ alignment }
            options={
              [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ]
            }
            onChange={ ( alignment ) => {
              setAttributes( { alignment } )
            } }
          />
        </PanelRow>:""
        }
        {
          type==="complex"?
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
        <PanelBody title={__('Buttons')}>
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
        {
          links.length<5?					
          <PanelRow>
          <Button
            isPrimary
            onClick={() => handleAddNew()}
          >
            Add New Link
          </Button>
        </PanelRow>:""
        }
      </PanelBody>
    </InspectorControls>,
    <div {...blockProps} key="2">
      {
        type==="simple"?
        <div className={`purdue-home-buttons${alignment==="left"?" purdue-home-buttons--left":""}`}>
            <ul className="purdue-home-button-list">
              {links.length > 0 && links[0].linkURL?links.map((link, index) => {
                return <li key={index} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`}  target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                </li>
              }):<p>Please add button using the right panel.</p>}
            </ul>
          </div>:
        <div className={`purdue-home-button-bar purdue-home-button-bar-editor has-${background}-background`}>  
        <ul> 
          {links.length > 0 && links[0].linkText?links.map((link, index) => {
            return <li key={index}><a className={`purdue-home-button-bar__button`}  target={`${link.external?"_blank":"_self"}`}>
              {link.linkText?<p className={`purdue-home-button-bar__button-title`}>{link.linkText.trim()}</p>:""}
              {link.linkSubtext?<p className={`purdue-home-button-bar__button-content`}>{link.linkSubtext}</p>:""}
              </a>
            </li>
          }):<p>Please add button using the right panel.</p>}
        </ul>
      </div>
      }
    </div>,
  ];
}

 export default edit;
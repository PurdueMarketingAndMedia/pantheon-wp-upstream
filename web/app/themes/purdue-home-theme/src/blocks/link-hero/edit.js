import { __ } from '@wordpress/i18n'
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button,
} from '@wordpress/components'
import { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } from "@wordpress/block-editor"
import { ReactSortable } from 'react-sortablejs';
import "./editor.scss";
import {normalizeUuid} from "../../utils/normalizeUuid";
import { useEffect } from "react";


const edit = ( props )=>{
  const { className, setAttributes } = props;
  const { header, subheader, subtext, descText, linkType, mediaType, mediaURL, mediaAlt, mediaTitle, links, ctalinks, fieldId, id} = props.attributes;
  const blockProps = useBlockProps();


  const removeItem = (linkType, identifier) => {
    if(linkType==="shortcut"){
      const newlinks = structuredClone(links.filter((item) => {
        return item.id !== identifier;
      }));
      setAttributes({ links: newlinks });
    }else{
      const newlinks = structuredClone(ctalinks.filter((item) => {
        return item.id !== identifier;
      }));
      setAttributes({ ctalinks: newlinks });
    }

  };
  const initialLink ={
    linkText:'',
    linkURL:'',
    buttonColor: 'gold',
    fullWidth: false,
    external:false,
    buttonCSS:''
  }

	const makeLinks = () => ({
		...initialLink,
		id: crypto.randomUUID()
	});

	useEffect(() => {

		let obj, obj2;

		if (links.length === 0) {
			obj = [makeLinks()]
		} else {
			obj = normalizeUuid(structuredClone(links));
		}

		if (ctalinks.length === 0) {
			obj2 = [makeLinks()]
		} else {
			obj2 = normalizeUuid(structuredClone(ctalinks));
		}

		setAttributes({
			links: obj,
			ctalinks: obj2,
			fieldId: props.clientId
		});

	}, [])

  const handleAddNew = (linkType)=>{
    if(linkType==="shortcut"){
      const newLinks= [...links];
      newLinks.push(makeLinks());
      setAttributes({links: newLinks});
    }else{
	  const newLinks= [...ctalinks];
      newLinks.push(makeLinks());
      setAttributes({ctalinks: newLinks});
    }
  }
  const handleLinkTextChange = (linkType, text, id)=>{
	  let newLinks;
	  let key;

	  if (linkType === "shortcut") {
		  newLinks = [...links];
		  key = "links";
	  } else {
		  newLinks = [...ctalinks];
		  key = "ctalinks";
	  }

	  const updatedLinks = newLinks.map((item) =>
		  item.id === id
			  ? { ...item, linkText: text }
			  : item
	  );

	  setAttributes({ [key]: updatedLinks });
  }
	const handleLinkURLChange = (linkType, url, id) => {
		let newLinks;
		let key;

		if (linkType === "shortcut") {
			newLinks = [...links];
			key = "links";
		} else {
			newLinks = [...ctalinks];
			key = "ctalinks";
		}

		const updatedLinks = newLinks.map((item) =>
			item.id === id ? { ...item, linkURL: url } : item
		);

		setAttributes({ [key]: updatedLinks });
	};

	const handleExternalChange = (linkType, id) => {
		let newLinks;
		let key;

		if (linkType === "shortcut") {
			newLinks = [...links];
			key = "links";
		} else {
			newLinks = [...ctalinks];
			key = "ctalinks";
		}

		const updatedLinks = newLinks.map((item) =>
			item.id === id ? { ...item, external: !item.external } : item
		);

		setAttributes({ [key]: updatedLinks });
	};
  const handleColorChange = (color, id)=>{
	  const newLinks = ctalinks.map((item) =>
		  item.id === id ? {
			  ...item,
			  buttonColor: color,
		  } : item
	  );
	  setAttributes({ ctalinks: newLinks });

  }
  const handleWidthChange = (id)=>{
  	const newLinks = ctalinks.map((item) =>
	  item.id === id ? {
	    ...item,
		   fullWidth: !item.fullWidth,
		} : item
	  );
	  setAttributes({ ctalinks: newLinks });
  }
  const handleButtonCSSChange = (linkType, css, index)=>{
    if(linkType==="shortcut"){
      let newLinks= structuredClone(links);
      newLinks[index].buttonCSS=css;
      setAttributes({links: newLinks});
    }else{
    let newLinks= structuredClone(ctalinks);
    newLinks[index].buttonCSS=css;
    setAttributes({ctalinks: newLinks});
    }
  }
let editorFields;
editorFields = links.map((item, index) => {   
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`link ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( "shortcut", val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={'Link URL'}
          type="url"
          onChange={(val) => {
            handleLinkURLChange("shortcut",val, item.id);
          }}
          value={item.linkURL}
        />
      </PanelRow>
      <PanelRow>
        <CheckboxControl
          label="Open link in new tab?"
          checked={item.external}
          onChange={() => {
            handleExternalChange("shortcut",item.id);
          }}
        />
      </PanelRow>
       <PanelRow>
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange("shortcut",css,index);
          }}
        />
      </PanelRow>
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeItem("shortcut",item.id);
        }}
      >
        Remove Item
      </Button>
    </PanelBody>
  );
})

let ctaLinksEditorFields;
ctaLinksEditorFields = ctalinks.map((item, index) => {
  return (
    <PanelBody initialOpen={false} key={item.id} title={item.linkText?item.linkText:`link ${index+1}`}>
      <PanelRow>
        <TextControl
          label="Link Text"
          value={ item.linkText }
          onChange={ ( val ) => handleLinkTextChange( "cta", val, item.id ) }
        />
      </PanelRow>
      <PanelRow>
        <TextControl
          label={'Link URL'}
          type="url"
          onChange={(val) => {
            handleLinkURLChange("cta",val, item.id);
          }}
          value={item.linkURL}
        />
      </PanelRow>
      <PanelRow>
        <CheckboxControl
          label="Open link in new tab?"
          checked={item.external}
          onChange={() => {
            handleExternalChange("cta", item.id);
          }}
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
      <TextControl
          label="Button CSS class(es)"
          value={item.buttonCSS}
          onChange={(css) => {
            handleButtonCSSChange("cta",css,index);
          }}
        />
      </PanelRow>
      <Button
        style={{ marginTop: '5px' }}
        isSecondary
        onClick={() => {
          removeItem("cta", item.id);
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
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={ id }
            onChange={ ( id ) => setAttributes( { id } ) }
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose the type of the links"
            value={ linkType }
            options={ [
              { label: 'Shortcuts', value: 'shortCuts' },
              { label: 'CTA links', value: 'cta' },
            ] }
            onChange={(linkType) => setAttributes( { linkType } )}
          />
        </PanelRow>
        {
          linkType === "shortCuts"?
          <PanelRow>
          <TextControl
            label="Description of the links"
            value={ descText }
            onChange={ ( descText ) => setAttributes( { descText } ) }
          />
        </PanelRow>:""
        }
        </PanelBody>
        {
          linkType === "shortCuts"?
        <PanelBody title={__('Shortcut Links')}>
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
            onClick={() => handleAddNew("shortcut")}
          >
            Add New Shortcut Link
          </Button>
        </PanelRow>
      </PanelBody>:
      <PanelBody title={__('CTA Links')}>
        <PanelRow>
        <ReactSortable

            list={ctalinks}
            setList={(val) => {
              let linkTexts = [],
                values = [];
                ctalinks.map((item) => linkTexts.push(item.linkText));
                val.map((item) => values.push(item.linkText));
                if (_.isEqual(linkTexts, values)) {
                  return;
                }
                setAttributes({
                  ctalinks: val,
                });
            }}
            className="sortable-posts"
          >
          {ctaLinksEditorFields}
          </ReactSortable>
        </PanelRow>
        <hr></hr>
        <PanelRow>
          <Button
            isPrimary
            onClick={() => handleAddNew("cta")}
          >
            Add New CTA Link
          </Button>
        </PanelRow>
      </PanelBody>}
    </InspectorControls>,
    <div {...blockProps} key="2">
    <div className={`purdue-home-cta-banner purdue-home-link-hero purdue-home-link-hero-editor`}>   
        <MediaUploadCheck>
          <MediaUpload
            onSelect={ ( img ) => {
              setAttributes( {
                mediaType: img.type,
                mediaURL: img.url,
                mediaAlt: img.alt,
                mediaTitle: img.title,
              } );
            } }
            render={ ( { open } ) => {
              return (
                <div className={`image`}>
                    {mediaType==="image" ? 
                    <img
                      className=""
                      src={mediaURL}
                    />:""}
                    {mediaType==="video" ? <video muted playsinline="" src={mediaURL}/>:""}
                  <div className="image-buttons">
                  <Button isPrimary onClick={ open }>{ mediaURL !== '' ? 'Select a new media' : 'Select a media' }</Button>
                  </div>                    
                </div>
              );
            } }
          />
        </MediaUploadCheck>   
        <div className={`section has-padding-exlarge`}>  
          <div className="container">
            <RichText
              tagName="p"
              value={subheader}
              className={`purdue-home-link-hero__subheader tagged-header tagged-header--gold`}
              onChange={(subheader) => {
                setAttributes({ subheader});
              }}
              placeholder="Add Section Header"
            ></RichText>
            <RichText
              tagName="h1"
              value={header}
              className={`purdue-home-link-hero__header second-level-page-heading`}
              onChange={(header) => {
                setAttributes({ header});
              }}
              placeholder="Add Page Header"
            ></RichText>
            <RichText
              tagName="p"
              value={subtext}
              className={`purdue-home-link-hero__subtext`}
              onChange={(subtext) => {
                setAttributes({ subtext});
              }}
              placeholder="Add subtext"
            ></RichText>
            {linkType==="cta"&&ctalinks.length>0 && ctalinks[0].linkURL?ctalinks.map((link, index) => {
                return  <ul className="purdue-home-button-list">                
                <li key={link.id} className={`${link.fullWidth?" purdue-home-button-wrap--full":""}`}><a className={`purdue-home-button${link.buttonColor==="black"?" purdue-home-button--black":""}${link.buttonColor==="white"?" purdue-home-button--white":""}`} href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                    </li>
                </ul>}):""}
              {
                linkType==="shortCuts"?
                <div className="purdue-home-link-hero__list-container">
                <span className="purdue-home-link-hero__list-desc">{descText}:</span>
                <ul className="purdue-home-link-hero__list--desktop">
                {links.length>0 && links[0].linkURL?links.map((link, index) => {
                  return <li key={link.id}><a className="purdue-home-button purdue-home-button--white" href={link.linkURL} target={`${link.external?"_blank":"_self"}`}>{link.linkText.trim()}</a>
                  </li>
                }):""}
              </ul>
              </div>:""
              }

              <div className="purdue-home-link-hero__arrow hero-down-arrow" aria-hidden="true">
                <i className="fa-solid fa-chevron-down icon" aria-hidden="true"></i>
              </div>
          </div>
        </div>
    </div></div>,
  ];
};
export default edit;
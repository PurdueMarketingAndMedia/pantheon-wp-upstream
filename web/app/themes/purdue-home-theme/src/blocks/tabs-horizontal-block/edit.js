import { __ }  from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  SelectControl,
  Button,
  CheckboxControl
} from "@wordpress/components";
import { RichText,InnerBlocks, InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import './editor.scss';

const updateTabs = (props, oldNum, newNum) => {
  const select = wp.data.select("core/block-editor");
  
  let innerBlocks = select.getBlock(props.clientId).innerBlocks;
  props.setAttributes( { numTabs:newNum } )

  const adding = newNum > oldNum;
  const triedZero = newNum === 0
  let headers=[...props.attributes.headers]

  if (oldNum === 1 && oldNum === newNum) {
    const firstBlock = createBlock("purdue/tab-horizontal-block");
    const id=props.clientId+"-0"
    const firstHeader = {id:id, text:"", active: true}
    innerBlocks = [firstBlock];
    headers.push(firstHeader)
    props.setAttributes({headers})

    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);
    wp.data
      .dispatch('core/block-editor')
      .updateBlockAttributes(select.getBlock(props.clientId).innerBlocks[0].clientId, {editorSelected:true,selected: true})      

  } else if (adding && !triedZero) {
    const newToAdd = newNum - oldNum

    for(let i = 0; i < newToAdd; i++) {
      const newColumn = createBlock('purdue/tab-horizontal-block')
      let id=headers[headers.length-1].id
      let newN=parseInt(id.substring(id.lastIndexOf("-")+1))+1
      let newId=id.substring(0,id.lastIndexOf("-")+1)+newN
      const header = {id:newId, text:"", active: false}
      innerBlocks.push(newColumn)
      headers.push(header)
    }
    props.setAttributes({headers})
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);

  } else if(!adding && !triedZero) {
    const removingNum = oldNum - newNum

    for(let i = 0; i < removingNum; i++) {
      innerBlocks.pop();
      headers.pop();
    }
    props.setAttributes({headers})
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);

  }
  for(let i=0; i<innerBlocks.length; i++){
    wp.data
    .dispatch('core/block-editor').updateBlockAttributes(select.getBlock(props.clientId).innerBlocks[i].clientId, {aria: headers[i].id})
    
  }
};

  
const edit = (props) => {
  const blockprops = useBlockProps();
  if (props.attributes.numTabs === 0) {
    updateTabs(props, 1, 1);
  }
  return [
    <InspectorControls key="c1">
      <PanelBody>
        <PanelRow>
          <SelectControl
              label="Number of Tabs"
              value={props.attributes.numTabs}
              options={ [
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
                { label: '7', value: 7 },
                { label: '8', value: 8 },
                { label: '9', value: 9 },
                { label: '10', value: 10 },
                { label: '11', value: 11 },
                { label: '12', value: 12 },
              ] }
              onChange={ ( numTabs ) => {
                updateTabs(props, props.attributes.numTabs, parseInt(numTabs))
              }
             }
            />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose a background color"
            value={ props.attributes.background }
            options={ [
              { label: 'Black', value: 'black' },
              { label: 'Gray', value: 'gray' },
              { label: 'White', value: 'white' },
            ] }
            onChange={(background) => {
              props.setAttributes({ background});
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add a Header to this section?"
            help="Add a header using richtext on the page editor"
            checked={props.attributes.addHeader}
            onChange={(addHeader) => {
              props.setAttributes({ addHeader});
            }}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
    <div {...blockprops} key="c2">
    <div className={`purdue-home-tabs-editor purdue-home-tabs-horizontal has-${props.attributes.background}-background`}>
      <div className={`section has-padding-top-large has-padding-bottom-large`}>
        
        <div className={`container`}>
          <div className={`columns`}>
            
            <div className={`column is-full tab-container`}>
            {props.attributes.addHeader?
              (<><RichText
                tagName="h2"
                value={props.attributes.heading}
                className={`tagged-header tagged-header--gold`}
                onChange={(heading) => {
                  props.setAttributes({ heading});
                }}
                placeholder="Add header to the section"                
              ></RichText>
              </>):""}
              
              <div className={`purdue-home-tabs-horizontal__headers`}>
              {props.attributes.headers.map((header, index) => {
                return  <Button key={index} 
                onClick={(e) => {
                  const select = wp.data.select("core/block-editor");
                  let innerBlocks = select.getBlock(props.clientId).innerBlocks;
                  innerBlocks.forEach((block)=>{
                    block.attributes.aria===header.id?wp.data
                    .dispatch('core/block-editor').updateBlockAttributes(block.clientId, {editorSelected: true}):
                    wp.data
                    .dispatch('core/block-editor').updateBlockAttributes(block.clientId, {editorSelected: false})
                  })
                  let headers = [ ...props.attributes.headers ];
                  headers.forEach((h)=>{
                    header.id===h.id?h.active=true:h.active=false
                  })
                  props.setAttributes( { headers } );
                  }}
                  className={`purdue-home-tabs-horizontal__header${header.active?" active":""}`} 
                  role="tab"
                ><RichText
                  tagName={"h3"}
                  value={header.text}
                  onChange={(text) => {
                    let headers = [ ...props.attributes.headers ];
                    headers[ index ].text = text;
                    props.setAttributes( { headers } );
                  }}
                  className={`purdue-home-tabs-horizontal__header-text`} 
                  placeholder="Add tab header text"
                ></RichText>
                </Button>
                })
              }
              </div>
              
            </div>

          </div>
        </div>

        <div className={`container tab-content`}>
          <div className={`columns`}>
            <div className={`column is-full`}>
              <InnerBlocks 
                templateLock="all" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>,
  ];
}

export default edit;
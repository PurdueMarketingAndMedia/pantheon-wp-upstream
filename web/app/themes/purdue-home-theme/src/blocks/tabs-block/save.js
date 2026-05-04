import { RichText,InnerBlocks, InspectorControls, useBlockProps } from "@wordpress/block-editor";

const save = (props) => {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps} className={`purdue-home-tabs has-${props.attributes.background? props.attributes.background : "black"}-background`}>
      <div className={`section has-padding-top-large has-padding-bottom-large`}>
        <div className={`container`}>
          <div className={`columns`}>
            <div className={`column is-5`}>
            <div class="arrow"></div>
              {props.attributes.addHeader?
               (<><RichText.Content
                  className={`tagged-header tagged-header--gold`}
                  tagName={ "h2" }
                  value={ props.attributes.heading }
                />
                </>):""}
              <div className={`purdue-home-tabs__headers`} role="tablist">
                {props.attributes.headers.length>0?props.attributes.headers.map((header)=>{
                  return  <button id={  `header-${header.id}` } className={`purdue-home-tabs__header ${header.active?" active":""}`} role="tab" aria-controls={  `panel-${header.id}` } aria-selected={ `${header.active?"true":"false"}` }>
                  <RichText.Content                    
                  tagName={ "h3" }                    
                  value={ header.text }
                  className={`purdue-home-tabs__header-text`} 
                />
                </button>
                }):""}
              </div>
            </div> 
            <div className={`column is-7`}>
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default save;
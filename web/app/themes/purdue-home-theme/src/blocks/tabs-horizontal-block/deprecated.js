import { RichText, InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const v1 = [
    {
      save: (props) => {
        const blockProps = useBlockProps.save();
        return (
          <div {...blockProps} className={`purdue-home-tabs-horizontal has-${props.attributes.background}-background`}>
            <div className={`section has-padding-top-large has-padding-bottom-large`}>
              <div className={`container`}>
      
                <div className={`columns`}>
                  <div className={`column is-full tab-container`}>
                  <div class="arrow"></div>
                     {props.attributes.addHeader?
                     (<><RichText.Content
                        className={`tagged-header tagged-header--gold`}
                        tagName={ "h2" }
                        value={ props.attributes.heading }
                      />
                      </>):""}
                    <div className={`purdue-home-tabs-horizontal__headers`} role="tablist">
                      {props.attributes.headers.length>0?props.attributes.headers.map((header)=>{
                        return  <button id={  `header-${header.id}` } className={`purdue-home-tabs-horizontal__header ${header.active?" active":""}`} role="tab" aria-controls={  `panel-${header.id}` }>
                        <RichText.Content                    
                        tagName={ "h3" }                    
                        value={ header.text }
                        className={`purdue-home-tabs-horizontal__header-text`}
                      />
                      </button>
                      }):""}
                    </div>
                  </div> 
                </div>
      
              </div>
      
              <div className={`container tab-content`}>
                <div className={`columns`}>
                  <div className={`column is-full`}>
                    <InnerBlocks.Content />
                  </div>
                </div>
              </div>
      
            </div>
          </div>
      
          
        );
      },
    }
  ];

export default [v1];
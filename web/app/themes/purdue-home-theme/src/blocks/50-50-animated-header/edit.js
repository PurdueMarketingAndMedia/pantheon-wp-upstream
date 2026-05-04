import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  SelectControl,
  Button
} from '@wordpress/components';

import { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

const edit = ( props ) => {
  const { className, setAttributes } = props;
  const {addHeaderAnimation, header, headerStatic1, headerAnimation, headerStatic2, subheader, mediaType, mediaURL, mediaAlt, mediaTitle, id} = props.attributes;
  const blockProps = useBlockProps();
  
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
        </PanelBody>

    </InspectorControls>,
    <div {...blockProps} key="2">

      <div className={`section purdue-home-50-50-animated-header--editor  page-layout-wide page-layout-two-column`}>

          <div className={`container`}>                      

            <div className={`wp-block-columns page-layout-columns columns is-multiline is-layout-flex wp-container-core-columns-layout-1 wp-block-columns-is-layout-flex`}>
      
              <div className={`wp-block-column column is-full-tablet page-layout-main is-layout-flow wp-block-column-is-layout-flow`}>

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

              </div>

              <div className={`wp-block-column column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar is-layout-flow wp-block-column-is-layout-flow`}>

              <RichText
                    tagName="p"
                    value={subheader}
                    className={`tagged-header tagged-header--gold purdue-home-cta-hero__subheader`}
                    onChange={(subheader) => {
                      setAttributes({ subheader});
                    }}
                    placeholder="Add Section Header"
                  ></RichText>

                    <RichText
                    tagName='h2'
                    value={headerStatic1}
                    className={`second-level-page-heading purdue-home-cta-hero__header`}
                    onChange={(headerStatic1) => {
                      setAttributes({ headerStatic1});
                    }}
                    placeholder="Add page header static part before the animation part"
                  ></RichText>

                    <RichText
                    tagName='h2'
                    value={headerAnimation}
                    className={`second-level-page-heading purdue-home-cta-hero__header`}
                    onChange={(headerAnimation) => {
                      setAttributes({ headerAnimation});
                    }}
                    placeholder="Add page header animation part, seperate them by comma"
                  >
                    
                  </RichText>

                  
                    <RichText
                    tagName='h2'
                    value={headerStatic2}
                    className={`second-level-page-heading purdue-home-cta-hero__header`}
                    onChange={(headerStatic2) => {
                      setAttributes({ headerStatic2});
                    }}
                    placeholder="Add page header static part after the animation part"
                  ></RichText>
 
              </div>

            </div>

          </div>

      </div>

   
    </div>,
  ];
};

export default edit;
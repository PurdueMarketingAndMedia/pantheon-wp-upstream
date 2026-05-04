import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from '@wordpress/data';

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add Card Content' } ],
];
const ALLOWED_BLOCKS = ['core/paragraph', 'core/list', 'core/heading', 'purdue/button-bar', 'core/image', 'core/group'];
const edit = ( props ) => {
    const blockProps = useBlockProps();
    const { className, setAttributes, context } = props;
    const {
        columnClass, cardBackground
    } = props.attributes;

    let column = "";
    let contextColumn = context["purdue/link-cards-columns"];

    if( contextColumn === 3){
        column = ' is-4-desktop is-4-widescreen is-3-fullhd';
    }else{
        column = ` is-${contextColumn}-desktop`;
    }

    if(contextColumn != 12){
        column = column + " is-half-tablet";
    }else{
        column = column + " is-full-tablet";
    }
         
    setAttributes({
        columnClass: column, cardBackground : context["purdue/link-cards-cardBackground"]
      });
    return [
            <div {...blockProps} className={`column ${columnClass}`}>
                <div class="purdue-home-cta-card purdue-home-cta-card--story">
                    <div class={`flex-container flex-container--align-center has-${cardBackground}-background`}>
                        <InnerBlocks
                            template={ BLOCKS_TEMPLATE }
                            templateLock={ false }
                            templateInsertUpdatesSelection={ false }
                            allowedBlocks={ ALLOWED_BLOCKS }
                        />
                    </div>
                </div>
            </div>
    ];
}
export default edit;
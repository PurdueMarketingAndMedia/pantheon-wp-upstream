import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
const save = ( props, attributes ) => {
  const blockProps = useBlockProps.save();
    return (

      <div {...blockProps} className={`column is-${props.attributes.columnClass}`}>
          <div class="purdue-home-cta-card purdue-home-cta-card--story">
              <div class={`flex-container flex-container--align-center has-${props.attributes.cardBackground}-background`}>
                  <InnerBlocks.Content/>
              </div>
          </div>
      </div>
    );
}
export default save;
import { InnerBlocks } from "@wordpress/block-editor";
const save = ( props ) => {
    return (<div className={ `purdue-home-tabs__panel${props.attributes.editorSelected?" active":""}` }
      aria-labelledby={`header-${props.attributes.aria}`}
      id={`panel-${props.attributes.aria}`}
      {...(props.attributes.anchorId ? { 'data-name': props.attributes.anchorId } : {})}
      >
      <InnerBlocks.Content />
      </div>
    );
}
export default save;
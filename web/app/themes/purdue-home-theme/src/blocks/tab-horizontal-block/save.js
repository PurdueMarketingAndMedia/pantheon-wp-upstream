import { InnerBlocks } from "@wordpress/block-editor";
const save = ( props ) => {
    return (<div className={ `purdue-home-tabs-horizontal__panel${props.attributes.editorSelected?" active":""}` }
      aria-labelledby={`header-${props.attributes.aria}`}
      id={`panel-${props.attributes.aria}`}
      {...(props.attributes.id ? { 'data-name': props.attributes.id } : {})}
      >
      <InnerBlocks.Content />
      </div>
    );
}
export default save;
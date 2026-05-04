import { InnerBlocks } from "@wordpress/block-editor";

const v1 = [
    {
        attributes: {
          aria: { 
                type: "string", 
                default: ""
            },
            editorSelected: { 
                type: "boolean", 
                default: false 
            },
            selected: { 
                type: "boolean", 
                default: false 
            },
            anchorId: {
                type: "string"
            }
        },
      save: (props) => {
        return (<div className={ `purdue-home-tabs__panel${props.attributes.editorSelected?" active":""}` }
            aria-labelledby={`header-${props.attributes.aria}`}
            id={`panel-${props.attributes.aria}`}
            >
            <InnerBlocks.Content />
            </div>
          );
      },
    },
  ];

export default [ v1 ];

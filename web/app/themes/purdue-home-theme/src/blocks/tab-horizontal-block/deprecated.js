import {InnerBlocks} from "@wordpress/block-editor";


const v1 =
	{
		save: (props) => {
			return (
				<div className={`purdue-home-tabs-horizontal__panel${props.attributes.editorSelected ? " active" : ""}`}
					 aria-labelledby={`header-${props.attributes.aria}`}
					 id={`panel-${props.attributes.aria}`}
				>
					<InnerBlocks.Content/>
				</div>
			);
		}
	};

const v2 =
	{
		supports: {
			className: false
		},
		save: (props) => {
			return (
				<div className={`purdue-home-tabs-horizontal__panel${props.attributes.editorSelected ? " active" : ""}`}
					 aria-labelledby={`header-${props.attributes.aria}`}
					 id={`panel-${props.attributes.aria}`}
					 {...(props.attributes.id ? {'data-name': props.attributes.id} : {})}
				>
					<InnerBlocks.Content/>
				</div>
			);
		}
	};


export default [v2, v1];
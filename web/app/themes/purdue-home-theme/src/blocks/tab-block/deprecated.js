import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";

const v1 = {
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
	supports: {
		className: false
	},
	save: (props) => {
		return (<div className={`purdue-home-tabs__panel${props.attributes.editorSelected ? " active" : ""}`}
					 aria-labelledby={`header-${props.attributes.aria}`}
					 id={`panel-${props.attributes.aria}`}
					 {...(props.attributes.anchorId ? {'data-name': props.attributes.anchorId} : {})}
			>
				<InnerBlocks.Content/>
			</div>
		);
	},
};

const v2 = {
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
	supports: {
		className: false
	},
	save: (props) => {
		return (<div className={`purdue-home-tabs__panel${props.attributes.editorSelected ? " active" : ""}`}
					 aria-labelledby={`header-${props.attributes.aria}`}
					 id={`panel-${props.attributes.aria}`}
			>
				<InnerBlocks.Content/>
			</div>
		);
	},
};

const v3 = {
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
	supports: {
		className: false
	},
	save: ( props ) => {
		const { attributes } = props;

		const blockProps = useBlockProps.save({
			className: `purdue-home-tabs__panel${
				attributes.editorSelected ? " active" : ""
			}`,
			id: `panel-${attributes.aria}`,
			"aria-labelledby": `header-${attributes.aria}`,
			"role": "tabpanel",
			...(attributes.anchorId && { "data-name": attributes.anchorId }),
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	}
};




export default [v3, v2, v1];

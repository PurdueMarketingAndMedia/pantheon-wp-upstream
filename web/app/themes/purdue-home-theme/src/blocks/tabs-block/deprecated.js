import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";

const v1 = {
	supports: {
		html: false,
		className: false,
		anchor: true
	},
	"attributes": {
		"numTabs": {
			"type": "number",
			"default": 0
		},
		"heading": {
			"type": "string",
			"default": "I want to learn about"
		},
		"headers": {
			"type": "array",
			"default": []
		},
		"background": {
			"type": "string",
			"default": "black"
		},
		"role": {
			"type": "string",
			"default": ""
		},
		"addHeader": {
			"type": "boolean",
			"default": true
		}
	},
	save: ( props ) => {
		const { attributes } = props;

		const blockProps = useBlockProps.save({
			className: "purdue-home-tabs",
		});

		return (
			<div { ...blockProps }>
				<div className="section has-padding-top-large has-padding-bottom-large">
					<div className="container">
						<div className="columns">
							<div className="column is-5">
								<div className="arrow" />

								{ attributes.addHeader ? (
									<RichText.Content
										className="tagged-header tagged-header--gold"
										tagName="h2"
										value={ attributes.heading }
									/>
								) : null }

								<div className="purdue-home-tabs__headers" role="tablist">
									{ attributes.headers?.length
										? attributes.headers.map( ( header ) => (
											<button
												key={ header.id }
												id={ `header-${ header.id }` }
												className={ `purdue-home-tabs__header${ header.active ? " active" : "" }` }
												role="tab"
												aria-controls={ `panel-${ header.id }` }
												aria-selected={ header.active ? "true" : "false" }
											>
												<RichText.Content
													tagName="h3"
													value={ header.text }
													className="purdue-home-tabs__header-text"
												/>
											</button>
										) )
										: null }
								</div>
							</div>

							<div className="column is-7">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default [v1];
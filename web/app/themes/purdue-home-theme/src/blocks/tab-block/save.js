import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const save = ( props ) => {
    const { attributes } = props;

    const blockProps = useBlockProps.save({
        className: `purdue-home-tabs__panel${
            attributes.editorSelected ? " active" : ""
        }`,
        id: `panel-${attributes.aria}`,
        "aria-labelledby": `header-${attributes.aria}`,
        "role": "tabpanel",
        "tabindex": 0,
        ...(attributes.anchorId && { "data-name": attributes.anchorId }),
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
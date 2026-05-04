import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, InspectorControls,useBlockProps } from "@wordpress/block-editor";
import metadata from './block.json';
import edit from './edit';
import icon from './icon';

registerBlockType( metadata.name, {
  icon: icon,
  edit: edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} )


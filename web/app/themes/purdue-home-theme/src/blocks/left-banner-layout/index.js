import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor"
import "./style.scss";
import edit from './edit';
import metadata from './block.json';


registerBlockType( metadata.name, {
  edit:edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} )


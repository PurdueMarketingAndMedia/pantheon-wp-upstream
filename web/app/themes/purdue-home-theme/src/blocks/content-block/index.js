import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import edit from "./edit";
import "./style.scss";
import icon from './icon.js';
import metadata from './block.json';
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];

registerBlockType( metadata.name, {
  icon: icon,
	edit: edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} );

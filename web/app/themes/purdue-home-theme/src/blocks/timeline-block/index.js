import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

import edit from './edit';
import metadata from './block.json';
import './style.scss';
import icon from './icon';

registerBlockType( metadata.name, {
  icon: icon,
  edit:edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} );

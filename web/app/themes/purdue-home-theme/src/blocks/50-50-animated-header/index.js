import { registerBlockType } from '@wordpress/blocks'; 
import edit from './edit';
import { InnerBlocks } from '@wordpress/block-editor';
import './style.scss';
import icon from './icon';
import metadata from './block.json';

registerBlockType( metadata.name, {
  icon:icon,
	edit:edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} );

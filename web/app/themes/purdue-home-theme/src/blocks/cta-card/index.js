import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import metadata from './block.json';
import edit from './edit';
import { InnerBlocks } from '@wordpress/block-editor';
import icon from './icon';

registerBlockType( metadata.name, {
  icon: icon,
	edit: edit,
  save: () => {
    return <InnerBlocks.Content />;
  },
} );

import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import icon from './icon';
import './style.scss';

registerBlockType( metadata.name, {
  icon: icon,
	edit: edit,
  save: () => {
    return <InnerBlocks.Content />;
  }
});

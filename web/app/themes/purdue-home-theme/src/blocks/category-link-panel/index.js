import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
import './style.scss';

registerBlockType( metadata.name, {
	icon: icon,
	edit: edit,
	save: () => null,
} );

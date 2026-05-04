
import { registerBlockType } from '@wordpress/blocks'; 
import './style.scss';
import edit from './edit';
import metadata from './block.json';
import icon from './icon';

registerBlockType( metadata.name, {
  icon: icon,
  edit:edit,
} );

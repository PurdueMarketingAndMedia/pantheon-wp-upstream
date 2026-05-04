import { registerBlockType } from "@wordpress/blocks";
import './style.scss';
import metadata from './block.json';
import edit from './edit';
import icon from './icon';

registerBlockType( metadata.name, {
  icon: icon,
  edit: edit,
});

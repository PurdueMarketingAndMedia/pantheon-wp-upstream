import { registerBlockType } from "@wordpress/blocks"; 
import edit from './edit';
import metadata from './block.json';
import './style.scss';
import icon from './icon.js';
registerBlockType( metadata.name, {
    icon: icon,
    edit: edit
})
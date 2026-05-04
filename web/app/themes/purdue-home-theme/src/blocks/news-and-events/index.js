import { registerBlockType } from "@wordpress/blocks";
import edit from './edit';
import "./style.scss";
import metadata from "./block.json";
import icon from './icon';

registerBlockType( metadata.name, {
	icon: icon,
	edit: edit,
} );

import { registerBlockType } from "@wordpress/blocks";
import edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';
import icon from './icon';
//import deprecated from "./deprecated";

registerBlockType(metadata.name, {
  icon: icon, 
  edit:edit,
  save:save,
 // deprecated
});


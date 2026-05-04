import { registerBlockType } from "@wordpress/blocks";
import save from './save';
import edit from './edit';
import metadata from './block.json';
import deprecated from './deprecated';

registerBlockType( metadata.name, {
  save: save,
  edit: edit,
  deprecated,
});

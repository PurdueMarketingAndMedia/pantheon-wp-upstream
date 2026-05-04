import { __ } from  "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import Edit from './edit';
import "./style.scss";
import metadata from "./block.json";
import icon from "./icon.js";

registerBlockType( metadata.name, {
    icon: icon,
    edit: ( props ) => {
        return <Edit { ...props } />;
    },
    save: () => {
        return <InnerBlocks.Content />;
    },
})

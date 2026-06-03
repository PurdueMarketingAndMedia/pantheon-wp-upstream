import {
    PanelRow,
    CheckboxControl,
    TextControl
} from '@wordpress/components';



const LinkPanelControl = ({
    item = {},
    onLinkTextChange = () => {},
    onLinkURLChange = () => {},
    onExternalChange = () => {},
    onAiraLabelChange = () => {},
    onButtonCSSChange = () => {},
}) => {
    return (
        <>
            <PanelRow>
                <TextControl
                    label="Link Text"
                    value={item.linkText}
                    onChange={(val) => onLinkTextChange(val)}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={'Link URL'}
                    type="url"
                    onChange={(val) => {
                        onLinkURLChange(val);
                    }}
                    value={item.linkURL}
                />
            </PanelRow>
            <PanelRow>
                <CheckboxControl
                    label="Open link in new tab?"
                    checked={item.external}
                    onChange={() => {
                        onExternalChange();
                    }}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={"ARIA Label for Link"}
                    onChange={(val) => {
                        onAiraLabelChange(val);
                    }}
                    value={item.ariaLabel}
                    help="Provide an accessible label for the link. Defaults to the Link Text if left empty."

                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label="Button CSS class(es)"
                    value={item.buttonCSS}
                    onChange={(css) => {
                        onButtonCSSChange(css);
                    }}
                />
            </PanelRow>
        </>
    );
};

export default LinkPanelControl;
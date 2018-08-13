import React from  "react";
import Immutable from "immutable";
import Draft, {getDefaultKeyBinding, KeyBindingUtil} from "draft-js";
import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils";

export const BLOCK_TYPES = [
    {label: "citation", style: "blockquote"},
    {label: "properties", style: "unordered-list-item"},
    {label: "numbered-list", style: "ordered-list-item"},
    {label: "code-block", style: 'code'},
];
export const BLOCK_TYPE_HEADINGS = [
    {label: "H1", style: "header-one"},
    {label: "H2", style: "header-two"},
    {label: "H3", style: "header-three"},
    {label: "H4", style: "header-four"},
    {label: "H5", style: "header-five"},
    {label: "H6", style: "header-six"},
];
export const FONT_SIZE = [
    {label: "10", style: "font-10"},
    {label: "12", style: "font-12"},
    {label: "14", style: "font-14"},
    {label: "18", style: "font-18"},
    {label: "22", style: "font-22"},
    {label: "28", style: "font-28"},
    {label: "36", style: "font-36"},
    {label: "44", style: "font-44"},
    {label: "56", style: "font-56"},
    {label: "72", style: "font-72"},
];

export const customStyleMap = {
    // Font-Sizes
    "font-10": {fontSize: "10px"},
    "font-12": {fontSize: "12px"},
    "font-14": {fontSize: "14px"},
    "font-18": {fontSize: "18px"},
    "font-22": {fontSize: "22px"},
    "font-28": {fontSize: "28px"},
    "font-36": {fontSize: "36px"},
    "font-44": {fontSize: "44px"},
    "font-56": {fontSize: "56px"},
    "font-72": {fontSize: "72px"},
    // Text Highlighting
    "HIGHLIGHT": {backgroundColor: "yellow"}
};

export const IMAGE = (props) => {
    if (!!props.src) {
        return <img src={props.src} style={{maxWidth: "1000px", maxHeight: "800px"}}/>;
    }
    return null;
};

export const MEDIA = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === "image") {
        media = <IMAGE src={src} />;
    }

    return media;
};

export const getBlockStyle = (block) => {
    const textAlignStyle = block.getData().get(ALIGNMENT_DATA_KEY);
    const otherStyle = block.getType();
    if (textAlignStyle !== undefined) {
        switch (textAlignStyle) {
            case "LEFT":
                return 'align-left';
            case "CENTER":
                return 'align-center';
            case "RIGHT":
                return 'align-right';
            case "JUSTIFY":
                return 'align-justify';
            default:
                return null;
        }
    }
    // Any other styling types...
    switch (otherStyle) {
        case "code":
            return "code";
        default:
            return null;
    }
};

export const getBlockMap = () => {
    const extended_map = Immutable.Map({
        'code': {
            element: 'div',
        },
    });
    return Draft.DefaultDraftBlockRenderMap.merge(extended_map);
};

export const customKeyBindingFn = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75 /*K*/) {
        return "add-hyperlink";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 66 /*B*/) {
        return "bold-text";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 73 /*I*/) {
        return "italicize-text";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 85 /*U*/) {
        return "underline-text";
    }
    return getDefaultKeyBinding(event);
};

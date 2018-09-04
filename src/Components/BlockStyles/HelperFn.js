import React, {Component} from "react";
import Immutable from "immutable";
import Draft, {getDefaultKeyBinding, KeyBindingUtil} from "draft-js";

import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils";
import interact from 'interactjs';
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

export class IMAGE extends Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
    }

    componentDidMount() {
        this.interactable = interact(this.element.current);
        this.interactable
            .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            // keep the edges inside the parent
            restrictEdges: {
                outer: 'parent',
                endOnly: true,
            },

            // minimum size
            restrictSize: {
                min: { width: 100, height: 50 },
            },

            inertia: true,
        })
        .on('resizemove', (event) => {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        });
    }

    render() {
        return(
            <img ref={this.element} src={this.props.src} style={{width: "700px", boxSizing: "border-box"}}/>
        );
    }
};

export const MEDIA = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;

    if (type === "image") {
        return(<IMAGE src={src} />);
    }
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

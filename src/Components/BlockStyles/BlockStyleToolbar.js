import React, {Component} from "react";
import Draft from "draft-js";
import Immutable from "immutable";
import {ButtonGroup} from "@blueprintjs/core";

import BlockStyleButton from "./BlockStyleButton.js";
import HeaderStyleDropdown from "./HeaderStyleDropdown.js";
import FontSizeStyleDropdown from "./FontSizeStyleDropdown.js";

import {ALIGNMENT_DATA_KEY} from "./ExtendedRichUtils.js";

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
};

export function getBlockStyle(block) {
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
    switch (block.getType()) {
        case "code":
            return "code";
        default:
            return null;
    }
}

export function getBlockMap() {
    const extended_map = Immutable.Map({
        'code': {
            element: 'pre',
        },
    });
    return Draft.DefaultDraftBlockRenderMap.merge(extended_map);
}

export default class BlockStyleToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: null,
            onToggle: null,
        }
    }

    componentWillMount() {
        this.setState({editorState: this.props.editorState}, () => {
            this.selection = this.state.editorState.getSelection();
            this.blockType =
                this.state.editorState
                    .getCurrentContent()
                    .getBlockForKey(this.selection.getStartKey())
                    .getType();
        });
        this.setState({onToggle: this.props.onToggle});
    }

    render() {
        return (
            <div>
                <span className="RichEditor-controls">
                    <HeaderStyleDropdown
                        headerOptions={BLOCK_TYPE_HEADINGS}
                        active={this.blockType}
                        onToggle={this.state.onToggle}
                    />
                    <FontSizeStyleDropdown
                        fontSizeOptions={FONT_SIZE}
                        active={this.blockType}
                        onToggle={this.props.onToggleFontSize}
                    />
                    {BLOCK_TYPES.map((type) => {
                        return (
                            <BlockStyleButton
                                active={type.style === this.blockType}
                                label={type.label}
                                onToggle={this.state.onToggle}
                                style={type.style}
                                key={type.label}
                                type={type}
                            />
                        );
                    })}
                </span>
            </div>
        );
    }
}
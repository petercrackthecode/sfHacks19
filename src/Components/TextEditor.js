import React, {Component} from 'react';

import {Button, ButtonGroup} from "@blueprintjs/core";
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';

import BlockStyleToolbar, { getBlockStyle, getBlockMap, customStyleMap } from "./BlockStyles/BlockStyleToolbar.js";
import ExtendedRichUtils from "./BlockStyles/ExtendedRichUtils.js";

import '../CSS/text-editor.css';
import '../CSS/custom-block-style.css';

export default class TextEditor extends Component {
	constructor(props) {
		super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
	}

    onChange = (editorState) => {
        this.setState({editorState: editorState});
    };

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    handleBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    };
    handleItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    };
    handleUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    };
    handleAlignLeftClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, 'LEFT'));
    };
    handleAlignCenterClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, 'CENTER'));
    };
    handleAlignRightClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, 'RIGHT'));
    };
    handleAlignJustifyClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, 'JUSTIFY'));
    };

    handleTab = (e) => {
        e.preventDefault();

        let currentState = this.state.editorState;
        let newContentState = Modifier.replaceText(
            currentState.getCurrentContent(),
            currentState.getSelection(),
            "    "
        );

        this.setState({
            editorState: EditorState.push(currentState, newContentState, 'insert-characters')
        });
    };

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    toggleBlockFontSize = (inlineStyle) => {
        console.log(inlineStyle);
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    };

    render() {
        return(
            <div className="text-editor">
                <div className="text-editor-button-div">
                    <ButtonGroup>
                        <Button className="bp3-icon-bold bp3-large" tabIndex="-1" onClick={this.handleBoldClick}/>
                        <Button className="bp3-icon-italic bp3-large" tabIndex="-1" onClick={this.handleItalicClick}/>
                        <Button className="bp3-icon-underline bp3-large" tabIndex="-1" onClick={this.handleUnderlineClick}/>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button className="bp3-icon-align-left bp3-large" tabIndex="-1" onClick={this.handleAlignLeftClick}/>
                        <Button className="bp3-icon-align-center bp3-large" tabIndex="-1" onClick={this.handleAlignCenterClick}/>
                        <Button className="bp3-icon-align-right bp3-large" tabIndex="-1" onClick={this.handleAlignRightClick}/>
                        <Button className="bp3-icon-align-justify bp3-large" tabIndex="-1" onClick={this.handleAlignJustifyClick}/>
                    </ButtonGroup>
                </div>
                <div className="text-editor-block-style">
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                        onToggleFontSize={this.toggleBlockFontSize}
                    />
                </div>
                <div className="text-editor-content-div">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        blockStyleFn={getBlockStyle}
                        blockRenderMap={getBlockMap()}
                        onTab={this.handleTab}
                        customStyleMap={customStyleMap}
                    />
                </div>
            </div>
        );
    }
}
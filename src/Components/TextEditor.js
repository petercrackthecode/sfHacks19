import React, {Component} from "react";

import {Button, ButtonGroup, Overlay, Collapse} from "@blueprintjs/core";
import {Card, Tab, Tabs} from "@blueprintjs/core";
import {Editor, EditorState, RichUtils, AtomicBlockUtils, Modifier, convertToRaw, convertFromRaw} from "draft-js";

import SiteMediaBrowser from "./SiteMediaManager/SiteMediaBrowser.js";
import GoogleImageBrowser from "./SiteMediaManager/GoogleImageBrowser.js";

import BlockStyleToolbar from "./BlockStyles/BlockStyleToolbar.js";
import ExtendedRichUtils from "./BlockStyles/ExtendedRichUtils.js";
import {customBlockRenderer} from "./BlockStyles/entities/CustomBlockRenderer.js";
import {hyperlinkDecorator} from "./BlockStyles/plugins/HyperLinkPlugin.js";

import {customStyleMap,
        getBlockStyle,
        customKeyBindingFn,
        EMOJI} from "./BlockStyles/HelperFn.js";

import {EmoteList} from "../Constants/constants";

import "../CSS/text-editor.css";
import "../CSS/custom-block-style.css";

export default class TextEditor extends Component {
	constructor(props) {
		super(props);
        this.state = {
            title: "",
            editorState: EditorState.createEmpty(),
            addMediaOverlay: false,
            addEmojiOverlay: false,
        };
	}

	componentWillMount() {
	    if (this.props.renderContent !== undefined) {
            this.setState({title: this.props.renderContent.title});
            const content = convertFromRaw(JSON.parse(this.props.renderContent.data.content));
            this.setState({editorState: EditorState.createWithContent(content)});
        }
    }

    onChange = (editorState) => {
        this.setState({editorState: editorState});
    };

    handleKeyCommand = (command) => {
        if (command === "add-hyperlink") {
            this.handleHyperLinkClick();
            return "handled";
        }
        if (command === "bold-text") {
            this.handleBoldClick();
            return "handled";
        }
        if (command === "italicize-text") {
            this.handleItalicClick();
            return "handled";
        }
        if (command === "underline-text") {
            this.handleUnderlineClick();
            return "handled";
        }
        console.log(command + " not-handled");
        return "not-handled";
    };

    handleBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };
    handleItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));
    };
    handleUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"));
    };
    handleHighlightClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT"));
    };
    handleAlignLeftClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, "LEFT"));
    };
    handleAlignCenterClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, "CENTER"));
    };
    handleAlignRightClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, "RIGHT"));
    };
    handleAlignJustifyClick = () => {
        this.onChange(ExtendedRichUtils.toggleAlignment(this.state.editorState, "JUSTIFY"));
    };
    handleHyperLinkClick = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: link });
        let newEditorState = EditorState.createEmpty(hyperlinkDecorator);
        newEditorState = EditorState.push(newEditorState, contentStateWithEntity, "create-entity");
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    };

    renderAddMediaOverlay = () => {
        return(
            <Overlay
                     isOpen={this.state.addMediaOverlay}
                     onClose={() => this.setState({addMediaOverlay: false})}>
                <Card className="add-media-manager">
                    <Button className="bp3-minimal bp3-large bp3-intent-danger close-button" onClick={() => this.setState({addMediaOverlay: false})}>
                        <span className="bp3-icon-large bp3-icon-cross"/>
                    </Button>
                    <Tabs id="AddSiteMedia" defaultSelectedTabId="site-media-browser" large={true}>
                        <Tab id="site-media-browser" title="From Site" panel={<SiteMediaBrowser embed={this.insertMedia}/>}/>
                        <Tab id="google-image" title="From Google Image" panel={<GoogleImageBrowser embed={this.insertMedia}/>} />
                        <Tabs.Expander />
                    </Tabs>
                </Card>
            </Overlay>
        );
    };

    insertMedia = (url) => {
        this.setState({addMediaOverlay: false});

        const editorState = this.state.editorState;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.push(
            editorState,
            { currentContent: contentStateWithEntity },
            "insert-fragment"
        );
        this.setState({editorState: AtomicBlockUtils.insertAtomicBlock(
                                        newEditorState,
                                        entityKey,
                                        " ")});
    };

    insertEmoji = (emote) => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) return;
        const contentState = editorState.getCurrentContent();
        const newContentState = Modifier.insertText(contentState, selection, emote);
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
        this.onChange(newEditorState);
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
            editorState: EditorState.push(currentState, newContentState, "insert-characters")
        });
    };

    toggleBlockType = (blockType) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    toggleBlockFontSize = (inlineStyle) => {
        console.log(inlineStyle);
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    };

    onSavePublish = () => {
        let contentState = this.state.editorState.getCurrentContent();
        if (contentState.getPlainText().trim() === "") return;

        const data = convertToRaw(contentState);
        this.props.savePublish({"title": this.state.title, "data": data});
    };

    onSaveDraft = () => {
        let contentState = this.state.editorState.getCurrentContent();
        if (contentState.getPlainText().trim() === "") return;

        const data = convertToRaw(contentState);
        this.props.saveDraft({"title": this.state.title, "data": data});
    };

    render() {
        return(
            <div className="text-editor">
                <div className="text-editor-button-div">
                    <ButtonGroup>
                        <Button className="bp3-icon-bold bp3-large" tabIndex="-1" onClick={this.handleBoldClick}/>
                        <Button className="bp3-icon-italic bp3-large" tabIndex="-1" onClick={this.handleItalicClick}/>
                        <Button className="bp3-icon-underline bp3-large" tabIndex="-1" onClick={this.handleUnderlineClick}/>
                        <Button className="bp3-icon-highlight bp3-large" tabIndex="-1" onClick={this.handleHighlightClick}/>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button className="bp3-icon-align-left bp3-large" tabIndex="-1" onClick={this.handleAlignLeftClick}/>
                        <Button className="bp3-icon-align-center bp3-large" tabIndex="-1" onClick={this.handleAlignCenterClick}/>
                        <Button className="bp3-icon-align-right bp3-large" tabIndex="-1" onClick={this.handleAlignRightClick}/>
                        <Button className="bp3-icon-align-justify bp3-large" tabIndex="-1" onClick={this.handleAlignJustifyClick}/>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button className="bp3-icon-link bp3-large" tabIndex="-1" onClick={this.handleHyperLinkClick}/>
                        <Button className="bp3-icon-media bp3-large" tabIndex="-1" onClick={() => this.setState({addMediaOverlay: true})}/>
                        <Button className="bp3-large" tabIndex="-1" onClick={() => this.setState({addEmojiOverlay: !this.state.addEmojiOverlay})}>
                            <span role="img" aria-label="lmao">😎</span>
                        </Button>
                    </ButtonGroup>
                </div>
                <Collapse isOpen={this.state.addEmojiOverlay}>
                    <div className="emotes-browser">
                        {
                            EmoteList.map(emote => {
                                return ( <EMOJI key={emote} symbol={emote} handleEmojiClick={this.insertEmoji}/> );
                            })
                        }
                    </div>
                </Collapse>
                <div className="text-editor-block-style">
                    <BlockStyleToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                        onToggleFontSize={this.toggleBlockFontSize}
                    />
                </div>
                <div className="text-editor-title-div">
                    <textarea className="bp3-input bp3-fill"
                              placeholder="Your title goes here..."
                              draggable={false}
                              onChange={(e) => this.setState({title: e.target.value})}
                              defaultValue={this.state.title}/>
                </div>
                <div className="text-editor-content-div">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        blockStyleFn={getBlockStyle}
                        blockRendererFn={customBlockRenderer}
                        onTab={this.handleTab}
                        customStyleMap={customStyleMap}
                        keyBindingFn={customKeyBindingFn}
                        placeholder="Your great post begins here..."
                    />
                </div>
                <div className="text-editor-save">
                    {
                        this.props.saveDraft
                            ? <Button className="bp3-large" text="Save as Draft" onClick={this.onSaveDraft}/>
                            : null
                    }
                    {
                        this.props.savePublish
                            ? <Button className="bp3-large" text="Save and Publish" onClick={this.onSavePublish}/>
                            : null
                    }
                </div>

                { this.state.addMediaOverlay ? this.renderAddMediaOverlay() : null }
            </div>
        );
    }
}
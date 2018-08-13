import React from "react";
import {CompositeDecorator, EditorState, RichUtils} from "draft-js";

const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
};

const Link = (props) => {
    const {contentState, entityKey} = props;
    const {url} = contentState.getEntity(entityKey).getData();
    return (
        <a
            className="link"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={url}
        >{props.children}</a>
    );
};

export const hyperlinkDecorator = new CompositeDecorator([
    {
        strategy: linkStrategy,
        component: Link,
    }
]);

export const handleKeyCommand = (command, editorState, {getEditorState, setEditorState}) => {
    if (command !== 'add-link') {
        return 'not-handled';
    }
    let link = window.prompt('Paste the link -');
    const selection = editorState.getSelection();
    if (!link) {
        setEditorState(RichUtils.toggleLink(editorState, selection, null));
        return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {url: link});
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return 'handled';
};

import React, {Component} from 'react';
import {Spinner} from "@blueprintjs/core";
import firebase from "./firebase.js";

import {Editor, EditorState, convertFromRaw} from "draft-js";
import {mediaBlockRenderer} from "./BlockStyles/entities/MediaBlockRenderer.js";
import {hyperlinkDecorator} from "./BlockStyles/plugins/HyperLinkPlugin.js";

import {customStyleMap,
    getBlockStyle,
    getBlockMap} from "./BlockStyles/HelperFn.js";

import "../CSS/blog.css";
import "../CSS/custom-block-style.css";

export default class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    content: "",
            editorState: EditorState.createEmpty(),
        };
	}

	componentDidMount() {
	    setTimeout(() => {
            this.getBlogContent();
        }, 500);
    }

    getBlogContent = () => {
	    const id = this.props.match.params.id;
	    if (id === undefined) return;
	    const blogRef = firebase.database().ref("blogs/" + id);
	    blogRef.on("value", (snapshot) => {
	        const blog_data = snapshot.val();
	        console.log(blog_data.data.content);
	        this.setState({content: blog_data.data.content}, () => {
                const newEditor = EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content)), hyperlinkDecorator);
                this.setState({editorState: newEditor});
            });
        });
    };

    renderBlogContent = () => {
        return(
            <div className="blog-content">
                {
                    this.state.content === ""
                        ? <Spinner />
                        : <Editor
                            editorState={this.state.editorState}
                            blockStyleFn={getBlockStyle}
                            blockRendererFn={mediaBlockRenderer}
                            blockRenderMap={getBlockMap()}
                            customStyleMap={customStyleMap}
                            readOnly={true}
                        />
                }
            </div>
        );
    };

    renderBlogBrowser = () => {
        return(
            <div className="blog-browser">

            </div>
        );
    };

	render() {
		return(
			<div className="blog">
                { this.props.match.params.id === undefined ? this.renderBlogBrowser() : this.renderBlogContent()}
            </div>
		);
	}
}
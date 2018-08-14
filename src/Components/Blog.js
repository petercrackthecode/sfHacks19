import React, {Component} from 'react';
import firebase from "./firebase.js";

import {Editor, EditorState, RichUtils, AtomicBlockUtils, Modifier, KeyBindingUtil, convertToRaw, convertFromRaw} from "draft-js";

import "../CSS/blog.css";

export default class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    content: "",
            editorState: EditorState.createEmpty(),
        };
	}

	componentWillMount() {
		this.getBlogContent();
    }

    getBlogContent = () => {
	    const id = this.props.match.params.id;
	    if (id === undefined) return;
	    const blogRef = firebase.database().ref("blogs/" + id);
	    blogRef.on("value", (snapshot) => {
	        const blog_data = snapshot.val();
	        this.setState({content: blog_data.data.content.slice(1, -1)}, () => {
                const newEditor = EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.content)));
                this.setState({editorState: newEditor});
            });
        });
    };

    renderBlogContent = () => {
        return(
            <div className="blog-content">
                <Editor
                    editorState={this.state.editorState}
                    readOnly={true}
                />
            </div>
        );
    };

    renderBlogBrowser = () => {
        return(
            <div></div>
        );
    };

	render() {
		return(
			<div className="blog">
                <div>
                    {this.props.match.params.id}
                    {this.props.match.params.title}
                </div>
                { this.props.match.params.id === undefined ? this.renderBlogBrowser() : this.renderBlogContent()}
            </div>
		);
	}
}
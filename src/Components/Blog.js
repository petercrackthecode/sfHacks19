import React, {Component} from 'react';
import {Spinner, Card} from "@blueprintjs/core";
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
            blog_list: [],
        };
	}

	componentDidMount() {
        const id = this.props.match.params.id;
	    setTimeout(() => {
	        if (id)
                this.getBlogContent();
	        else
	            this.getBlogs();
        }, 500);
    }

    getBlogs = (endAt) => {
        const blogRef = firebase.database().ref("blogs");
	    if (endAt){
            blogRef.orderByKey().endAt(endAt).limitToLast(10).on("value", (snapshot) => {
                const query_result = snapshot.val();
                const result = [];
                for (let i in query_result) {
                    if (i === "sequence") continue;
                    result.push(query_result[i]);
                }
                result.reverse();
                this.setState({blog_list: result});
            });
        } else {
            blogRef.orderByKey().limitToLast(10).on("value", (snapshot) => {
                const query_result = snapshot.val();
                const result = [];
                for (let i in query_result) {
                    if (i === "sequence") continue;
                    result.push(query_result[i]);
                }
                result.reverse();
                this.setState({blog_list: result});
            });
        }
    };

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

    renderBlogCards = (blog) => {
        return(
            <div key={blog.id} style={{display: "inline-block", width: "50%", padding: "20px"}}>
                <Card>
                    <div id={blog.id + "cover_img"}>
                        <img src={blog.cover_img} style={{width: "100%"}}/>
                    </div>
                    <div id={blog.id + "author"}>
                        <h3>Người viết: {blog.author}</h3>
                    </div>
                    <div id={blog.id + "title"}>
                        <h1>{blog.title}</h1>
                    </div>
                    <div id={blog.id + "sneakpeak"}>
                        <p>{blog.title}</p>
                    </div>
                </Card>
            </div>
        );
    };

    renderBlogBrowser = () => {
        return(
            <div className="blog-browser">
                {this.state.blog_list.map(this.renderBlogCards)}
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
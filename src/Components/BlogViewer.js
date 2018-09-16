import React, {Component} from 'react';
import {Spinner, Icon, Button} from "@blueprintjs/core";
import firebase from "./firebase.js";

import {Editor, EditorState, convertFromRaw} from "draft-js";
import {customBlockRenderer} from "./BlockStyles/entities/CustomBlockRenderer.js";
import {hyperlinkDecorator} from "./BlockStyles/plugins/HyperLinkPlugin.js";

import {customStyleMap,
    getBlockStyle} from "./BlockStyles/HelperFn.js";

import "../CSS/blog-viewer.css";
import "../CSS/custom-block-style.css";

export default class BlogViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    blog: {},
            author: {},
            editorState: EditorState.createEmpty(),
        };
	}

	componentDidMount() {
	    setTimeout(() => {
            this.getBlogContent().then(() => {
                this.updateBlogView();
                this.getBlogAuthor();
            });
        }, 500);
    }

    getBlogContent = () => {
	    const id = this.props.match.params.id;
	    if (id === undefined) return;
	    const blogRef = firebase.database().ref("blogs/" + id);
	    return new Promise((resolve) => {
            blogRef.on("value", (snapshot) => {
                this.setState({blog: snapshot.val()}, () => {
                    const newEditor = EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.blog.data.content)), hyperlinkDecorator);
                    this.setState({editorState: newEditor}, () => {return resolve()});
                });
            });
        });
    };

    getBlogAuthor = () => {
        const userRef = firebase.database().ref("user_metadata/" + this.state.blog.author);
        userRef.on("value", snapshot => {
            this.setState({author: snapshot.val()});
        });
    };

    updateBlogView = () => {
        const id = this.props.match.params.id;
        if (id === undefined) return;
        const blogDataRef = firebase.database().ref("blogs/" + id + "/data/views");
        blogDataRef.transaction(view => {
            view += 1;
            return view;
        });
    };

    blogActionLike = () => {
        const id = this.props.match.params.id;
        if (id === undefined) return;
        const blogDataRef = firebase.database().ref("blogs/" + id + "/data/likes");
        blogDataRef.transaction(like => {
            like += 1;
            return like;
        });
    };

    redirectToAuthorPage = () => {
        window.location.href = "/user/" + this.state.blog.author + "/@" + this.state.author.display_name;
    };

    renderBlogContent = () => {
        return(
            this.state.content === ""
                ? <div className="blog-content bp3-skeleton"/>
                : <div className="blog-content">
                    <div className="author-info-wrapper">
                        <div className="author-info bp3-card bp3-interactive bp3-elevation-2" onClick={this.redirectToAuthorPage}>
                            <div className="profile-pic">
                                <img className="bp3-skeleton" src={this.state.author.profile_pic}/>
                            </div>
                            <div className="summary-info">
                                <div><h4>{this.state.author.pseudonym}</h4></div>
                                <div><p>{this.state.author.introduction}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="title">
                            {this.state.blog.title}
                        </div>
                        <Editor
                            editorState={this.state.editorState}
                            blockStyleFn={getBlockStyle}
                            blockRendererFn={customBlockRenderer}
                            customStyleMap={customStyleMap}
                            readOnly={true}
                        />
                    </div>
                </div>
        );
    };

    renderBlogActionBar = () => {
        return(
            <div className="blog-action-bar-vertical">
                <div className="likes">
                    {
                        this.state.blog.data === undefined
                            ? <div className="bp3-skeleton" />
                            : this.state.blog.data.likes
                    }
                </div>
                <div className="likes-button">
                    <Button className="bp3-large bp3-minimal">
                        <Icon icon="heart" iconSize={30} />
                    </Button>
                </div>
                <div className="fb-share-button">
                    <Button className="bp3-small bp3-icon-share bp3-minimal"/>
                </div>
                <div className="bookmark-button">
                    <Button className="bp3-small bp3-icon-bookmark bp3-minimal"/>
                </div>
                <div className="cmt-button">
                    <Button className="bp3-small bp3-icon-comment bp3-minimal"/>
                </div>
            </div>
        );
    };

    renderBlogFooter = () => {
        return(
            <div className="blog-footer">
                <div style={{borderTop: "1px lightgrey solid"}}>
                    <h3>Thích những gì bạn vừa đọc?</h3>
                    <p>Hãy like post này để tất cả mọi người cũng được hưởng câu chuyện tuyệt vời này nhé!</p>
                </div>
                <div className="blog-action-bar-horizontal">
                    <div className="likes-button">
                        <Button className="bp3-large bp3-minimal" onClick={this.blogActionLike}>
                            <Icon icon="heart" iconSize={36} />
                        </Button>
                    </div>
                    <div className="likes">
                        {
                            this.state.blog.data === undefined
                                ? <div className="bp3-skeleton" />
                                : this.state.blog.data.likes
                        }
                    </div>
                    <div className="fb-share-button">
                        <Button className="bp3-large bp3-minimal">
                            <Icon icon="share" iconSize={20} />
                        </Button>
                    </div>
                    <div className="bookmark-button">
                        <Button className="bp3-large bp3-minimal">
                            <Icon icon="bookmark" iconSize={20} />
                        </Button>
                    </div>
                    <div className="cmt-button">
                        <Button className="bp3-large bp3-minimal">
                            <Icon icon="comment" iconSize={20} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

	render() {
		return(
			<div className="blog-viewer">
                { this.renderBlogContent() }
                { this.renderBlogActionBar() }
                { this.renderBlogFooter() }
            </div>
		);
	}
}
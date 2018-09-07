import React, {Component} from 'react';
import {convertFromRaw} from "draft-js";
import firebase from "./firebase.js";
import AppToaster from "./Toaster.js";
import TextEditor from "./TextEditor.js";
import {GetCurrentTime} from "../Helpers/HelperFn";

export default class CreateNewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createContentOverlay: false,
            addMediaOverlay: false,
            newBlog: {
                id: "",
                data : {
                    content: "",
                    likes: 0,
                    views: 0,
                    sneakpeak: "",
                },
                title: "",
                author: "",
                cover_img: "",
                thumbnail: "",
                createTimeStamp: 0,
            },
        };
    }

    componentWillMount() {
        setTimeout(() => {
            if (this.props.isLoggedIn !== undefined && !this.props.isLoggedIn) {
                window.location.href="/404";
            }
        }, 100)
    }

    savePostData = (content) => {
        return new Promise((resolve, reject) => {
            let content_images = Object.keys(content.data.entityMap).map(key => {
                return content.data.entityMap[key].type==="image" ? content.data.entityMap[key] : null;
            });
            let newBlog = this.state.newBlog;
            newBlog.createTimeStamp = GetCurrentTime("ms");
            newBlog.title = content.title;
            newBlog.author = this.props.uid;
            newBlog.data.content = JSON.stringify(content.data);
            newBlog.data.sneakpeak = convertFromRaw(content.data).getPlainText().slice(0, 160);
            if (content_images.length > 0) {
                newBlog.cover_img = content_images[0].data.src;
                newBlog.thumbnail = content_images[0].data.src;
            }
            console.log(newBlog);
            this.setState({newBlog: newBlog}, () => {
                resolve();
            });
        })
    };

    savePublish = (content) => {
        this.savePostData(content).then(() => {
            const blogRef = firebase.database().ref().child("blogs").push();
            const userBlogRef = firebase.database().ref().child("user_metadata/" + this.props.uid + "/blogs");
            let newBlog = this.state.newBlog;
            newBlog.id = blogRef.key;
            this.setState({newBlog: newBlog}, () => {
                blogRef.set(this.state.newBlog)
                    .then(() => {
                        userBlogRef.push({id: blogRef.key})
                            .then(() => {
                                AppToaster.show({message: "Lưu post mới thành công!", intent: "success"})
                            })
                            .catch((error) => {
                                AppToaster.show({message: "Lưu post mới thất bại. Lỗi: " + error.message, intent: "danger"})
                            });
                    })
                    .catch((error) => {
                        AppToaster.show({message: "Lưu post mới thất bại. Lỗi: " + error.message, intent: "danger"})
                    });
            });
        })
    };

    saveDraft = (content) => {
        this.savePostData(content).then(() => {
            const draftRef = firebase.database().ref().child("drafts").push();
            const userDraftRef = firebase.database().ref().child("user_metadata/" + this.props.uid + "/drafts");
            let newDraft = this.state.newBlog;
            newDraft.id = draftRef.key;
                this.setState({newBlog: newDraft}, () => {
                    draftRef.set(this.state.newBlog)
                        .then(() => {
                            userDraftRef.push({id: draftRef.key})
                                .then(() => {
                                    AppToaster.show({message: "Lưu bản draft thành công!", intent: "success"})
                                })
                                .catch((error) => {
                                    AppToaster.show({message: "Lưu bản draft thất bại. Lỗi: " + error.message, intent: "danger"})
                                });
                        })
                        .catch((error) => {
                            AppToaster.show({message: "Lưu bản draft thất bại. Lỗi: " + error.message, intent: "danger"})
                        });
                });
        });
    };

    render() {
        return(
            <div className="blog-cms-new-content">
                <TextEditor savePublish={this.savePublish} saveDraft={this.saveDraft}/>
            </div>
        );
    };
}
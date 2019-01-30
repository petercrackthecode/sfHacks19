import React, {Component} from "react";
import firebase from "./firebase.js";
import TextEditor from "./TextEditor";
import AppToaster from "./Toaster";
import {GetCurrentTime} from "../Helpers/HelperFn";
import {convertFromRaw} from "draft-js";

export default class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: {},
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.isLoggedIn !== undefined && !this.props.isLoggedIn) {
                window.location.href="/404";
            }
            this.isAuthorized().then((isAuthorized) => {
                if (isAuthorized === "authorized") {
                    this.getBlogContent()
                        .then(() => {
                            AppToaster.show({message: "Blog load thành công!", intent: "success"});
                        })
                        .catch(() => {
                            AppToaster.show({message: "Blog không tồn tại", intent: "danger"});
                            window.location.href="/404";
                        });
                } else {
                    window.location.href="/unauthorized";
                }
            })
        }, 500)
    }

    isAuthorized = () => {
        const id = this.props.match.params.id;
        const blogRef = firebase.database().ref("blogs/" + id);
        return new Promise((resolve, reject) => {
            blogRef.once("value", snapshot => {
                if (snapshot.val().author = this.props.uid) {
                    console.log("authorized");
                    return resolve("authorized");
                } else {
                    console.log("unauthorized");
                    return resolve("unauthorized");
                }
            });
        });
    };

    getBlogContent = () => {
        const id = this.props.match.params.id;
        const blogRef = firebase.database().ref("blogs/" + id);
        return new Promise((resolve, reject) => {
            blogRef.once("value", snapshot => {
                if (snapshot.val() == null) {
                    return reject();
                }
                this.setState({blog: snapshot.val()}, () => {return resolve()});
            });
        });
    };

    savePostData = (content) => {
        return new Promise((resolve, reject) => {
            let content_images = Object.keys(content.data.entityMap).map(key => {
                return content.data.entityMap[key].type==="image" ? content.data.entityMap[key] : null;
            });
            let blog = this.state.blog;
            blog.createTimeStamp = GetCurrentTime("ms");
            blog.title = content.title;
            blog.data.content = JSON.stringify(content.data);
            blog.data.sneakpeak = convertFromRaw(content.data).getPlainText().slice(0, 160);
            if (content_images.length > 0) {
                blog.cover_img = content_images[0].data.src;
                blog.thumbnail = content_images[0].data.src;
            }
            this.setState({blog: blog}, () => {
                resolve();
            });
        })
    };

    savePublish = (content) => {
        const id = this.props.match.params.id;
        this.savePostData(content).then(() => {
            const blogRef = firebase.database().ref("blogs/" + id);
            blogRef.update(this.state.blog)
                .then(() => {
                    AppToaster.show({message: "Update blog thành công!", intent: "success"});
                    window.location.href = "/user/settings/@" + this.props.user_metadata.display_name;
                })
                .catch((error) => {
                    AppToaster.show({message: "Update blog thất bại. Lỗi: " + error.message, intent: "danger"});
                });
        });
    };

    render() {
        return(
            <div className="edit-blog">
                {
                    Object.keys(this.state.blog).length > 0
                        ? <TextEditor renderContent={this.state.blog} savePublish={this.savePublish}/>
                        : null
                }
            </div>
        );
    }
}
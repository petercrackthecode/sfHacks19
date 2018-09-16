import React, {Component} from "react";
import firebase from "./firebase.js";
import {Card, Button, Collapse, Tag, Overlay} from "@blueprintjs/core";
import {WrappedUserProfilePic, WrappedUserAttribute} from "./HOC_EditUserInfo.js";
import FileDropUpload from "./FileDropUpload.js";
import "../CSS/account-settings.css"
import AppToaster from "./Toaster.js";
import resizeImage from "resize-image";
import slugify from "slugify";

export default class AccountViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBlogs: false,
            blogs: [],
            user: {},
        };
        this.blogRef = firebase.database().ref("blogs");
    }

    componentDidMount() {
        setTimeout(() => {

            this.getUserMetadata().then(() => {
                if (this.state.user.blogs) {
                    let temp = [];
                    Object.values(this.state.user.blogs).map(blogId => {
                        this.blogRef.orderByKey().equalTo(blogId.id).on("value", snapshot => {
                            if (snapshot.val() === null) return;
                            temp.push(Object.values(snapshot.val())[0]);
                            this.setState({blogs: temp});
                        });
                    });
                }
            }).catch(error => {
                AppToaster.show({ message: "Tài khoản không tồn tại", intent: "danger" });
                window.location.href = "/404";
            });
        }, 300)
    }

    getUserMetadata = () => {
        const id = this.props.match.params.id;
        const userRef = firebase.database().ref("user_metadata/" + id);
        return new Promise((resolve, reject) => {
            userRef.once("value", snapshot => {
                if (snapshot.val() !== null)
                    this.setState({user: snapshot.val()}, () => {return resolve()});
                else
                    return reject();
            }).catch(error => {return reject(error)});
        });
    };

    renderUserBlogs = (key) => {
        return(
            <li key={key.id}>
                <Card className="blog" interactive={true} elevation="two"
                      style={{position: "relative"}}
                      onClick={() => {window.location.href="/Blog/" + key.id + "/" + key.title}}>
                    <div className="blog-title">{key.title}</div>
                    <div className="blog-time-stamp">{new Date(key.createTimeStamp).toUTCString()}</div>
                    <div className="blog-sneakpeak"><p>{key.data.sneakpeak}</p></div>
                </Card>
            </li>
        );
    };

    render() {
        return (
            <div className="account-settings">
                <div className="profile_pic">

                    {
                        this.state.user.profile_pic == null || this.state.user.profile_pic === ""
                            ? <div className="bp3-skeleton"
                                style={{width: "128px", height: "128px", borderRadius: "50%", margin: "0 auto"}}/>
                            : <WrappedUserProfilePic src={this.state.user.profile_pic} alt={"profile_pic"}/>

                    }
                </div>
                <div className="user-identity">
                    {
                        this.state.user.display_name == null || this.state.user.display_name === ""
                            ? <div className="bp3-skeleton"
                               style={{width: "150px", height: "30px", margin: "0 auto"}}/>
                            : <h2>
                                <WrappedUserAttribute text={"@" + this.state.user.display_name}/>
                              </h2>
                    }
                    <h4>
                        <i>
                            <WrappedUserAttribute text={this.state.user.pseudonym}/>
                        </i>
                    </h4>
                </div>
                <div className="user-introduction">
                    {
                        this.state.user.introduction == null || this.state.user.introduction === ""
                            ? <WrappedUserAttribute text="I feel undefined..."/>
                            : <WrappedUserAttribute text={this.state.user.introduction}/>
                    }
                </div>
                <div className="user-stats">
                    <b>Your Stats:</b>
                    <Tag intent="primary">Posts: {this.state.user.posts}</Tag>
                    <Tag intent="success">Follower: {this.state.user.followers}</Tag>
                    <Tag intent="danger">Likes: {this.state.user.likes}</Tag>
                    <Tag intent="warning">Comments: {this.state.user.comments}</Tag>
                </div>
                <div className="user-blogs">
                    <div>
                        <Button onClick={() => this.setState({isShowBlogs: !this.state.isShowBlogs})}>
                            Show Your Published Posts
                            {
                                this.state.isShowBlogs
                                    ? <span className="bp3-icon-standard bp3-icon-chevron-down"/>
                                    : <span className="bp3-icon-standard bp3-icon-chevron-up"/>
                            }
                        </Button>
                    </div>
                    <Collapse isOpen={this.state.isShowBlogs} keepChildrenMounted={true}>
                        <ul>
                            {
                                this.state.blogs.length > 0
                                    ? this.state.blogs.map(this.renderUserBlogs)
                                    : null
                            }
                        </ul>
                    </Collapse>
                </div>
            </div>
        );
    };

    handleProfilePicUpload = (files) => {
        let error = "";
        if(files.length > 1)
            error = "Bạn chỉ có thể upload 1 file";
        const file = files[0];
        if (!file.type.includes("image"))
            error = "File này không phải file ảnh";
        if (file.size > 5242880)
            error = "File ảnh quá lớn! Bạn hãy chọn file ảnh dưới 5mb nhé!";
        if (error !== "") {
            AppToaster.show({ message: error, intent: "danger" });
            return;
        }
        this.resizeAndUploadImage(file).then(() => {
            AppToaster.show({ message: "Thay đổi ảnh đại diện thành công", intent: "success" });
            this.setState({isEditProfilePic: false}, () => window.location.reload());
        }).catch((error) => {
            AppToaster.show({ message: error, intent: "danger" });
        });
    };
}
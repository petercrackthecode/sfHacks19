import React, {Component} from "react";
import firebase from "../firebase.js";
import {Card, Button, Collapse, Tag, Overlay} from "@blueprintjs/core";
import {WrappedUserProfilePic, WrappedUserAttribute} from "../HOC_EditUserInfo.js";
import FileDropUpload from "../FileDropUpload.js";
import "../../CSS/account-settings.css"
import AppToaster from "../Toaster";
import slugify from "slugify/index";
import resizeImage from "resize-image";

export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDrafts: false,
            isShowBlogs: false,
            drafts: [],
            blogs: [],
            isShowEditProfilePic: false,
        };
        this.draftRef = firebase.database().ref("drafts");
        this.blogRef = firebase.database().ref("blogs");
    }

    componentDidMount() {
        let attempt = 0;
        const load = setInterval(() => {
            if (this.props.isLoggedIn !== undefined && !this.props.isLoggedIn) {
                window.location.href="/404";
            }

            if (attempt === 2) clearInterval(load);

            this.props.reloadUserMetadata();
            attempt += 1;
            if (this.props.user_metadata.drafts) {
                let temp = [];
                Object.values(this.props.user_metadata.drafts).map(draftId => {
                    this.draftRef.orderByKey().equalTo(draftId.id).on("value", snapshot => {
                        if (snapshot.val() === null) return;
                        temp.push(Object.values(snapshot.val())[0]);
                        this.setState({drafts: temp});
                    });
                });
            }

            if (this.props.user_metadata.blogs) {
                let temp = [];
                Object.values(this.props.user_metadata.blogs).map(blogId => {
                    this.blogRef.orderByKey().equalTo(blogId.id).on("value", snapshot => {
                        if (snapshot.val() === null) return;
                        temp.push(Object.values(snapshot.val())[0]);
                        this.setState({blogs: temp});
                    });
                });
            }
        }, 300)
    }

    resizeAndUploadImage = (file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        let data = null;
        img.onload = () => {
            let height = img.offsetWidth/128*img.offsetHeight;
            let width = 128;
            data = resizeImage.resize(img, width, height, resizeImage.JPEG);
            this.uploadMedia(file.name, data)
                .then(() => {
                    this.updateProfilePicDB();
                })
        };
    };

    uploadMedia = (fileName, data) => {
        const mediaRef = firebase.storage().ref().child("site/profile_pic/" + this.props.uid + ".jpeg");
        return new Promise ((resolve, reject) => {
            mediaRef.putString(data, 'data_url')
                .then((snapshot) => {
                    AppToaster.show({
                        message: "Ảnh tải lên hệ thống thành công!",
                        intent: 'success'
                    });
                    return resolve();
                })
                .catch((error) => {
                    AppToaster.show({
                        message: "Ảnh tải lên thất bại: " + error.message,
                        intent: "danger"
                    });
                    return reject();
                });
        });
    };

    updateProfilePicDB = () => {
        const userRef = firebase.database().ref("user_metadata/" + this.props.uid);
        userRef.update({
            profile_pic: "https://storage.googleapis.com/seeds-vietnam.appspot.com/site/profile_pic/" + this.props.uid + ".jpeg"
        });

    };

    handleProfilePicUpload = (files) => {
        let error = "";
        for (let file of files) {
            console.log(file);
            if (!file.type.includes("image")) {
                error = "File này không phải file ảnh";
                break;
            }
            if (file.size > 5242880) {
                error = "File ảnh quá lớn! Bạn hãy chọn file ảnh dưới 5mb nhé!";
                break;
            }
            console.log("resizing img");
            this.resizeAndUploadImage(file);
        }
        if (error !== "") {
            AppToaster.show({
                message: error,
                intent: "danger"
            });
        }
    };

    renderUserDrafts = (key) => {
        return(
            <li key={key.id}>
                <Card className="draft" interactive={true} elevation="two" onClick={() => {window.location.href="/editDraft/" + key.id}}>
                    <div className="draft-title">{key.title}</div>
                    <div className="draft-time-stamp">{new Date(key.createTimeStamp).toUTCString()}</div>
                    <div className="draft-sneakpeak"><p>{key.data.sneakpeak}</p></div>
                </Card>
            </li>
        );
    };

    renderUserBlogs = (key) => {
        return(
            <li key={key.id}>
                <Card className="blog" interactive={true} elevation="two" onClick={() => {window.location.href="/Blog/" + key.id + "/" + key.title}}>
                    <Button className="bp3-icon-edit bp3-minimal bp3-small"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => {window.location.href="/Blog/" + key.id}}/>
                    <div className="blog-title">{key.title}</div>
                    <div className="blog-time-stamp">{new Date(key.createTimeStamp).toUTCString()}</div>
                    <div className="blog-sneakpeak"><p>{key.data.sneakpeak}</p></div>
                </Card>
            </li>
        );
    };

    renderEditProfilePicOvelay = () => {
        return(
            <Overlay className="edit-profile-pic-overlay"
                     isOpen={this.state.isShowEditProfilePic}
                     onClose={() => this.setState({isShowEditProfilePic: false})}>
                <Card style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <Button className="bp3-icon-cross bp3-minimal bp3-intent-danger"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => this.setState({isShowEditProfilePic: false})}/>
                    <h3>Change your profile picture: </h3>
                    <FileDropUpload handleFileDrop={this.handleProfilePicUpload}/>
                </Card>
            </Overlay>
        );
    };

    render() {
        return (
            <div className="account-settings">
                <div className="profile_pic">

                    {
                        this.props.user_metadata.profile_pic == null || this.props.user_metadata.profile_pic === ""
                            ? <div className="bp3-skeleton"
                                style={{width: "128px", height: "128px", borderRadius: "50%", margin: "0 auto"}}/>
                            : <WrappedUserProfilePic src={this.props.user_metadata.profile_pic} alt={"profile_pic"}
                                                     clickHandle={() => this.setState({isShowEditProfilePic: true})}/>

                    }
                </div>
                <div className="user-identity">
                    {
                        this.props.user_metadata.display_name == null || this.props.user_metadata.display_name === ""
                            ? <div className="bp3-skeleton"
                               style={{width: "150px", height: "30px", margin: "0 auto"}}/>
                            : <h2>
                                <WrappedUserAttribute text={"@" + this.props.user_metadata.display_name} clickHandle={this.editDisplayName}/>
                             </h2>
                    }
                    <h4>
                        <i>
                            <WrappedUserAttribute text={this.props.user_metadata.pseudonym} clickHandle={this.editPseudonym}/>
                        </i>
                    </h4>
                </div>
                <div className="user-introduction">
                    {
                        this.props.user_metadata.introduction == null || this.props.user_metadata.introduction === ""
                            ? <p>I feel undefined...</p>
                            : <WrappedUserAttribute text={this.props.user_metadata.introduction} clickHandle={this.editIntroduction}/>
                    }
                </div>
                <div className="user-stats">
                    <b>Your Stats:</b>
                    <Tag intent="primary">Posts: {this.props.user_metadata.posts}</Tag>
                    <Tag intent="success">Follower: {this.props.user_metadata.followers}</Tag>
                    <Tag intent="danger">Likes: {this.props.user_metadata.likes}</Tag>
                    <Tag intent="warning">Comments: {this.props.user_metadata.comments}</Tag>
                </div>
                <div className="user-drafts">
                    <div>
                        <Button onClick={() => this.setState({isShowDrafts: !this.state.isShowDrafts})}>
                            Show Your Current Drafts
                            {
                                this.state.isShowDrafts
                                    ? <span className="bp3-icon-standard bp3-icon-chevron-down"/>
                                    : <span className="bp3-icon-standard bp3-icon-chevron-up"/>
                            }
                        </Button>
                    </div>
                    <Collapse isOpen={this.state.isShowDrafts} keepChildrenMounted={true}>
                        <ul>
                            {
                                this.state.drafts.length > 0
                                    ? this.state.drafts.map(this.renderUserDrafts)
                                    : null
                            }
                        </ul>
                    </Collapse>
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

                {
                    this.state.isShowEditProfilePic
                        ? this.renderEditProfilePicOvelay()
                        : null
                }
            </div>
        );
    }
}
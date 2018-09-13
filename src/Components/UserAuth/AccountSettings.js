import React, {Component} from "react";
import firebase from "../firebase.js";
import {Card, Button, Collapse, Tag, Overlay} from "@blueprintjs/core";
import {WrappedUserProfilePic, WrappedUserAttribute} from "../HOC_EditUserInfo.js";
import FileDropUpload from "../FileDropUpload.js";
import "../../CSS/account-settings.css"
import AppToaster from "../Toaster";
import resizeImage from "resize-image";
import slugify from "slugify";

export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDrafts: false,
            isShowBlogs: false,
            drafts: [],
            blogs: [],
            isEditProfilePic: false,
            isEditDisplayName: false,
            isEditPseudonym: false,
            isEditIntroduction: false,
            isDisplayNameValid: false,
            isPseudonymValid: false,
            displayNameErrorMessage: "",
            pseudonymErrorMessage: "",
        };
        this.draftRef = firebase.database().ref("drafts");
        this.blogRef = firebase.database().ref("blogs");
    }

    componentWillMount() {
        this.timer = null;
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
        const attribute = "profile_pic";
        const value = "https://storage.googleapis.com/seeds-vietnam.appspot.com/site/profile_pic/" + this.props.uid + ".jpeg";
        return new Promise((resolve, reject) => {
            img.onload = () => {
                let height = img.offsetWidth/128*img.offsetHeight;
                let width = 128;
                data = resizeImage.resize(img, width, height, resizeImage.JPEG);
                this.uploadMedia(file.name, data).then(() => {
                    this.updateUserMetadata(attribute, value).then(() => {
                        return resolve();
                    }).catch((error) => {
                        return reject(error);
                    });
                }).catch((error) => {
                    return reject(error);
                });
            };
        });
    };

    uploadMedia = (fileName, data) => {
        const mediaRef = firebase.storage().ref().child("site/profile_pic/" + this.props.uid + ".jpeg");
        return new Promise ((resolve, reject) => {
            mediaRef.putString(data, 'data_url')
                .then((snapshot) => {
                    AppToaster.show({ message: "Ảnh tải lên hệ thống thành công!", intent: 'success' });
                    return resolve();
                })
                .catch((error) => {
                    AppToaster.show({ message: "Ảnh tải lên thất bại: " + error.message, intent: "danger" });
                    return reject(error);
                });
        });
    };

    updateUserMetadata = (attribute, value) => {
        const userRef = firebase.database().ref("user_metadata/" + this.props.uid);
        return new Promise((resolve, reject) => {
            userRef.update({
                [attribute]: value
            }).then(() => {
                return resolve();
            }).catch((error) => {
                return reject(error);
            });
        });
    };

    validateDisplayName = (e) => {
        let value = e.target.value;
        const checkAvailableUserName = firebase.functions().httpsCallable('checkAvailableUserName');
        this.setState({isDisplayNameValid: false});
        this.setState({displayNameErrorMessage: ""});
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (value === "") {
                this.setState({displayNameErrorMessage: "Tên tài khoản không thể trống"});
                this.setState({isDisplayNameValid: false});
                return;
            }
            if (value.includes(" ")) {
                this.setState({displayNameErrorMessage: "Tên tài khoản không thể có dấu cách"});
                this.setState({isDisplayNameValid: false});
                return;
            }
            checkAvailableUserName({id: slugify(value)}).then((result) => {
                this.setState({isDisplayNameValid: JSON.parse(result.data)});
                if (!JSON.parse(result.data))
                    this.setState({displayNameErrorMessage: "Tên tài khoản này đã tồn tại"})
            });
        }, 400);
    };

    validatePseudonym = (e) => {
        let value = e.target.value;
        this.setState({isPseudonymValid: false});
        this.setState({pseudonymErrorMessage: ""});
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (value === "") {
                this.setState({pseudonymErrorMessage: "Bút danh không thể trống"});
                this.setState({isPseudonymValid: false});
                return;
            }
            this.setState({isPseudonymValid: true});
        }, 400);
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
                <Card className="blog" interactive={true} elevation="two"
                      style={{position: "relative"}}
                      onClick={() => {window.location.href="/Blog/" + key.id + "/" + key.title}}>
                    <a className="bp3-button bp3-icon-edit bp3-minimal bp3-small" role="button"
                            style={{position: "absolute", top: "0", right: "0", width: "20px"}}
                            onClick={(e) => e.stopPropagation()}
                            href={"/editBlog/" + key.id}/>
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
                     isOpen={this.state.isEditProfilePic}
                     onClose={() => this.setState({isEditProfilePic: false})}>
                <Card style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <Button className="bp3-icon-cross bp3-minimal bp3-intent-danger"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => this.setState({isEditProfilePic: false})}/>
                    <h3>Thay đổi ảnh đại diện: </h3>
                    <FileDropUpload handleFileDrop={this.handleProfilePicUpload}/>
                </Card>
            </Overlay>
        );
    };

    renderEditDisplayNameOvelay = () => {
        return(
            <Overlay className="edit-display-name-overlay"
                     isOpen={this.state.isEditDisplayName}
                     onClose={() => this.setState({isEditDisplayName: false})}>
                <Card style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <Button className="bp3-icon-cross bp3-minimal bp3-intent-danger"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => this.setState({isEditDisplayName: false})}/>
                    <form onSubmit={this.handleDisplayNameChange}>
                        <h3>Thay đổi tên tài khoản: </h3>
                        <div className="bp3-input-group">
                            <span className="bp3-icon">@</span>
                            <input className="bp3-input" type="text" defaultValue={this.props.user_metadata.display_name} onChange={this.validateDisplayName}/>
                        </div>
                        {
                            !this.state.isDisplayNameValid
                                ? <p style={{marginTop: "3px", color: "red"}}><i>{this.state.displayNameErrorMessage}</i></p>
                                : null
                        }
                        <Button className="bp3-large bp3-fill bp3-intent-primary" type="submit" text="Change!" style={{marginTop: "10px", marginBottom: "10px"}}/>
                    </form>
                </Card>
            </Overlay>
        );
    };

    renderEditPseudonymOvelay = () => {
        return(
            <Overlay className="edit-pseudonym-overlay"
                     isOpen={this.state.isEditPseudonym}
                     onClose={() => this.setState({isEditPseudonym: false})}>
                <Card style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <Button className="bp3-icon-cross bp3-minimal bp3-intent-danger"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => this.setState({isEditPseudonym: false})}/>
                    <form onSubmit={this.handlePseudonymChange}>
                        <h3>Thay đổi tên bút danh: </h3>
                        <div className="bp3-input-group">
                            <span className="bp3-icon bp3-icon-edit"/>
                            <input className="bp3-input" type="text" defaultValue={this.props.user_metadata.pseudonym} onChange={this.validatePseudonym}/>
                        </div>
                        {
                            !this.state.isPseudonymValid
                                ? <p style={{marginTop: "3px", color: "red"}}><i>{this.state.pseudonymErrorMessage}</i></p>
                                : null
                        }
                        <Button className="bp3-large bp3-fill bp3-intent-primary" type="submit" text="Change!" style={{marginTop: "10px", marginBottom: "10px"}}/>
                    </form>
                </Card>
            </Overlay>
        );
    };

    renderEditIntroductionOvelay = () => {
        return(
            <Overlay className="edit-pseudonym-overlay"
                     isOpen={this.state.isEditIntroduction}
                     onClose={() => this.setState({isEditIntroduction: false})}>
                <Card style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                    <Button className="bp3-icon-cross bp3-minimal bp3-intent-danger"
                            style={{position: "absolute", top: "0", right: "0"}}
                            onClick={() => this.setState({isEditIntroduction: false})}/>
                    <form onSubmit={this.handleIntroductionChange}>
                        <h3>Thay đổi lời giới thiệu của bạn: </h3>
                        <div className="bp3-input-group">
                            <span className="bp3-icon bp3-icon-edit"/>
                            <input className="bp3-input" type="text" defaultValue={this.props.user_metadata.introduction}/>
                        </div>
                        <Button className="bp3-large bp3-fill bp3-intent-primary" type="submit" text="Change!" style={{marginTop: "10px", marginBottom: "10px"}}/>
                    </form>
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
                                                     clickHandle={() => this.setState({isEditProfilePic: true})}/>

                    }
                </div>
                <div className="user-identity">
                    {
                        this.props.user_metadata.display_name == null || this.props.user_metadata.display_name === ""
                            ? <div className="bp3-skeleton"
                               style={{width: "150px", height: "30px", margin: "0 auto"}}/>
                            : <h2>
                                <WrappedUserAttribute text={"@" + this.props.user_metadata.display_name}
                                                      clickHandle={() => this.setState({isEditDisplayName: true})}/>
                              </h2>
                    }
                    <h4>
                        <i>
                            <WrappedUserAttribute text={this.props.user_metadata.pseudonym}
                                                  clickHandle={() => this.setState({isEditPseudonym: true})}/>
                        </i>
                    </h4>
                </div>
                <div className="user-introduction">
                    {
                        this.props.user_metadata.introduction == null || this.props.user_metadata.introduction === ""
                            ? <WrappedUserAttribute text="I feel undefined..."
                                                    clickHandle={() => this.setState({isEditIntroduction: true})}/>
                            : <WrappedUserAttribute text={this.props.user_metadata.introduction}
                                                    clickHandle={() => this.setState({isEditIntroduction: true})}/>
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
                    this.state.isEditProfilePic
                        ? this.renderEditProfilePicOvelay()
                        : null
                }
                {
                    this.state.isEditDisplayName
                        ? this.renderEditDisplayNameOvelay()
                        : null
                }
                {
                    this.state.isEditPseudonym
                        ? this.renderEditPseudonymOvelay()
                        : null
                }
                {
                    this.state.isEditIntroduction
                        ? this.renderEditIntroductionOvelay()
                        : null
                }
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

    handleDisplayNameChange = (e) => {
        e.preventDefault();
        const attribute = "display_name";
        let value = "";
        for (let i of e.target) {
            if (i.type === "text")
                value = i.value;
        }
        if (!this.state.isDisplayNameValid) return;
        this.updateUserMetadata(attribute, slugify(value)).then(() => {
            AppToaster.show({ message: "Thay đổi tên tài khoản thành công", intent: "success" });
            this.setState({isEditDisplayName: false}, () => this.props.reloadUserMetadata());
        }).catch((error) => {
            AppToaster.show({ message: error, intent: "danger" });
        });
    };

    handlePseudonymChange = (e) => {
        e.preventDefault();
        const attribute = "pseudonym";
        let value = "";
        for (let i of e.target) {
            if (i.type === "text")
                value = i.value;
        }
        if (!this.state.isPseudonymValid) return;
        this.updateUserMetadata(attribute, value).then(() => {
            AppToaster.show({ message: "Thay đổi bút danh thành công", intent: "success" });
            this.setState({isEditPseudonym: false}, () => this.props.reloadUserMetadata());
        }).catch((error) => {
            AppToaster.show({ message: error, intent: "danger" });
        });
    };

    handleIntroductionChange = (e) => {
        e.preventDefault();
        const attribute = "introduction";
        let value = "";
        for (let i of e.target) {
            if (i.type === "text")
                value = i.value;
        }
        this.updateUserMetadata(attribute, value).then(() => {
            AppToaster.show({ message: "Thay đổi lời giới thiệu thành công", intent: "success" });
            this.setState({isEditIntroduction: false}, () => this.props.reloadUserMetadata());
        }).catch((error) => {
            AppToaster.show({ message: error, intent: "danger" });
        });
    };
}
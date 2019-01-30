import React, {Component} from "react";
import firebase from "./firebase.js";
import TextEditor from "./TextEditor";
import AppToaster from "./Toaster";
import {GetCurrentTime} from "../Helpers/HelperFn";
import {convertFromRaw} from "draft-js";

export default class EditDraft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draft: {},
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.isLoggedIn !== undefined && !this.props.isLoggedIn) {
                window.location.href="/404";
            }

            this.getDraftContent()
                .then(() => {
                    AppToaster.show({message: "Draft load thành công!", intent: "success"});
                })
                .catch(() => {
                    AppToaster.show({message: "Bản draft không tồn tại", intent: "danger"});
                    window.location.href="/404";
                });
        }, 500)
    }

    getDraftContent = () => {
        const id = this.props.match.params.id;
        console.log(id);
        const draftRef = firebase.database().ref("drafts/" + id);
        return new Promise((resolve, reject) => {
            draftRef.once("value", snapshot => {
                if (snapshot.val() == null) {
                    return reject();
                }
                this.setState({draft: snapshot.val()}, () => {return resolve()});
            });
        });
    };

    savePostData = (content) => {
        return new Promise((resolve, reject) => {
            let content_images = Object.keys(content.data.entityMap).map(key => {
                return content.data.entityMap[key].type==="image" ? content.data.entityMap[key] : null;
            });
            let draft = this.state.draft;
            draft.createTimeStamp = GetCurrentTime("ms");
            draft.title = content.title;
            draft.data.content = JSON.stringify(content.data);
            draft.data.sneakpeak = convertFromRaw(content.data).getPlainText().slice(0, 160);
            if (content_images.length > 0) {
                draft.cover_img = content_images[0].data.src;
                draft.thumbnail = content_images[0].data.src;
            }
            this.setState({draft: draft}, () => {
                resolve();
            });
        })
    };

    saveDraft = (content) => {
        const id = this.props.match.params.id;
        this.savePostData(content).then(() => {
            const draftRef = firebase.database().ref("drafts/" + id);
            draftRef.update(this.state.draft)
                .then(() => {
                    AppToaster.show({message: "Update bản draft thành công!", intent: "success"});
                    window.location.href = "/user/settings/@" + this.props.user_metadata.display_name;
                })
                .catch((error) => {
                    AppToaster.show({message: "Update bản draft thất bại. Lỗi: " + error.message, intent: "danger"});
                });
        });
    };

    savePublish = (content) => {
        const publishDraft = firebase.functions().httpsCallable('publishDraft');
        const id = this.props.match.params.id;
        const uid = this.props.uid;
        this.savePostData(content).then(() => {
            const draftRef = firebase.database().ref("drafts/" + id);
            draftRef.update(this.state.draft)
                .then(() => {
                    publishDraft({id: id, uid: uid}).then(result => {
                        AppToaster.show({message: "Publish bản draft thành công!", intent: "success"});
                        window.location.href = "/user/settings/@" + this.props.user_metadata.display_name;
                    });
                })
                .catch((error) => {
                    AppToaster.show({message: "Publish bản draft thất bại. Lỗi: " + error.message, intent: "danger"});
                });
        });
    };

    render() {
        return(
            <div className="edit-draft">
                {
                    Object.keys(this.state.draft).length > 0
                        ? <TextEditor renderContent={this.state.draft} saveDraft={this.saveDraft} savePublish={this.savePublish}/>
                        : null
                }
            </div>
        );
    }
}
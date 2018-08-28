import React, {Component} from "react";
import firebase from "../firebase.js";
import {AppToaster} from "../Toaster.js";

import {Card, Button, Tag, Intent} from "@blueprintjs/core";
import {Tab, Tabs, Label, Tooltip, Position} from "@blueprintjs/core";
import resizeImage from "resize-image";

// import {GetCurrentTime} from "./helpers/HelperFn.js";

import "../../CSS/account-settings.css"

export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_metadata: {},
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getUserId().then(() => {
                this.getUserMetadata();
            });
        }, 500);
    }

    getUserId = () => {
        return new Promise ((resolve, reject) => {
            if (this.props.match.params.id === undefined)
                return reject();
            else
                return resolve();
        })
    };

    getUserMetadata = () => {
        const uid = this.props.match.params.id.slice(1);
        const userRef = firebase.database().ref("user_metadata/");
        userRef.orderByChild("display_name").equalTo(uid).on("value", snapshot => {
            const user = snapshot.val();
            if (user === null) window.location.href="/404";

            this.setState({user_metadata: Object.values(user)[0]});
        })
    };

    render() {
        return (
            <div className="account-settings">
                <div className="profile_pic">
                    <img src={this.state.user_metadata.profile_pic} alt="profile_pic" />
                </div>
                <div className="user-identity">
                    <h2>@{this.state.user_metadata.display_name}</h2>
                    <h4><i>{this.state.user_metadata.pseudonym}</i></h4>
                </div>
                <div className="user-introduction">
                    <p>{this.state.user_metadata.introduction}</p>
                </div>
                <div className="user-stats">
                    Your Stats:
                    <Tag intent={Intent.PRIMARY}>Posts: {this.state.user_metadata.posts}</Tag>
                    <Tag intent={Intent.SUCCESS}>Follower: {this.state.user_metadata.followers}</Tag>
                    <Tag intent={Intent.DANGER}>Likes: {this.state.user_metadata.likes}</Tag>
                    <Tag intent={Intent.WARNING}>Comments: {this.state.user_metadata.comments}</Tag>
                </div>
                <div className="saved-posts">

                </div>
            </div>
        );
    }
}
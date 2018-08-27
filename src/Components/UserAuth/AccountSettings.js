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

        }
    }

    componentDidMount() {
        this
    }

    render() {
        return (
            <div className="account-settings">
                <div className="profile_pic">
                    <img src={this.props.user_metadata.profile_pic} alt="profile_pic" />
                </div>
                <div className="user-identity">
                    <h2>{this.props.user_metadata.display_name}</h2>
                    <h3><i>{this.props.user_metadata.pseudonym}</i></h3>
                </div>
                <div className="user-introduction">
                    <p>{this.props.user_metadata.introduction}</p>
                </div>
                <div className="user-stats">
                    Your Stats:
                    <Tag intent={Intent.PRIMARY}>Posts: {this.props.user_metadata.posts}</Tag>
                    <Tag intent={Intent.SUCCESS}>Follower: {this.props.user_metadata.followers}</Tag>
                    <Tag intent={Intent.DANGER}>Likes: {this.props.user_metadata.likes}</Tag>
                    <Tag intent={Intent.WARNING}>Comments: {this.props.user_metadata.comments}</Tag>
                </div>
                <div className="saved-posts">

                </div>
            </div>
        );
    }
}
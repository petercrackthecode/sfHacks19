import React, {Component} from "react";
import firebase from "../firebase.js";
// import {AppToaster} from "../Toaster.js";

import {Card, Button, Collapse, Tag, Intent} from "@blueprintjs/core";

import "../../CSS/account-settings.css"

export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDrafts: false,
            isShowBlogs: false,
            drafts: [],
            blogs: [],
        };
        this.draftRef = firebase.database().ref("drafts");
        this.blogRef = firebase.database().ref("blogs");
    }

    componentWillMount() {
    }

    componentDidMount() {
        let attempt = 0;
        const load = setInterval(() => {
            if (this.props.isLoggedIn !== undefined && !this.props.isLoggedIn) {
                window.location.href="/404";
            }

            if (attempt === 3) clearInterval(load);

            this.props.reloadUserMetadata();
            attempt += 1;
            if (this.props.user_metadata.drafts) {
                Object.values(this.props.user_metadata.drafts).map(draftId => {
                    let temp = [];
                    this.draftRef.orderByKey().equalTo(draftId).on("value", snapshot => {
                        if (snapshot.val() === null) return;
                        temp.push(Object.values(snapshot.val())[0]);
                        this.setState({drafts: temp});
                    });
                });
            }

            if (this.props.user_metadata.blogs) {
                Object.values(this.props.user_metadata.blogs).map(blogId => {
                    let temp = [];
                    this.blogRef.orderByKey().equalTo(blogId).on("value", snapshot => {
                        if (snapshot.val() === null) return;
                        temp.push(Object.values(snapshot.val())[0]);
                        this.setState({blogs: temp});
                    });
                });
            }
        }, 300)
    }

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
                <Card className="blog" interactive={true} elevation="two" onClick={() => {window.location.href="/editBlog/" + key.id}}>
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
                        this.props.user_metadata.profile_pic == null || this.props.user_metadata.profile_pic === ""
                            ? <div className="bp3-skeleton"
                                style={{width: "128px", height: "128px", borderRadius: "50%", margin: "0 auto"}}/>
                            : <img src={this.props.user_metadata.profile_pic} alt="profile_pic"/>
                    }
                </div>
                <div className="user-identity">
                    {
                        this.props.user_metadata.display_name == null || this.props.user_metadata.display_name === ""
                            ? <div className="bp3-skeleton"
                               style={{width: "150px", height: "30px", margin: "0 auto"}}/>
                            : <h2>@{this.props.user_metadata.display_name}</h2>
                    }
                    <h4><i>{this.props.user_metadata.pseudonym}</i></h4>
                </div>
                <div className="user-introduction">
                    {
                        this.props.user_metadata.introduction == null || this.props.user_metadata.introduction === ""
                            ? <p>I feel undefined...</p>
                            : <p>{this.props.user_metadata.introduction}</p>
                    }
                </div>
                <div className="user-stats">
                    <b>Your Stats:</b>
                    <Tag intent={Intent.PRIMARY}>Posts: {this.props.user_metadata.posts}</Tag>
                    <Tag intent={Intent.SUCCESS}>Follower: {this.props.user_metadata.followers}</Tag>
                    <Tag intent={Intent.DANGER}>Likes: {this.props.user_metadata.likes}</Tag>
                    <Tag intent={Intent.WARNING}>Comments: {this.props.user_metadata.comments}</Tag>
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
            </div>
        );
    }
}
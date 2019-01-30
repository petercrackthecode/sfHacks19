import React, {Component, PureComponent} from 'react';
import {Button, ButtonGroup, Card, Tab, Tabs} from "@blueprintjs/core";
import firebase from "../firebase.js";

export default class SiteManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            startAt: 0,
            endAt: Number.MAX_VALUE,
        };

        this.pageSize = 2;
    }

    componentDidMount() {
        setTimeout(() => {
            this.getBlogs(this.state.startAt, this.state.endAt);
        }, 500);
    }

    getBlogs = () => {
        const blogRef = firebase.database().ref("blogs");

        return new Promise((resolve, reject) => {
            blogRef.orderByChild("createTimeStamp").limitToLast(this.pageSize).startAt(this.state.startAt).endAt(this.state.endAt).on("value", snapshot => {
                const tempBlogList = [];
                let index = 0;
                snapshot.forEach(item => {
                    if (index === 0) this.setState({startAt: item.val().createTimeStamp});
                    tempBlogList.push(item.val());
                    this.setState({endAt: item.val().createTimeStamp});
                    index++;
                });
                this.setState({blogs: tempBlogList.reverse()});
            });
        });
    };

    prevPage = () => {
        this.setState({startAt: this.state.endAt, endAt: Number.MAX_VALUE}, () => {
            this.getBlogs()
        });
    };

    nextPage = () => {
        this.setState({endAt: this.state.startAt, startAt: 0}, () => {
            this.getBlogs()
        });
    };

    deleteBlog = (id) => {
        console.log(id);
    };

    editBlog = (id) => {
        console.log(id);
    };

    starBlog = (id) => {
        console.log(id);
    };

    render() {
        return(
            <div className="site-management">
                <Tabs id="site-management-panel" defaultSelectedTabId="content-management" vertical={true}>
                    <Tab id="content-management"
                         title="Quản lý Nội Dung Trang"
                         panel={ <ContentManagement blogs={this.state.blogs}
                                                    prev={this.prevPage}
                                                    next={this.nextPage}
                                                    deleteBlog={this.deleteBlog}
                                                    editBlog={this.editBlog}
                                                    starBlog={this.starBlog}/> }/>
                    <Tab id="user-management" title="Quản lý Tài Khoản" panel={<UserManagement />}/>
                    <Tabs.Expander />
                </Tabs>
            </div>
        );
    }
}

class ContentManagement extends Component {
    constructor(props) {
        super(props);
    }

    renderBlog = (key) => {
        return(
            <li key={key.id}>
                <Card className="blog-summary-wrapper bp3-fill" interactive={true} elevation="two"
                      style={{position: "relative"}}
                      onClick={() => {window.location.href="/Blog/" + key.id + "/" + key.title}}>
                    <ButtonGroup style={{position: "absolute", top: "0", right: "0"}}>
                        <Button className="bp3-icon-delete bp3-minimal" onClick={(e) => {e.stopPropagation(); this.props.deleteBlog(key.id)}}/>
                        <Button className="bp3-icon-edit bp3-minimal" onClick={(e) => {e.stopPropagation(); this.props.editBlog(key.id)}}/>
                        <Button className="bp3-icon-star bp3-minimal" onClick={(e) => {e.stopPropagation(); this.props.starBlog(key.id)}}/>
                    </ButtonGroup>
                    <div className="blog">
                        {
                            key.thumbnail.length > 0
                                ? <img className="blog-cover bp3-card" src={key.thumbnail}/>
                                : <div className="blog-cover bp3-card bp3-non-ideal-state">
                                    <div className="bp3-non-ideal-state-visual">
                                        <span className="bp3-icon bp3-icon-unknown-vehicle"/>
                                    </div>
                                </div>
                        }

                        <div className="blog-info">
                            <div className="blog-title">{key.title}</div>
                            <div className="blog-time-stamp">{new Date(key.createTimeStamp).toUTCString()}</div>
                            <div className="blog-author"><AuthorInfo userId={key.author}/></div>
                            <div className="blog-sneakpeak"><p>{key.data.sneakpeak}</p></div>
                        </div>
                    </div>
                </Card>
            </li>
        );
    };

    render() {
        return(
            <div className="content-management">
                <Button className="bp3-icon-step-backward" onClick={this.props.prev}/>
                <Button className="bp3-icon-step-forward" onClick={this.props.next}/>
                <ul style={{listStyle: "none", padding: "0"}}>
                    { this.props.blogs.map(this.renderBlog) }
                </ul>
            </div>
        );
    }
}

class AuthorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: null
        }
    }

    getAuthor = (id) => {
        const userRef = firebase.database().ref("user_metadata/" + id);
        return userRef.once("value", snapshot => {
            return snapshot.val();
        })
    };

    componentDidMount() {
        this._asyncRequest = this.getAuthor(this.props.userId).then(data => {
            this._asyncRequest = null;
            this.setState({author: data.val()});
        });
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    render() {
        return(
            this.state.author === null ? null :
            <div>
                {this.state.author.pseudonym} (@{this.state.author.display_name})
            </div>
        );
    }
}

class UserManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="user-management">

            </div>
        );
    }
}
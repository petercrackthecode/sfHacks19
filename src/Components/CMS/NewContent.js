import React, {Component} from 'react';
import {Card, Overlay, Tab, Tabs, Button, Intent} from "@blueprintjs/core";

import firebase from "../firebase.js";

import AppToaster from "../Toaster.js";

import TextEditor from "../TextEditor.js";
import SiteMediaBrowser from "../SiteMediaManager/SiteMediaBrowser.js";
import GoogleImageBrowser from "../SiteMediaManager/GoogleImageBrowser.js";

import {GetCurrentTime} from "../../Helpers/HelperFn";

export default class NewContent extends Component {
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
                },
                title: "",
                author: "",
                cover_img: "",
                thumbnail: "",
                createTimeStamp: 0,
            },
        };
    }

    saveTextEditorData = (data) => {
        const temp = this.state.newBlog;
        temp.data.content = JSON.stringify(data);
        this.setState({newBlog: temp}, () => {
            this.setState({createContentOverlay: true});
        });
    };

    insertMedia = (url) => {
        const temp = this.state.newBlog;
        temp.cover_img = url;
        temp.thumbnail = url;
        this.setState({newBlog: temp});
        this.setState({addMediaOverlay: false});
    };

    createNewBlogEntry = () => {
        const blogRef = firebase.database().ref().child("blogs").push();
        let newBlog = this.state.newBlog;
        newBlog.id = blogRef.key;
        return new Promise ((resolve, reject) => {
            this.setState({newBlog: newBlog}, () => {
                blogRef.set(this.state.newBlog)
                    .then(() => {
                        return resolve();
                    })
                    .catch(() => {
                        return reject();
                    });
            });
        });
    };

    resetComponentState = () => {
        return new Promise ((resolve, reject) => {
            const reset = {
                content: "",
                title: "",
                author: "",
                cover_img: "",
                thumbnail: "",
                createTimeStamp: 0,
            };
            this.setState({createContentOverlay: false});
            this.setState({newBlog: reset}, () => resolve());
        })
    };

    submitData = (e) => {
        e.preventDefault();
        let newBlog = this.state.newBlog;
        newBlog.createTimeStamp = GetCurrentTime("ms");
        this.setState({newBlog: newBlog}, () => {
            this.createNewBlogEntry()
                .then(() => {
                    this.resetComponentState()
                        .then(() => {
                            AppToaster.show({
                                message: "Tạo Blog mới thành công!",
                                intent: Intent.SUCCESS
                            });
                        })
                        .catch(() => {
                            AppToaster.show({
                                message: "Tạo Blog mới thất bại",
                                intent: Intent.DANGER
                            });
                        });
                });
        });
    };

    renderAddMediaOverlay = () => {
        return(
            <Overlay
                isOpen={this.state.addMediaOverlay}
                onClose={() => this.setState({addMediaOverlay: false})}>
                <Card className="add-media-manager">
                    <Tabs id="AddSiteMedia" defaultSelectedTabId="site-media-browser" large={true}>
                        <Tab id="site-media-browser" title="From Site" panel={<SiteMediaBrowser embed={this.insertMedia}/>}/>
                        <Tab id="google-image" title="From Google Image" panel={<GoogleImageBrowser embed={this.insertMedia}/>} />
                        <Tabs.Expander />
                    </Tabs>
                </Card>
            </Overlay>
        );
    };

    renderCreateContentOverlay = () => {
        return(
            <Overlay isOpen={this.state.createContentOverlay}
                     onClose={() => this.setState({createContentOverlay: false})}>
                <Card>
                    <div>
                        <h2>Điền thông tin của blog mới: </h2>
                    </div>
                    <form onSubmit={this.submitData}>
                        <div>
                            <label htmlFor="title">Tựa đề:</label><br/>
                            <input id="title" type="text" className="bp3-input" required onChange={this.handleTitleChange}/>
                        </div>
                        <div>
                            <label htmlFor="author">Tác giả:</label><br/>
                            <input id="author" type="text" className="bp3-input" required onChange={this.handleAuthorChange}/>
                        </div>
                        <div>
                            <label htmlFor="cover_img">Ảnh cover:</label><br/>
                            <input type="text" className="bp3-input" readOnly={true} value={this.state.newBlog.cover_img_url}/><br/>
                            <Button text="Browse..." onClick={() => this.setState({addMediaOverlay: true})}/>
                        </div>
                        <div>
                            <Button text="Tạo blog mới!" type="submit" />
                        </div>
                    </form>
                </Card>
            </Overlay>
        );
    };

    render() {
        return(
            <div className="blog-cms-new-content">
                <TextEditor save={this.saveTextEditorData}/>
                { this.state.createContentOverlay ? this.renderCreateContentOverlay() : null }
                { this.state.addMediaOverlay ? this.renderAddMediaOverlay() : null }
            </div>
        );
    };

    handleTitleChange = (e) => {
        const temp = this.state.newBlog;
        temp.title = e.target.value;
        this.setState({newBlog: temp});
    };

    handleAuthorChange = (e) => {
        const temp = this.state.newBlog;
        temp.author = e.target.value;
        this.setState({newBlog: temp});
    };
}

import React, {Component} from 'react';

import {Spinner, Card, Button, Intent} from "@blueprintjs/core";
import resizeImage from "resize-image";
import AppToaster from "../Toaster.js";

import slug from "slug";

import firebase from "../firebase.js";

import "../../CSS/site-media-browser.css";

export default class SiteMediaBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            media: [],
            selected: "",
            isOperationUnderway: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getSiteMedia();
        }, 500);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.media !== this.state.media) {
            this.setState({isOperationUnderway: true});
        }
    }

    getSiteMedia = () => {
        this.setState({isOperationUnderway: true});
        const mediaRef = firebase.database().ref("siteMedia/")
        mediaRef.on("value", (snapshot) => {
            let media_list = [];
            let items = snapshot.val();
            for (let i in items) {
                media_list.push(items[i]);
            }
            this.setState({media: media_list}, () => this.setState({isOperationUnderway: false}));
        });
    };

    selectMedia = (e, item) => {
        let elements = document.getElementsByClassName("site-media");
        for (let i of elements) {
            i.setAttribute("data-selected", "false");
        }
        if (e.target.tagName === "DIV") {
            e.target.setAttribute("data-selected", "true");
            this.setState({selected: item});
        } else {
            e.target.parentNode.setAttribute("data-selected", "true");
            this.setState({selected: item});
        }
    };

    renderMedia = (item) => {
        return(
            <Card className="site-media" key={item.url}
                  style={{padding: "4px", display: "inline-block"}}
                  data-selected={false} onClick={(e, i) => this.selectMedia(e, item)}>
                <img src={item.url} alt={item.name} style={{maxWidth: "200px"}}/>
            </Card>
        );
    };

    renderSpinner = () => { return( <Spinner/> ); };

    addDragOver = (e) => {
        e.preventDefault();
        e.target.setAttribute("is-dragged-over", "true");
    };

    removeDragOver = (e) => {
        e.preventDefault();
        e.target.setAttribute("is-dragged-over", "false");
    };

    handleFileDrop = (e) => {
        e.preventDefault();
        e.target.setAttribute("is-dragged-over", "false");
        const files = e.dataTransfer.files;
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
            this.setState({isOperationUnderway: true});
            this.resizeAndUploadImage(file);
        }
        if (error !== "") {
            AppToaster.show({
                message: error,
                intent: Intent.DANGER
            });
        }
    };

    resizeAndUploadImage = (file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        let data = null;
        img.onload = () => {
            let height = img.offsetWidth/1300*img.offsetHeight;
            let width = 1300;
            data = resizeImage.resize(img, width, height, resizeImage.JPEG);
            this.uploadMedia(file.name, data)
        };
    };

    uploadMedia = (fileName, data) => {
        const mediaRef = firebase.storage().ref().child("site/" + slug(fileName.match(/^(.*?)(\.[^.]*)?$/)[1], "_") + ".jpeg");
        mediaRef.putString(data, 'data_url')
            .then((snapshot) => {
                AppToaster.show({
                    message: "Ảnh tải lên hệ thống thành công!",
                    intent: Intent.SUCCESS
                });
                this.setState({isOperationUnderway: false});
            })
            .catch((error) => {
                AppToaster.show({
                    message: "Ảnh tải lên thất bại: " + error.message,
                    intent: Intent.DANGER
                });
                this.setState({isOperationUnderway: false});
            });
    };

    deleteSelectedMedia = (e) => {
        e.preventDefault();
        this.setState({isOperationUnderway: true});
        const fileName = this.state.selected.name + "." + this.state.selected.type.match(/[^/]*$/);
        const mediaRef = firebase.storage().ref().child("site/" + fileName);
        mediaRef.delete().then(() => {
            AppToaster.show({
                message: "Xóa ảnh thành công",
                intent: Intent.SUCCESS
            });
            this.setState({isOperationUnderway: false});
        }).catch((error) => {
            AppToaster.show({
                message: "Xoá ảnh thất bại: " + error.message,
                intent: Intent.DANGER
            });
            this.setState({isOperationUnderway: false});
        });
    };

    render() {
        return(
            <div className="site-media-browser">
                <div className="file-drop"
                     onDragOver={this.addDragOver}
                     onDragEnter={this.addDragOver}
                     onDragLeave={this.removeDragOver}
                     onDragEnd={this.removeDragOver}
                     onDrop={this.handleFileDrop}>
                    <h3>Click or Drag file here to upload...</h3>
                </div>
                <div>
                { this.state.isOperationUnderway ? this.renderSpinner() : null }
                </div>
                <div className="browser">
                    {this.state.media.map(this.renderMedia)}

                </div>
                <div className="detail-viewer">
                    <b>Selected File Name: </b>{this.state.selected.name} <br/>
                    <b>Selected File Type: </b>{this.state.selected.type} <br/>
                    <b>Selected File URL: </b>{this.state.selected.url} <br/>
                </div>
                <div className="submit-selection">
                    <Button className="bp3-large" text="Delete Selected" onClick={this.deleteSelectedMedia}/>
                    <Button className="bp3-large" text="Embed Selected" onClick={() => this.props.embed(this.state.selected.url)}/>
                </div>
            </div>
        );
    }
}

import React, {Component} from 'react';

import {Spinner, Card, Button} from "@blueprintjs/core";

import firebase from "../firebase.js";

import "../../CSS/SiteMediaBrowser.css";

export default class SiteMediaBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            media: [],
            selected: "",
        };
    }

    componentDidMount() {
        this.getSiteMedia();
    }

    getSiteMedia = () => {
        let media_list = [];
        const mediaRef = firebase.database().ref("siteMedia/")
        mediaRef.on("value", (snapshot) => {
            let items = snapshot.val();
            for (let i in items) {
                media_list.push(items[i]);
            }
            this.setState({media: media_list});
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

    renderMedia = (media) => {
        return(
            media.map(item => {
                return(
                    <Card className="site-media" key={item.name}
                          style={{padding: "4px", display: "inline-block"}}
                          data-selected={false} onClick={(e, i) => this.selectMedia(e, item)}>
                        <img src={item.url} alt={item.name} style={{maxWidth: "200px"}}/>
                    </Card>
                );
            })
        );
    };

    renderSpinner = () => { return( <Spinner/> ); };

    render() {
        return(
            <div className="site-media-browser">
                <div className="browser">
                    { this.state.media.length > 0 ? this.renderMedia(this.state.media) : this.renderSpinner() }
                </div>
                <div className="detail-viewer">
                    <b>Selected File Name: </b>{this.state.selected.name} <br/>
                    <b>Selected File Type: </b>{this.state.selected.type} <br/>
                    <b>Selected File URL: </b>{this.state.selected.url} <br/>
                </div>
                <div className="submit-selection">
                    <Button className="bp3-large" text="Embed Selected" onClick={() => this.props.embed(this.state.selected.url)}/>
                </div>
            </div>
        );
    }
}

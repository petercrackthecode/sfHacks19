import React, {Component} from 'react';

import {Card, Button} from "@blueprintjs/core";

import GoogleImages from "google-images";

import "../../CSS/google-image-browser.css";

export default class GoogleImageBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            searchString: "",
            searchPage: 1,
            selected: "",
        };
        this.client = null;
    }

    componentDidMount() {
        setTimeout(() => {
            this.getClient();
            this.searchImage();
        }, 500)
    }

    getClient = () => {
        /* Will need to hide these keys, preferably with hash and salts */
        const CSE_ID = "011772262088829314639:th9oz10cqvm";
        const API_KEY = "AIzaSyBjTXde_cHIP_JiyeDfPfKDbPxMnBMmD80";
        /* Will need to hide these keys, preferably with hash and salts */
        const client = new GoogleImages(CSE_ID, API_KEY);
        this.client = client;
    };

    searchImage = () => {
        if (this.state.searchString === "") return;
        console.log(this.state.searchString);
        this.client.search(this.state.searchString, {page: this.state.searchPage}).then(images => {
            console.log(images);
            this.setState({searchResult: images});
        });
    };

    handleSearch = (e) => {
        this.setState({searchString: e.target.value}, () => {
            setTimeout(() => {
                this.searchImage();
            }, 500);
        });
    };

    selectMedia = (e, item) => {
        let elements = document.getElementsByClassName("google-image");
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
            <Card className="google-image" key={item.url}
                  style={{padding: "4px", display: "inline-block"}}
                  data-selected={false} onClick={(e, i) => this.selectMedia(e, item)}>
                <img src={item.url} alt={item.description} style={{maxWidth: "200px"}}/>
            </Card>
        );
    };

    render() {
        return(
            <div className="google-image-browser">
                <div className="bp3-input-group search-field">
                    <span className="bp3-icon bp3-icon-search"></span>
                    <input type="text" className="bp3-input bp3-fill" placeholder="Search"
                           onChange={this.handleSearch}/>
                    <Button className="bp3-minimal bp3-icon-arrow-right"></Button>
                </div>
                <div className="browser">
                    { this.state.searchResult.map(this.renderMedia) }
                </div>
                <div className="detail-viewer">
                    <b>Selected File Name: </b>{this.state.selected.description} <br/>
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

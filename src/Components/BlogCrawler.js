import React, {Component} from 'react';
import moize from "moize";

import "../CSS/blog-crawler.css";

const imgObj = (url) => {
    return (
        <img src={url} alt="post-thumbnail" style={{height: "100px"}}/>
    );
};

export default class BlogCrawler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_index: 0,
            imageList: [],
        };
        this.default_delay = 5000;
        this.delay = 5000;
        this.timeout = null;
    }

    componentDidMount() {
        this.populateImageList()
            .then(() => {
                this.crawlNext();
            })
    }

    populateImageList = () => {
        return new Promise((resolve, reject) => {
            let temp = this.state.imageList;
            this.props.list.forEach(el => {
                temp.push(imgObj(el.thumbnail));
            });
            this.setState({imageList: temp}, () => {return resolve()});
        })
    };

    crawlNext = () => {
        this.timeout = setTimeout(() => {
            // console.log(this.delay);
            let next_index = this.state.item_index + 1;
            this.setState({item_index: next_index % this.props.list.length});
            this.crawlNext();
            this.delay = this.default_delay;
        }, this.delay)
    };

    resetTimeout = () => {
        this.delay = this.delay - this.timeout*10;
        if(this.delay < 0) this.delay = 0;
        // console.log(this.delay);
        clearTimeout(this.timeout);
    };

    render() {
        if (this.props.list.length === 0) return null;
        return (
            <div className="blog-crawler"
                 onMouseEnter={this.resetTimeout}
                 onMouseLeave={this.crawlNext}
                 onClick={() =>
                     window.location = "/Blog/" +
                     this.props.list[this.state.item_index].id +
                     "/" +
                     this.props.list[this.state.item_index].title}>
                <div style={{float: "left", width: "10%", height: "100%", color: "red", textShadow: "1.5px 1.5px green"}}>
                    <h1 style={{lineHeight: "98px", margin: "0px"}}>MỚI:</h1>
                </div>
                <div style={{float: "right", width: "90%"}}>
                    <div className="blog-item" style={{display: "table"}}>
                        <div style={{display: "table-cell"}}>
                            {this.state.imageList[this.state.item_index]}
                        </div>
                        <div style={{display: "table-cell", position: "absolute", padding: "10px", minWidth: "200px"}}>
                            <div>
                                <h3 style={{margin: "4px"}}>{this.props.list[this.state.item_index].title}</h3>
                            </div>
                            <div>
                                Author: {this.props.list[this.state.item_index].author}
                            </div>
                            <div style={{marginTop: "10px"}}>
                                <div style={{float: "left"}}>
                                    Likes: {this.props.list[this.state.item_index].data.likes}
                                </div>
                                <div style={{float: "right"}}>
                                    Views: {this.props.list[this.state.item_index].data.views}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

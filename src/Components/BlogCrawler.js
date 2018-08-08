import React, {Component} from 'react';

import "../CSS/blog-crawler.css";

import seedsVietnam_banner from "../Images/seedsVietnamBanner.jpg";

export default class BlogCrawler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_index: 0,

        };
        this.default_delay = 5000;
        this.delay = 5000;
        this.temp = 0;
        this.timeout = null;
    }

    componentDidMount() {
        this.crawlNext();
    }

    crawlNext = () => {
        this.timeout = setTimeout(() => {
            console.log(this.delay);
            let next_index = this.state.item_index + 1;
            this.setState({item_index: next_index % this.props.list.length});
            this.crawlNext();
            this.delay = this.default_delay;
        }, this.delay)
    };

    resetTimeout = () => {
        this.delay = this.delay - this.timeout*10;
        if(this.delay < 0) this.delay = 0;
        console.log(this.delay);
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
                <div style={{float: "left", width: "10%", height: "100%"}}><h1>BLOG:</h1></div>
                <div style={{float: "right", width: "90%"}}>
                    <div className="blog-item" style={{display: "table"}}>
                        <div style={{display: "table-cell"}}>
                            <img src={this.props.list[this.state.item_index].thumbnail} style={{height: "100px"}}/>
                        </div>
                        <div style={{display: "table-cell", position: "absolute", padding: "10px"}}>
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

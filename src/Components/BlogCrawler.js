import React, {Component} from 'react';
// import moize from "moize";

import "../CSS/blog-crawler.css";

export default class BlogCrawler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_index: 0,
            imageList: [],
        };
        this.default_delay = 7600;
        this.delay = 7600;
        this.timeout = null;
    }

    componentDidMount() {
        this.crawlNext();
    }

    crawlNext = () => {
        this.timeout = setTimeout(() => {
            let next_index = this.state.item_index + 1;
            this.setState({item_index: next_index % this.props.list.length});
            this.crawlNext();
            this.delay = this.default_delay;
        }, this.delay)
    };

    resetTimeout = () => {
        this.delay = this.delay - this.timeout*10;
        if(this.delay < 0) this.delay = 0;
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
                <div style={{width: "10%", height: "100%", color: "red", textShadow: "1.5px 1.5px green"}}>
                    <h1 style={{lineHeight: "98px", margin: "0px"}}>MỚI:</h1>
                </div>
                <div style={{width: "90%"}}>
                    <div className="blog-item" style={{display: "flex"}}>
                        <div>
                            <img src={this.props.list[this.state.item_index].thumbnail} style={{height: "98px"}}/>
                        </div>
                        <div style={{minWidth: "200px", marginLeft: "10px"}}>
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

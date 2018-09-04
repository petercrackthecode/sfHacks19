import React, {Component} from 'react';
import {Card} from "@blueprintjs/core";
import firebase from "./firebase.js";

import "../CSS/blog.css";

export default class BlogBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
            blog_list: [],
        };
	}

	componentDidMount() {
	    setTimeout(() => {
            this.getBlogs();
        }, 500);
    }

    getBlogs = (endAt) => {
        const blogRef = firebase.database().ref("blogs");
        return new Promise((resolve) => {
            if (endAt){
                blogRef.orderByKey().endAt(endAt).limitToLast(10).on("value", (snapshot) => {
                    const query_result = snapshot.val();
                    const result = [];
                    for (let i in query_result) {
                        if (i === "sequence") continue;
                        result.push(query_result[i]);
                    }
                    result.reverse();
                    this.setState({blog_list: result}, () => {return resolve()});
                });
            } else {
                blogRef.orderByKey().limitToLast(10).on("value", (snapshot) => {
                    const query_result = snapshot.val();
                    const result = [];
                    for (let i in query_result) {
                        if (i === "sequence") continue;
                        result.push(query_result[i]);
                    }
                    result.reverse();
                    this.setState({blog_list: result}, () => {return resolve()});
                });
            }
        });
    };

    redirectToBlogViewer = (e, id, title) => {
        window.location.href="Blog/" + id + "/" + title;
    };

    renderBlogCards = (blog) => {
        return(
            <div key={blog.id} style={{display: "inline-block", width: "50%", padding: "20px"}}>
                <Card interactive={true} elevation="two"
                      onClick={(e, id, title) => {this.redirectToBlogViewer(e, blog.id, blog.title)}}>
                    <div id={blog.id + "cover_img"}>
                        <img src={blog.cover_img} style={{width: "100%"}}/>
                    </div>
                    <div id={blog.id + "author"}>
                        <h3>Người viết: {blog.author}</h3>
                    </div>
                    <div id={blog.id + "title"}>
                        <h1>{blog.title}</h1>
                    </div>
                    <div id={blog.id + "sneakpeak"}>
                        <p>{blog.data.sneakpeak}</p>
                    </div>
                </Card>
            </div>
        );
    };

    renderBlogBrowser = () => {
        return(
            <div className="blog-browser">
                {this.state.blog_list.map(this.renderBlogCards)}
            </div>
        );
    };

	render() {
		return(
			<div className="blog">
                { this.renderBlogBrowser() }
            </div>
		);
	}
}
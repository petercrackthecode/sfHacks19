import React, {Component} from 'react';
import firebase from "./firebase.js";
import FileViewer from "react-file-viewer";
import mammoth from "mammoth";

import "../CSS/blog.css";

export default class Blog extends Component {
	constructor(props) {
		super(props);
		this.filePath="https://firebasestorage.googleapis.com/v0/b/seeds-vietnam.appspot.com/o/blogs%2F0001%2Fcontent_0001.docx?alt=media&token=981b3c21-bb35-4de9-9242-572df5fadef5";

	}

	componentWillMount() {
        const storage = firebase.storage().ref("blogs/0001/");
        storage.child("content_0001.docx").getDownloadURL()
            .then((url) => {
            console.log(url);
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.onload = (event) => {
                var document = xhr.response;
                console.log(document);
                mammoth.convertToHtml({arrayBuffer: document})
                    .then((result) => {
                        var html = result.value; // The generated HTML
                        console.log(html);
                        var messages = result.messages; // Any messages, such as warnings during conversion
                        this.refs["fileview"].innerHTML = html;
                    })
                    .done();
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch(function(error) {
            // Handle any errors
        });

    }

	render() {
		return(
			<div className="blog">
				Blog
				{this.props.match.params.id}
                {this.props.match.params.title}
                <div id="fileview" ref="fileview"></div>
			</div>
		);
	}
}

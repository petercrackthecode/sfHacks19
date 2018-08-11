import React, {Component} from 'react';

import TextEditor from "./TextEditor.js";

export default class BlogCMS extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
                <TextEditor />
			</div>
		);
	}
}

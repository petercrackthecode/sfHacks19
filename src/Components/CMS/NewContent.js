import React, {Component} from 'react';

import TextEditor from "../TextEditor.js";

export default class NewContent extends Component {
    constructor(props) {
        super(props);
    }

    saveTextEditorData = (data) => {
        // POST data to backend here
        console.log(data);
        console.log(JSON.stringify(data));
    };

    render() {
        return(
            <div className="blog-cms-new-content">
                <TextEditor save={this.saveTextEditorData}/>
            </div>
        );
    }
}

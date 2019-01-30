import React, {Component} from "react";
import "../CSS/file-drop-upload.css"

export default class FileDropUpload extends Component {
    constructor(props) {
        super(props);
    }

    addDragOver = (e) => {
        e.preventDefault();
        if (e.target.id === "file-drop-label" || e.target.id === "file-drop-input") {
            e.target.parentNode.setAttribute("is-dragged-over", "true");
            return;
        }
        if (e.target.id === "file-drop-h3") {
            e.target.parentNode.parentNode.setAttribute("is-dragged-over", "true");
            return;
        }
        e.target.setAttribute("is-dragged-over", "true");
    };

    removeDragOver = (e) => {
        e.preventDefault();
        if (e.target.id === "file-drop-label" || e.target.id === "file-drop-input") {
            e.target.parentNode.setAttribute("is-dragged-over", "false");
            return;
        }
        if (e.target.id === "file-drop-h3") {
            e.target.parentNode.parentNode.setAttribute("is-dragged-over", "false");
            return;
        }
        e.target.setAttribute("is-dragged-over", "false");
    };

    handleFileDrop = (e) => {
        e.preventDefault();
        e.target.setAttribute("is-dragged-over", "false");
        let files;
        if (e.dataTransfer !== undefined)
            files = e.dataTransfer.files;
        else
            files = e.target.files;

        this.props.handleFileDrop(files);
    };

    render() {
        return(
            <div className="file-drop"
                 id="file-drop-div"
                 onDragOver={this.addDragOver}
                 onDragEnter={this.addDragOver}
                 onDragLeave={this.removeDragOver}
                 onDragEnd={this.removeDragOver}
                 onDrop={this.handleFileDrop}>
                <label id="file-drop-label" className="bp3-label" htmlFor="file-drop-input">
                    <h3 id="file-drop-h3">Click or Drag file here to upload...</h3>
                </label>
                <input id="file-drop-input" type="file"
                       style={{position: "fixed", top: "-100em"}}
                       onChange={this.handleFileDrop}/>
            </div>
        );
    }

}
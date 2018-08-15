import React, {Component} from "react";
import {Button} from "@blueprintjs/core";

export default class BlockStyleButton extends Component {

    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };

    render() {
        return (
            <Button className={"bp3-large bp3-icon-" + this.props.label} onClick={this.onToggle} />
        );
    }
}
import React, {Component} from "react";
import {Button, Popover, Menu, MenuItem, Position} from "@blueprintjs/core";

export default class FontSizeStyleDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button_text: "Select a heading style..",
        }
    }

    componentWillMount() {
        if (this.props.active === undefined || this.props.active === "unstyled")
            this.setState({button_text: "Select a font size.."});
        else
            this.setState({button_text: this.props.active});
    }

    onMenuClick = (e, label, style) => {
        this.setState({button_text: label});
        this.props.onToggle(style)
    };

    renderMenuOptions = () => {
        return(
            <Menu>
                {
                    this.props.fontSizeOptions.map((options) => {
                        return (
                            <MenuItem key={options.label} text={options.label} onClick={(e) => this.onMenuClick(e, options.label, options.style)}/>
                        );
                    })
                }
            </Menu>
        );
    };

    render() {
        return (
            <Popover content={this.renderMenuOptions()} position={Position.BOTTOM}>
                <Button className="bp3-large" text={this.state.button_text}/>
            </Popover>
        );
    }
}
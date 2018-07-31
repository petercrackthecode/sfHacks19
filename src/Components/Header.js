import React, {Component} from 'react';
import ReactDOM from "react-dom";
import logo from "../Images/seedsvietnam.png";
import fb_logo from "../Images/fb_logo.png";
import googleplus_logo from "../Images/ggp_logo.png";
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { Position, PopoverInteractionKind } from "@blueprintjs/core";

export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	renderMenuItems = (key) => {
		return (
			<MenuItem key={key} text={key} />
		);
	}

	renderDesktopMenuOptions = (key) => {
		return (
			this.props.pageStructure[key].length > 0
			? <div className="menuOptions" key={key}><Popover
				content={
					<Menu>
						{ this.props.pageStructure[key].map(this.renderMenuItems) }
					</Menu>
				}
				position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
					<a className="bp3-button bp3-minimal bp3-large" href={"/" + key} >{key}</a>
			</Popover></div>
			: <div className="menuOptions" key={key}><a className="bp3-button bp3-minimal bp3-large" href={"/" + key} >{key}</a></div>
		);
	}

	render() {
		return (
			<nav className="bp3-navbar" style={{minHeight: "160px"}}>
				<div style={{margin: "0 auto", minHeight: "100px"}}>
					<div className="bp3-navbar-group bp3-align-left" style={{position: "relative"}}>
						<img src={logo} alt="logo" style={{width: "186px", height: "100px", position: "absolute", top: "0px"}}/>
					</div>
					<div className="bp3-navbar-group bp3-align-right">
						<a role="button" style={{marginRight: "10px"}}><img src={fb_logo} alt="fb_logo"/></a>
						<a role="button"><img src={googleplus_logo} alt="googleplus_logo"/></a>
					</div>
				</div>
				<div className="menu-bar-desktop bp3-navbar-group">
					{ Object.keys(this.props.pageStructure).map(this.renderDesktopMenuOptions) }
				</div>
			</nav>
		);
	}
}

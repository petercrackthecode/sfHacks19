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

	renderMenuItems = (page, key) => {
		return (
			<MenuItem key={key} text={key} href={"/" + page + "#" + key}/>
		);
	}

	renderDesktopMenuOptions = (key) => {
		const page = key;
		return (
			this.props.pageStructure[key].length > 0
			? <div className="menuOptions" key={key}><Popover
					content={
						<Menu>
							{ this.props.pageStructure[key].map((page) => this.renderMenuItems(key, page)) }
						</Menu>
					}
					position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
					<a className="bp3-button bp3-minimal bp3-large bp3-fill" href={"/" + key} style={{minWidth: "120px"}}>{key}</a>
				</Popover>
				<span className="bp3-navbar-divider" style={{float: "right"}}></span>
			</div>
			: <div className="menuOptions" key={key}>
				<a className="bp3-button bp3-minimal bp3-large" href={"/" + key} style={{minWidth: "120px"}}>{key}</a>
				{
					key !== "Blog"
					? <span className="bp3-navbar-divider" style={{float: "right"}}></span>
					: <div></div>
				}
			</div>
		);
	}

	render() {
		return (
			<nav className="bp3-navbar" style={{minHeight: "180px", padding: "20px"}}>
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

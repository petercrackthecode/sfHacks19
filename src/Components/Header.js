import React, {Component} from 'react';
import ReactDOM from "react-dom";
import logo from "../Images/seedsvietnam.png";
import fb_logo from "../Images/fb_logo.png";
import googleplus_logo from "../Images/ggp_logo.png";
import { Button, Menu, MenuItem, Popover, Overlay } from "@blueprintjs/core";
import { Position, PopoverInteractionKind } from "@blueprintjs/core";

import SignInOverlay from "./UserAuth/SignInOverlay.js";

import "../CSS/header.css";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		    isLoggedIn: false,
            isSignInClicked: false,
            username: "",
            password: "",
            signInOverlayPos : {},
        };
	}

	componentWillMount() {

    }

	renderMenuItems = (page, key) => {
		return (
			<MenuItem key={key} text={key} href={"/" + page + "#" + key}/>
		);
	};

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
					: null
				}
			</div>
		);
	};

    renderSignInOverlay = () => {
        return (
            <SignInOverlay isVisible={this.state.isSignInClicked}
                           posx={this.state.signInOverlayPos.x}
                           posy={this.state.signInOverlayPos.y}/>
        );
    };

	render() {
		return (
			<nav className="bp3-navbar app-header">
				<div className="top-bar">
                    <img id="seedsVietnam-logo" src={logo} alt="logo"/>
					<div className="subscribe" style={{float: "left"}}>
                        <Button className="subscribe-btn bp3-minimal" text="Subscribe!" style={{marginRight: "10px"}}/>
                        <a role="button" style={{marginRight: "10px"}}><img src={fb_logo} alt="fb_logo"/></a>
                        <a role="button"><img src={googleplus_logo} alt="googleplus_logo"/></a>
					</div>
					<div className="user-account" style={{float: "right"}}>
                        <div className="bp3-input-group" style={{marginRight: "10px"}}>
                            <input type="search" className="bp3-input bp3-minimal" />
                            <span className="bp3-icon bp3-icon-search"></span>
                        </div>
                        <Button className="sign-in-btn bp3-minimal" text="Sign in" onClick={this.handleSignIn}/>
					</div>
				</div>
				<div className="menu-bar-desktop bp3-navbar-group">
					{ Object.keys(this.props.pageStructure).map(this.renderDesktopMenuOptions) }
				</div>
                {this.state.isSignInClicked ? this.renderSignInOverlay() : null}
			</nav>
		);
	}

    handleSignIn = (e) => {
        e.stopPropagation();
        let isClicked = this.state.isSignInClicked;
        isClicked ? isClicked=false : isClicked=true
        let domrect = e.target.getBoundingClientRect();
        this.setState({isSignInClicked: isClicked, signInOverlayPos: {x: domrect.right-230, y: domrect.top+domrect.height + 10}});
    }
}

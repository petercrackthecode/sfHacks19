import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import logo from "../Images/seedsvietnam.png";
import fb_logo from "../Images/fb_logo.png";
import googleplus_logo from "../Images/ggp_logo.png";
import { Button, Menu, MenuItem, Popover, Overlay, Classes } from "@blueprintjs/core";
import { Position, PopoverInteractionKind } from "@blueprintjs/core";

import SignInOverlay from "./UserAuth/SignInOverlay.js";
import UserAccOverlay from "./UserAuth/UserAccOverlay.js";

import "../CSS/header.css";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
            isSignInClicked: false,
            signInOverlayPos : {},
            isUserAccClicked: false,
            userAccOverlayPos : {},
			isSearchClicked: false,
            isShowMobileMenu: false,
        };
	}

    authenticated = (uid, isAdmin) => {
	    this.props.authenticated(uid, isAdmin);
    };

	renderMenuItems = (page, key) => {
		return (
			<MenuItem key={key} text={key} href={"/" + page + "#" + key}/>
		);
	};

	renderDesktopMenuOptions = (key) => {
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
				<span className="bp3-navbar-divider" style={{float: "right"}}/>
			</div>
			: <div className="menuOptions" key={key}>
				<a className="bp3-button bp3-minimal bp3-large" href={"/" + key} style={{minWidth: "120px"}}>{key}</a>
				{
					key !== "Blog"
					? <span className="bp3-navbar-divider" style={{float: "right"}}/>
					: null
				}
			</div>
		);
	};

    renderMobileMenuOptions = (key) => {
        return (
            this.props.pageStructure[key].length > 0
                ? <div className="mobile-menu-option" key={key}>
                    <Popover content={
                            <Menu>
                                { this.props.pageStructure[key].map((page) => this.renderMenuItems(key, page)) }
                            </Menu>
                        }
                        position={Position.RIGHT} interactionKind={PopoverInteractionKind.HOVER}>
                        <a className="bp3-button bp3-minimal bp3-large bp3-fill" href={"/" + key} style={{width: "100%", color: "white", fontSize: "2em"}}>{key}</a>
                    </Popover>
                  </div>
                : <div className="mobile-menu-option" key={key}>
                    <a className="bp3-button bp3-minimal bp3-large" href={"/" + key} style={{width: "100%", color: "white", fontSize: "2em"}}>{key}</a>
                  </div>
        );
    };

    renderMobileMenu = () => {
        return(
            <Overlay className="mobile-menu-overlay"
                     isOpen={this.state.isShowMobileMenu}
                     onClose={() => {this.setState({isShowMobileMenu: false}); this.refs["mobile-menu-btn"].buttonRef.setAttribute("show", "false")}}
                     usePortal={false}>
                <div style={{width: "100%"}}>
                    <div style={{backgroundColor: "white", marginBottom: "50px"}}>
                        <img id="seedsVietnam-logo" src={logo} alt="logo" style={{width: "200px"}}/>
                    </div>
                    { Object.keys(this.props.pageStructure).map(this.renderMobileMenuOptions) }
                </div>
            </Overlay>
        );
    };

    renderSignInOverlay = () => {
        return (
            <SignInOverlay isVisible={this.state.isSignInClicked}
                           posx={this.state.signInOverlayPos.x}
                           posy={this.state.signInOverlayPos.y}
                           authenticated={this.authenticated}/>
        );
    };

    renderUserAccOverlay = () => {
        return (
            <UserAccOverlay isVisible={this.state.isUserAccClicked}
                            posx={this.state.userAccOverlayPos.x}
                            posy={this.state.userAccOverlayPos.y}
                            uid={this.props.uid}
                            isAdmin={this.props.isAdmin}
                            user_metadata={this.props.user_metadata}
							signOut={this.props.signOut}/>
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
                            {
                                this.state.isSearchClicked
                                    ? <input type="search" className="bp3-input bp3-minimal" />
                                    : null
                            }
                        </div>
                        <Button className="bp3-minimal bp3-icon-search" onClick={() => this.setState({isSearchClicked: !this.state.isSearchClicked})}/>
                        {
                            !this.props.isLoggedIn
                                ? <Button className="sign-in-btn bp3-minimal" text="Sign in" onClick={this.handleSignIn}/>
                                : <Button className="sign-in-btn bp3-minimal" text="My Account" onClick={this.handleUserAccount}/>
                        }
					</div>
				</div>
				<div className="menu-bar-desktop bp3-navbar-group">
					{ Object.keys(this.props.pageStructure).map(this.renderDesktopMenuOptions) }
				</div>
                <div className="menu-bar-mobile bp3-navbar-group">
                    <Button ref="mobile-menu-btn" className="bp3-large mobile-menu-button" onClick={(e) => {
                        const el = e.target.parentNode.parentNode;
                        this.setState({isShowMobileMenu: !this.state.isShowMobileMenu}, () => {
                            this.state.isShowMobileMenu ? el.setAttribute("show", "true") : el.setAttribute("show", "false")
                        });
                    }}>
                        {
                            this.state.isShowMobileMenu
                                ? <span className="bp3-icon-large bp3-icon-menu-closed"/>
                                : <span className="bp3-icon-large bp3-icon-menu-open"/>
                        }
                    </Button>
                </div>
                {!this.props.isLoggedIn && this.state.isSignInClicked ? this.renderSignInOverlay() : null}
                {this.props.isLoggedIn && this.state.isUserAccClicked ? this.renderUserAccOverlay() : null}
                {this.state.isShowMobileMenu ? this.renderMobileMenu() : null}
			</nav>
		);
	};

    handleSignIn = (e) => {
        e.stopPropagation();
        let isClicked = this.state.isSignInClicked;
        isClicked ? isClicked=false : isClicked=true;
        let domrect = e.target.getBoundingClientRect();
        this.setState({isSignInClicked: isClicked, signInOverlayPos: {x: domrect.right-230, y: domrect.top+domrect.height + 10}});
    };

    handleUserAccount = (e) => {
        e.stopPropagation();
        let isClicked = this.state.isUserAccClicked;
        isClicked ? isClicked=false : isClicked=true;
        let domrect = e.target.getBoundingClientRect();
        this.setState({isUserAccClicked: isClicked, userAccOverlayPos: {x: domrect.right-230, y: domrect.top+domrect.height + 10}});
    };
}

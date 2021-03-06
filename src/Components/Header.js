
import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import logo from "../Images/seedsvietnam.png";
import fb_logo from "../Images/fb_logo.png";
import googleplus_logo from "../Images/ggp_logo.png";
import { Button, Menu, MenuItem, Popover, Overlay } from "@blueprintjs/core";
import { Position, PopoverInteractionKind } from "@blueprintjs/core";

import {Suggest} from '@blueprintjs/select';

import AppToaster from "./Toaster.js";


import SignInOverlay from "./UserAuth/SignInOverlay.js";
import UserAccOverlay from "./UserAuth/UserAccOverlay.js";


import "../CSS/header.css";

import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function removeSpaceInKey(key)	{
	return key.replace(/\s+/g, '');
}

function removeSpaceInKeyWithDash(key)	{
	return key.replace(/\s+/g, '-');
}

class BlogSearch extends Component	{
	constructor(props)	{
		super(props);
	}

	render()	{
		return (
			<div className='BlogSearch'></div>
		);
	}
}

class UsernameSearch extends Component	{
	constructor(props)	{
		super(props);
	}

	render()	{
		return (
			<div className='UsernameSearch'></div>
		);
	}
}

class SearchBar extends Component	{
	constructor(props)	{
		super(props);
	}

	render()	{
		return (
			<div>
				<div className='search-box'>
					<input className='search-txt' type='text' name='' placeholder='Type to search'/>
					<a href="#" className='search-btn'>
						<FontAwesomeIcon icon={faSearch}/>
					</a>
				</div>
			</div>
		);
	}
}

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
            isSignInClicked: false,
            signInOverlayPos : {},
            isUserAccClicked: false,
            userAccOverlayPos : {},
            searchQuery: ''
        };
	}

    authenticated = (uid, isAdmin) => {
	    this.props.authenticated(uid, isAdmin);
    };

    subscribe = () => {
        this.setState({isShowSubscription: false});
        this.props.subscribe().then(() => {
            AppToaster.show({
                message: "Bạn đã subscribe Newsletter thành công!",
                intent: "success"
            });
        }).catch(() => {
            AppToaster.show({
                message: "Subscribe Newsletter thất bại!",
                intent: "danger"
            });
        });
    };

	renderMenuItems = (page, key) => {
		return (
			<MenuItem key={key} text={key} href={"/" + removeSpaceInKey(page) + "#" + removeSpaceInKeyWithDash(key)}/>
		);
	};

	renderDesktopMenuOptions = (key) => {
		return (
			this.props.pageStructure[key].length > 0
			? <div className="menu-options" key={key}><Popover
					content={
						<Menu>
							{ this.props.pageStructure[key].map((page) => this.renderMenuItems(key, page)) }
						</Menu>
					}
					position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER}>
					<a className="bp3-button bp3-minimal bp3-large bp3-fill" href={"/" + removeSpaceInKey(key)} style={{minWidth: "120px"}}>{key}</a>
				</Popover>
				<span className="bp3-navbar-divider" style={{float: "right"}}/>
			</div>
			: <div className="menuOptions" key={key}>
				<a className="bp3-button bp3-minimal bp3-large" href={"/" + removeSpaceInKey(key)} style={{minWidth: "120px"}}>{key}</a>
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
            <div className="mobile-menu-option" key={key}>
                <Popover content={
                        <Menu>
                            { this.props.pageStructure[key].map((page) => this.renderMenuItems(key, page)) }
                        </Menu>
                    }
                    position={Position.RIGHT} interactionKind={PopoverInteractionKind.HOVER}>
                    <a className="bp3-button bp3-minimal bp3-large bp3-fill" href={"/" + key} style={{color: "white", fontSize: "1.7em"}}>{key}</a>
                </Popover>
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
                    <div className="mobile-menu-option">
                        <a className="bp3-button bp3-minimal bp3-large bp3-fill"
                           style={{color: "white", fontSize: "1.7em"}}
                           onClick={() => {this.setState({isShowMobileMenu: false}); this.refs["mobile-menu-btn"].buttonRef.setAttribute("show", "false")}}>{"<--Giấu menu"}</a>
                    </div>
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

    renderSubscriptionMenu = () => {
        return (
            <Overlay className="overlay-subscription"
                     isOpen={this.state.isShowSubscription}
                     onClose={() => this.setState({isShowSubscription: false})}>
                <div className='overlay-subscription-content'>
                    <Button className="bp3-icon-cross closeBtn" onClick={() => this.setState({isShowSubscription: false})}/>
                    <div className='overlay-header'>
                        <h2>Điều khoản</h2>
                    </div>
                    <div className='overlay-body'>
                        <h3>Content</h3>
                        <div>...</div>
                        <div>...</div>
                        <div>...</div>
                    </div>

                    <div className='overlay-header'>
                        <h2>Quyền lợi</h2>
                    </div>
                    <div className='overlay-body'>
                        <h3>Content</h3>
                        <div>...</div>
                        <div>...</div>
                        <div>...</div>
                    </div>
                    <div className='overlay-footer'>
                        <Button className="subscribe-btn bp3-minimal" text="Đồng ý" onClick={this.subscribe}/>
                    </div>
                </div>
            </Overlay>
        );
    };

	render() {
		return (
			<nav className="bp3-navbar app-header">
				<div className="top-bar">
                    <img id="seedsVietnam-logo" src={logo} alt="logo"/>
					<div className="subscribe" style={{float: "left"}}>
          			<Button className="subscribe-btn bp3-minimal" text="Subscribe!" style={{marginRight: "10px"}} onClick={this.handleSubscriptionBtn}/>
						<a role="button" style={{marginRight: "10px"}}><img src={fb_logo} alt="fb_logo"/></a>
                        <a role="button"><img src={googleplus_logo} alt="googleplus_logo"/></a>
					</div>
					<SearchBar/>
					<div className="user-account" style={{float: "right"}}>
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
                                ? "Đóng Menu "
                                : "Hiện Menu "
                        }
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
                {this.state.isShowSubscription ? this.renderSubscriptionMenu() : null}
			</nav>
		);
	};

    handleSubscriptionBtn = () => {
        if (!this.props.isLoggedIn) {
            AppToaster.show({message: "Bạn phải đăng nhập trước khi đăng ký nhận Newsletter", intent: "warning"});
            return;
        }
        if (this.props.user_metadata.subscribe_state) {
            AppToaster.show({message: "Bạn đã đăng kí Newsletter với chúng tôi. Cảm ơn bạn!", intent: "primary"});
            return;
        }
        this.setState({isShowSubscription: true});

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

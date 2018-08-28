import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from "./Home.js";
import SeedsACT from "./SeedsACT.js";
import SheCodes from "./SheCodes.js";
import EssayEditing from "./EssayEditing.js";
import AboutContact from "./AboutContact.js";
import BlogViewer from "./BlogViewer.js";
import BlogBrowser from "./BlogBrowser.js";
import BlogCMS from "./BlogCMS.js";
import UserRegistration from "./UserAuth/UserRegistration.js";
import AccountSettings from "./UserAuth/AccountSettings.js";
import Four0Four from "./Four0Four.js";

export default class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="Main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Seeds Vietnam" component={Home} />
                    <Route path="/Seeds ACT" component={SeedsACT} />
                    <Route path="/SheCodes" component={SheCodes} />
                    <Route path="/Essay Editing" component={EssayEditing} />
                    <Route path="/About &amp; Contact" component={AboutContact} />
                    <Route exact path="/Blog" component={BlogBrowser} />
                    <Route exact path="/Blog/:id/:title" component={BlogViewer} />
                    <Route path="/BlogCMS" component={BlogCMS} />
                    <Route path="/registration" component={UserRegistration} />
                    <Route exact path="/user/settings/:id" render={(props) => <AccountSettings {...props}
                                                                                               isLoggedIn={this.props.isLoggedIn}
                                                                                               isAdmin={this.props.isAdmin}/>} />
                    <Route exact path="*" component={Four0Four} />
                </Switch>
			</div>
		);
	}
}

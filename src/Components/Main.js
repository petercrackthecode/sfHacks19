import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from "./Home.js";
import SeedsACT from "./SeedsACT.js";
import SheCodes from "./SheCodes.js";
import EssayEditing from "./EssayEditing.js";
import AboutContact from "./AboutContact.js";
import BlogViewer from "./BlogViewer.js";
import BlogBrowser from "./BlogBrowser.js";
import CreateNewPost from "./CreateNewPost.js";
import EditDraft from "./EditDraft.js";
import EditBlog from "./EditBlog.js";
import BlogCMS from "./BlogCMS.js";
import UserRegistration from "./UserAuth/UserRegistration.js";
import AccountSettings from "./AccountSettings.js";
import AccountViewer from "./AccountViewer.js";
import Four0Four from "./Four0Four.js";

export default class Main extends Component {
	constructor(props) {
		super(props);
	}

    reloadUserMetadata = () => {
	    this.props.reloadUserMetadata();
    };

	render() {
		let amp= '&';
		return(
			<div className="Main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />
                    <Route path="/SeedsVietnam" component={Home} />
                    <Route path="/SeedsACT" component={SeedsACT} />
                    <Route path="/SheCodes" component={SheCodes} />
                    <Route path="/EssayEditing" component={EssayEditing} />
                    <Route path='/About&Contact' component={AboutContact} />
                    <Route exact path="/Blog" component={BlogBrowser} />
                    <Route exact path="/Blog/:id/:title" component={BlogViewer} />
                    <Route exact path="/:id/createNewPost" render={(props) => <CreateNewPost {...props}
                                                                                             reloadUserMetadata={this.reloadUserMetadata}
                                                                                             uid={this.props.uid}
                                                                                             user_metadata={this.props.user_metadata}
                                                                                             isLoggedIn={this.props.isLoggedIn}
                                                                                             isAdmin={this.props.isAdmin}/>} />
                    <Route exact path="/editDraft/:id" render={(props) => <EditDraft {...props}
                                                                                     reloadUserMetadata={this.reloadUserMetadata}
                                                                                     user_metadata={this.props.user_metadata}
                                                                                     uid={this.props.uid}
                                                                                     isLoggedIn={this.props.isLoggedIn}
                                                                                     isAdmin={this.props.isAdmin}/>} />
                    <Route exact path="/editBlog/:id" render={(props) => <EditBlog {...props}
                                                                                   reloadUserMetadata={this.reloadUserMetadata}
                                                                                   user_metadata={this.props.user_metadata}
                                                                                   uid={this.props.uid}
                                                                                   isLoggedIn={this.props.isLoggedIn}
                                                                                   isAdmin={this.props.isAdmin}/>} />
                    <Route path="/BlogCMS" component={BlogCMS} />
                    <Route path="/registration" render={() => <UserRegistration isLoggedIn={this.props.isLoggedIn}/>} />
                    <Route exact path="/user/settings/:id" render={(props) => <AccountSettings {...props}
                                                                                               reloadUserMetadata={this.reloadUserMetadata}
                                                                                               uid={this.props.uid}
                                                                                               user_metadata={this.props.user_metadata}
                                                                                               isLoggedIn={this.props.isLoggedIn}
                                                                                               isAdmin={this.props.isAdmin}/>} />
                    <Route exact path="/user/:id/:ref" render={(props) => <AccountViewer {...props}/>}/>
                    <Route exact path="*" component={Four0Four} />
                </Switch>
			</div>
		);
	}
}

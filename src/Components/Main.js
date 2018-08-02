import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import Home from "./Home.js";
import SeedsACT from "./SeedsACT.js";
import SheCodes from "./SheCodes.js";
import EssayEditing from "./EssayEditing.js";
import AboutContact from "./AboutContact.js";
import Blog from "./Blog.js";

export default class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="Main">
				<Route exact path="/" component={Home} />
				<Route path="/Home" component={Home} />
				<Route path="/Seeds Vietnam" component={Home} />
				<Route path="/Seeds ACT" component={SeedsACT} />
				<Route path="/SheCodes" component={SheCodes} />
				<Route path="/Essay Editing" component={EssayEditing} />
				<Route path="/About &amp; Contact" component={AboutContact} />
				<Route path="/Blog" component={Blog} />
			</div>
		);
	}
}

import React, {Component} from 'react';

export default class Blog extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	    console.log(this.props);
    }

	render() {
		return(
			<div>
				Blog
				{this.props.match.params.id}
			</div>
		);
	}
}

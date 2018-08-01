import React, {Component} from 'react';
import { Card } from "@blueprintjs/core";
import seedsVietnam from "../Images/seedsVietnamBanner.jpg";
import seedsACT from "../Images/seedsACTBanner.jpg";
import sheCodes from "../Images/sheCodesBanner.jpg";
import essayEditing from "../Images/essayEditingBanner.jpg";
import blog from "../Images/blogBanner.jpg";

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="homePage" style={{width: "100%", height: "100%"}}>
				<table style={{width: "100%", height: "100%"}}>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr style={{height: "calc(100% / 3)"}}>
							<td colSpan="2" rowspan="3">
								<img src={seedsVietnam} style={{width: "100%", height: "100%"}}/>
							</td>
							<td>
								<img src={seedsVietnam} style={{width: "100%", height: "100%"}}/>
							</td>
						</tr>
						<tr style={{height: "calc(100% / 3)"}}>
							<td>
								<img src={seedsVietnam} style={{width: "100%", height: "100%"}}/>
							</td>
						</tr>
						<tr style={{height: "calc(100% / 3)"}}>
							<td>
								<img src={seedsVietnam} style={{width: "100%", height: "100%"}}/>
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<img src={seedsVietnam} style={{width: "100%", height: "100%"}}/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

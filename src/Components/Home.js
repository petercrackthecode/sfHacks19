import React, {Component} from 'react';
import { Card } from "@blueprintjs/core";
import seedsVietnam from "../Images/seedsVietnamBanner_900x675.jpg";
import seedsACT from "../Images/seedsACTBanner.jpg";
import sheCodes from "../Images/sheCodesBanner.jpg";
import essayEditing from "../Images/essayEditingBanner.jpg";
import blog from "../Images/blogBanner.jpg";
import { PageSummary } from "../Constants/constants.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagePeek: "",
			pagePeekContent: PageSummary,
		}
		this.timeout = null;
	}

	renderPagePeekContent = () => {
		return (
			<div style={{fontSize: "18px", whiteSpace: "pre-wrap", textAlign: "justify"}}>
				<div><h3>{this.state.pagePeek}</h3></div>
				{this.state.pagePeekContent[this.state.pagePeek]}
				<br /><br />
				<a href={"/" + this.state.pagePeek}><i>Click để biết thêm về {this.state.pagePeek}</i></a>
			</div>
		);
	}

	render() {
		return(
			<div className="homePage">
				<div className="pagePeek-desktop" style={{width: "60%", float: "left"}}>
					<table>
						<thead>
							<tr>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr style={{height: "calc(100% / 3)"}}>
								<td colSpan="2" rowSpan="3" style={{width: "calc(100% / 3 * 2)", overflow: "hidden"}}>
									<img className="flash" src={seedsVietnam} style={{width: "100%"}} alt="Seeds Vietnam"
										onMouseOver={this.handleHoverBanner} onMouseLeave={clearTimeout(this.timeout)}
										onClick={(e) => {window.location.href="/Home#Về Seeds Vietnam"}}/>
								</td>
								<td style={{pading: "0px"}}>
									<img className="flash" src={seedsACT} style={{width: "100%", height: "auto"}} alt="Seeds ACT"
										onMouseOver={this.handleHoverBanner} onMouseLeave={clearTimeout(this.timeout)}
										onClick={(e) => {window.location.href="/" + e.target.alt}}/>
								</td>
							</tr>
							<tr style={{height: "calc(100% / 3)"}}>
								<td>
									<img className="flash" src={sheCodes} style={{width: "100%", height: "auto"}} alt="SheCodes"
										onMouseOver={this.handleHoverBanner} onMouseLeave={clearTimeout(this.timeout)}
										onClick={(e) => {window.location.href="/" + e.target.alt}}/>
								</td>
							</tr>
							<tr style={{height: "calc(100% / 3)"}}>
								<td>
									<img className="flash" src={essayEditing} style={{width: "100%", height: "auto"}} alt="Essay Editing"
										onMouseOver={this.handleHoverBanner} onMouseLeave={clearTimeout(this.timeout)}
										onClick={(e) => {window.location.href="/" + e.target.alt}}/>
								</td>
							</tr>
							<tr>
								<td colSpan="3">
									<img className="flash" src={blog} style={{width: "100%", height: "auto"}} alt="Blog"
										onMouseOver={this.handleHoverBanner} onMouseLeave={clearTimeout(this.timeout)}
										onClick={(e) => {window.location.href="/" + e.target.alt}}/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="pagePeekContent-desktop" style={{width: "40%", float: "right", marginTop: "7px"}}>
					<Card style={{minHeight: "300px"}}>
						{
							this.state.pagePeek !== ""
							? this.renderPagePeekContent()
							: <div style={{position: "relative", minHeight: "300px"}}>
								<h3 style={{position: "absolute", top: "50%", transform: "translateY(-50%)", fontSize: "18px"}}>
									Di chuột lên từng từng bức minh họa để tìm hiểu về chúng tôi!
								</h3>
							 </div>
						}
					</Card>
				</div>

			</div>
		);
	}

	handleHoverBanner = (e) => {
		// const alt = e.target.alt;
		// if (this.timeout)
		// 	clearTimeout(this.timeout);
		// this.timeout = setTimeout(() => {
		// 	this.setState({pagePeek: alt})
		// }, 500);
		e.target.hover(() => {

		})
	}

}

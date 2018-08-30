import React, {Component} from 'react';

import {Card, Tab, Tabs} from "@blueprintjs/core";
import sha256 from "sha256";

import ContentManagement from "./CMS/ContentManagement.js";
import NewContent from "./CMS/NewContent.js";
import Metrics from "./CMS/Metrics.js";

import "../CSS/blog-cms.css";

export default class BlogCMS extends Component {
	constructor() {
		super();
		this.state = {
		    secretKey: "",
        }
	};

	render() {
		return(
			<div className="blog-cms">
                <div className="secret">
                    <label className="bp3-label">
                        SecretKey:
                        <input className="bp3-input" type="password" autoComplete="new-password" onChange={(e) => this.setState({secretKey: e.target.value})}/>
                    </label>
                </div>
                {
                    sha256(this.state.secretKey) === sha256("imjustthebest")
                        ? <div className="ControlPanel">
                            <Card>
                                <Tabs id="ControlPanelTab" defaultSelectedTabId="CMS" large={true}>
                                    <Tab id="CMS" title="Điều khiển nội dung" panel={<ContentManagement />}/>
                                    <Tab id="newBlog" title="Tạo blog mới" panel={<NewContent />} />
                                    <Tab id="metrics" title="Số liệu về trang" panel={<Metrics />} />
                                    <Tabs.Expander />
                                </Tabs>
                            </Card>
                        </div>
                        : null
                }

			</div>
		);
	}
}

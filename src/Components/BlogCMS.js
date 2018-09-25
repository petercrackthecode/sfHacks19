import React, {Component} from 'react';

import {Card, Tab, Tabs} from "@blueprintjs/core";
import sha256 from "sha256";

import SiteManagement from "./CMS/SiteManagement.js";
import NewContent from "./CMS/NewContent.js";
import Metrics from "./CMS/Metrics.js";

import "../CSS/blog-cms.css";

export default class BlogCMS extends Component {
	constructor() {
		super();
		this.state = {
		    // secretKey: "",
        }
	};

	render() {
		return(
			<div className="blog-cms">
				<div className="control-panel">
					<Card>
						<Tabs id="control-panel-tab" defaultSelectedTabId="site-management" large={true}>
							<Tab id="site-management" title="Điều khiển/Quản lý Trang" panel={<SiteManagement />}/>
							<Tab id="new-content" title="Tạo blog mới" panel={<NewContent />} />
							<Tab id="metrics" title="Số liệu về trang" panel={<Metrics />} />
							<Tabs.Expander />
						</Tabs>
					</Card>
				</div>
			</div>
		);
	}
}

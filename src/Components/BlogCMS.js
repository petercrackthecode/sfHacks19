import React, {Component} from 'react';

import {Card, Tab, Tabs} from "@blueprintjs/core";

import ContentManagement from "./CMS/ContentManagement.js";
import NewContent from "./CMS/NewContent.js";
import Metrics from "./CMS/Metrics.js";

import "../CSS/CMS.css";

export default class BlogCMS extends Component {
	// constructor(props) {
	// 	super(props);
	// };

	render() {
		return(
			<div className="blog-cms">
                <div className="ControlPanel">
                    <Card>
                        <Tabs id="ControlPanelTab" defaultSelectedTabId="CMS" large={true}>
                            <Tab id="CMS" title="Điều khiển nội dung" panel={<ContentManagement />}/>
                            <Tab id="newBlog" title="Tạo blog mới" panel={<NewContent />} />
                            <Tab id="metrics" title="Số liệu về trang" panel={<Metrics />} />
                            <Tabs.Expander />
                        </Tabs>
                    </Card>
                </div>

			</div>
		);
	}
}

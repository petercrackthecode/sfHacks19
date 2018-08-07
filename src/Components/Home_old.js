import React, {Component} from 'react';
import { Card } from "@blueprintjs/core";
import seedsVietnam from "../Images/seedsVietnamBanner_900x710.jpg";
import seedsACT from "../Images/seedsACTBanner_400x200.jpg";
import sheCodes from "../Images/sheCodesBanner_400x200.jpg";
import essayEditing from "../Images/essayEditingBanner_400x200.jpg";
import blog from "../Images/blogBanner.jpg";
import { PageSummary } from "../Constants/constants.js";
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import SurveyCollector from "./SurveyCollector.js";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagePeek: "",
			pagePeekContent: PageSummary,
		};
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
	};

	render() {
		return(
			<div className="homePage">
				<div className="quickStart-desktop" style={{display: "block", overflow: "hidden", marginBottom: "20px"}}>
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
											onMouseOver={this.handleHoverBanner} onMouseLeave={() => clearTimeout(this.timeout)}
											onClick={(e) => {window.location.href="/Home#Về Seeds Vietnam"}}/>
									</td>
									<td style={{pading: "0px"}}>
										<img className="flash" src={seedsACT} style={{width: "100%", height: "auto"}} alt="Seeds ACT"
											onMouseOver={this.handleHoverBanner} onMouseLeave={() => clearTimeout(this.timeout)}
											onClick={(e) => {window.location.href="/" + e.target.alt}}/>
									</td>
								</tr>
								<tr style={{height: "calc(100% / 3)"}}>
									<td>
										<img className="flash" src={sheCodes} style={{width: "100%", height: "auto"}} alt="SheCodes"
											onMouseOver={this.handleHoverBanner} onMouseLeave={() => clearTimeout(this.timeout)}
											onClick={(e) => {window.location.href="/" + e.target.alt}}/>
									</td>
								</tr>
								<tr style={{height: "calc(100% / 3)"}}>
									<td>
										<img className="flash" src={essayEditing} style={{width: "100%", height: "auto"}} alt="Essay Editing"
											onMouseOver={this.handleHoverBanner} onMouseLeave={() => clearTimeout(this.timeout)}
											onClick={(e) => {window.location.href="/" + e.target.alt}}/>
									</td>
								</tr>
								<tr>
									<td colSpan="3">
										<img className="flash" src={blog} style={{width: "100%", height: "auto"}} alt="Blog"
											onMouseOver={this.handleHoverBanner} onMouseLeave={() => clearTimeout(this.timeout)}
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

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
					<div className="pageDivider" data-color="green"></div>
				</div>
				<div id="Về Seeds Vietnam" className="pageSection" data-color="green">
					<div className="sectionTitle"><h1 style={{marginTop: "0px"}}>SEEDS VIETNAM</h1></div>
					<div className="sectionContent">
						<p>SEEDS Vietnam được thành lập vào tháng 7/2017 với sứ mệnh truyền cảm hứng cho thế hệ trẻ Việt Nam vượt qua những bất bình đẳng trên con đường học vấn để nắm lấy tri thức cho chính mình.</p>
						<br />
						<p>Trong thời gian vừa qua, SEEDS Vietnam đã tập trung thực hiện các chương trình trong 2 lĩnh vực Du học Hoa Kỳ và Giáo dục Công nghệ thông tin. Trong tương lai, SEEDS Vietnam mong muốn có thể cung cấp một nền tảng vững chắc cho học sinh Việt Nam trong hai lĩnh vực này.</p>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="green">
					<div className="pageDivider" data-color="white"></div>
				</div>
				<div id="Nội Dung" className="pageSection" data-color="white">
					<div className="sectionTitle"><h1 style={{marginTop: "0px"}}>CHƯƠNG TRÌNH</h1></div>
					<div className="sectionContent" style={{display: "table"}}>
						<div style={{display: "table-cell", width: "33%", padding: "10px"}}>
							<div style={{borderRadius: "50%", border: "1px solid green", padding: "5px", overflow: "hidden"}}>
								<img src={seedsACT} style={{width: "100%"}}/>
							</div>
							<div><h3>Seeds ACT</h3></div>
							<div style={{height: "2px", backgroundColor: "green"}}></div>
							<div><p>Chương trình hỗ trợ du học Hoa Kỳ 10 tháng miễn phí cho học sinh đến từ gia đình thu nhập trung bình / thấp</p></div>
						</div>

						<div style={{display: "table-cell", width: "33%", padding: "10px"}}>
							<div style={{borderRadius: "50%", border: "1px solid green", padding: "5px", overflow: "hidden"}}>
								<img src={sheCodes} style={{width: "100%"}}/>
							</div>
							<div><h3>SheCodes</h3></div>
							<div style={{height: "2px", backgroundColor: "green"}}></div>
							<div><p>Hackathon 28 giờ đồng hồ dành cho phái nữ thỏa sức sáng tạo & network</p></div>
						</div>

						<div style={{display: "table-cell", width: "33%", padding: "10px"}}>
							<div style={{borderRadius: "50%", border: "1px solid green", padding: "5px", overflow: "hidden"}}>
								<img src={essayEditing} style={{width: "100%"}}/>
							</div>
							<div><h3>Essay Editing</h3></div>
							<div style={{height: "2px", backgroundColor: "green"}}></div>
							<div><p>Chương trình tư vấn luận 1-1 trong quá trình du học</p></div>
						</div>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
					<div className="pageDivider" data-color="green"></div>
				</div>
				<div id="Testimonials" className="pageSection" data-color="green">
					<div className="sectionTitle"><h1 style={{marginTop: "0px"}}>TESTIMONIALS</h1></div>
					<div className="sectionContent">
						<Accordion accordion={false}>
							<AccordionItem expanded={true}>
								<AccordionItemTitle>
									<h2 className="u-position-relative">Nguyễn Thị Quỳnh Như
										<div className="accordion__arrow"></div>
									</h2>
									<div><i>Hà Nội, Việt Nam</i></div>
								</AccordionItemTitle>
								<AccordionItemBody>
									<p>Mình đã biết SEEDS một thời gian rồi. SEEDS luôn là cuốn sách chuẩn bị hữu ích nhất với kiến thức không giới hạn về du học.
										Hơn nữa, SEEDS đóng một vai trò quan trọng trong việc kết nối mình với một số người thân thiện và thông minh nhất trên thế giới.
										Chắc chắn là mình đã trưởng thành hơn nhờ SEEDS!</p>
								</AccordionItemBody>
							</AccordionItem>
							<AccordionItem expanded={true}>
								<AccordionItemTitle>
									<h2 className="u-position-relative">Hồ Lê Anh Khoa
										<div className="accordion__arrow"></div>
									</h2>
									<div><i>Hà Nội, Việt Nam</i></div>
								</AccordionItemTitle>
								<AccordionItemBody>
									<p>Mặc dù mình chỉ biết SEEDS trong một vài tuần, mình đã theo dõi và sử dụng các tài liệu của SEEDS
										và điều đó giúp mình tự lập hơn rất nhiều trong quá trình du học.
										Những kinh nghiệm này chắc chắn là những thứ mình sẽ mang theo mình trong tương lai.</p>
								</AccordionItemBody>
							</AccordionItem>
							<AccordionItem expanded={true}>
								<AccordionItemTitle>
									<h2 className="u-position-relative">Nguyễn Khánh Linh
										<div className="accordion__arrow"></div>
									</h2>
									<div><i>Hà Nội, Việt Nam</i></div>
								</AccordionItemTitle>
								<AccordionItemBody>
									<p>3 từ dành cho SEEDS: trách nhiệm, hữu ích và tuyệt vời!!</p>
								</AccordionItemBody>
							</AccordionItem>
						</Accordion>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="green">
					<div className="pageDivider" data-color="white"></div>
				</div>
				<div id="questionSubmit" className="pageSection" data-color="white">
					<div className="sectionTitle"><h1 style={{marginTop: "0px"}}>CÂU HỎI CHO CHÚNG TÔI</h1></div>
					<div className="sectionContent">
						<SurveyCollector />
					</div>
				</div>
			</div>
		);
	}

	handleHoverBanner = (e) => {
		const alt = e.target.alt;
		if (this.timeout)
			clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			console.log("lol");
			this.setState({pagePeek: alt});
		}, 500);
	};

}

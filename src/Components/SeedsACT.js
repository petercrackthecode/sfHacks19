import React, {Component} from 'react';

import seedsACT from "../Images/seedsACTBanner.jpg";

import SignupForm from "./SignupForm.js";

export default class SeedsAct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="Seeds-ACT">
				<div>
					<img src={seedsACT} style={{width: "100%"}} alt="Seeds ACT"/>
				</div>
				<div id="Về-Seeds-ACT" className="pageSection" data-color="white">
					<div className="section-title"><h1 style={{marginTop: "0px"}}>SEEDS ACT</h1></div>
					<div className="section-content">
						<p>SEEDS Act là chương trình hỗ trợ du học Hoa Kỳ miễn phí trong vòng
							<b> 10 tháng</b> do <b>SEEDS</b> cộng tác cùng <b>Đại sứ quán Mỹ </b>
							và tổ chức <b>EduQ</b> thuộc Brazil thực hiện</p>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
					<div className="page-divider" data-color="orange"/>
				</div>
				<div id="Đối-tượng-tham-gia" className="pageSection" data-color="orange">
					<div className="section-title"><h1 style={{marginTop: "0px"}}>ĐỐI TƯỢNG THAM GIA</h1></div>
					<div className="section-content">
						<p>SEEDS Vietnam được thành lập vào tháng 7/2017 với sứ mệnh truyền cảm hứng cho thế hệ trẻ Việt Nam vượt qua những bất bình đẳng trên con đường học vấn để nắm lấy tri thức cho chính mình.</p>
						<br />
						<p>Trong thời gian vừa qua, SEEDS Vietnam đã tập trung thực hiện các chương trình trong 2 lĩnh vực Du học Hoa Kỳ và Giáo dục Công nghệ thông tin. Trong tương lai, SEEDS Vietnam mong muốn có thể cung cấp một nền tảng vững chắc cho học sinh Việt Nam trong hai lĩnh vực này.</p>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="orange">
					<div className="page-divider" data-color="white"/>
				</div>
				<div id="Cách-hoạt-động" className="pageSection" data-color="white">
					<div className="section-title"><h1 style={{marginTop: "0px"}}>CÁCH HOẠT ĐỘNG</h1></div>
					<div className="section-content">
						<p>SEEDS Vietnam được thành lập vào tháng 7/2017 với sứ mệnh truyền cảm hứng cho thế hệ trẻ Việt Nam vượt qua những bất bình đẳng trên con đường học vấn để nắm lấy tri thức cho chính mình.</p>
						<br />
						<p>Trong thời gian vừa qua, SEEDS Vietnam đã tập trung thực hiện các chương trình trong 2 lĩnh vực Du học Hoa Kỳ và Giáo dục Công nghệ thông tin. Trong tương lai, SEEDS Vietnam mong muốn có thể cung cấp một nền tảng vững chắc cho học sinh Việt Nam trong hai lĩnh vực này.</p>
					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
					<div className="page-divider" data-color="orange"/>
				</div>
				<div id="Đơn-vị-cộng-tác" className="pageSection" data-color="orange">
					<div className="section-title"><h1 style={{marginTop: "0px"}}>ĐƠN VỊ CỘNG TÁC</h1></div>
					<div className="section-content">

					</div>
				</div>

				<div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="orange">
					<div className="page-divider" data-color="white"/>
				</div>
				<div id="Đăng-ký" className="pageSection" data-color="white">
					<div className="section-title"><h1 style={{marginTop: "0px"}}>CÁCH ĐĂNG KÍ THAM GIA</h1></div>
					<div className="section-content">
						<div><p>Chương trình sẽ được <u>bắt đầu vào tháng 2</u> và <u>kết thúc vào tháng 12</u> hàng năm.
							Form đăng kí sẽ được mở <u>1-1.5 tháng</u> trước khi chương trình chính thức bắt đầu.
							Để nhận được thông tin khi đơn đăng ký mở, bạn có thể điền email tại đây:</p></div>
						<SignupForm subject="seedACT"/>
					</div>
				</div>
			</div>
		);
	}
}

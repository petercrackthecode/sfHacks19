import React, {Component} from 'react';

// components import
import SheCodesTable from './SheCodesTable.js';

// CSS imports
import '../CSS/she-codes.css';

// Image import
import sheCodesBanner from '../Images/sheCodesBeautifulBanner.jpg';
import logoSheCodes1 from '../Images/logoOfSheCodes_1.png';
import logoSheCodes2 from '../Images/logoOfSheCodes_2.png';
import logoSheCodes3 from '../Images/logoOfSheCodes_3.png';
import logoSheCodes4 from '../Images/logoOfSheCodes_4.png';
import logoSheCodes5 from '../Images/logoOfSheCodes_5.png';
import sheCodesSponsors1 from '../Images/SponsorsLogo/sheCodesSponsors_1.png';
import sheCodesSponsors2 from '../Images/SponsorsLogo/sheCodesSponsors_2.png';
import sheCodesSponsors3 from '../Images/SponsorsLogo/sheCodesSponsors_3.png';
import sheCodesSponsors4 from '../Images/SponsorsLogo/sheCodesSponsors_4.png';
import sheCodesSponsors5 from '../Images/SponsorsLogo/sheCodesSponsors_5.png';
import sheCodesSponsors6 from '../Images/SponsorsLogo/sheCodesSponsors_6.png';
import sheCodesSponsors7 from '../Images/SponsorsLogo/sheCodesSponsors_7.png';
import sheCodesSponsors8 from '../Images/SponsorsLogo/sheCodesSponsors_8.png';


export default class SheCodes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="she-codes">
				<img src={sheCodesBanner} alt="sheCodesBanner" style={{width: "100%"}}/>

                <div id="Về Seeds Vietnam" className="pageSection" data-color="white">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>SHECODES</h1></div>
                    <div className="section-content">
                        <p>Hackathon đầu tiên dành cho nữ giới <i>không yêu cầu kinh nghiệm lập trình</i> tại Việt Nam!</p>
                        <br/>
                        <section className='flex-box' id="container_1">
                            <section className='box'>
                                <img src={logoSheCodes1} alt='Kết bạn, giao lưu với cộng đồng phái nữ hùng mạnh!'/><br/>
                                <p>Kết bạn, giao lưu với cộng đồng phái nữ hùng mạnh!</p>
                            </section>
                            <section className='box'>
                                <img src={logoSheCodes2} alt='Xây dựng sản phẩm theo đội trong vòng 24h' /><br/>
                                <p>Xây dựng sản phẩm theo đội trong vòng 24h</p>
                            </section>
                        </section>
                        <section className='flex-box' id='container_2'>
                            <section className='box'>
                                <img src={logoSheCodes3} alt='Network cùng diễn giả nổi tiếng và các công ty cùng nhiều cơ hội tuyển dụng'/><br/>
                                <p>Network cùng diễn giả nổi tiếng và các công ty cùng nhiều cơ hội tuyển dụng</p>
                            </section>
                            <section className='box'>
                                <img src={logoSheCodes4} alt='Học những kiến thức quý giá về Công nghệ qua các workshop' /><br/>
                                <p>Học những kiến thức quý giá về Công nghệ qua các workshop</p>
                            </section>
                        </section>
                    </div>
                </div>

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
                    <div className="page-divider" data-color="green"/>
                </div>

                <div id="Về Seeds Vietnam" className="pageSection" data-color="green">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>CHI TIẾT CHƯƠNG TRÌNH NĂM 2018</h1></div>
                    <div className="section-content">
                        <SheCodesTable className='flex-box'/>
                    </div>
                </div>

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="green">
                    <div className="page-divider" data-color="white"/>
                </div>

                <div id="Về Seeds Vietnam" className="pageSection" data-color="white">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>ĐƠN VỊ HỢP TÁC</h1></div>
                    <div className="section-content">
                        <section className='flex-box'>
                            <a className='box' src='https://wisevietnam.org/'><img src={sheCodesSponsors1} title='WISE- Sáng kiến hỗ trợ phụ nữ khởi nghiệp và kinh doanh' alt='WISE'/></a>
                            <a className='box' src='https://coccoc.com/'><img src={sheCodesSponsors2} title='Trình duyệt và công cụ tìm kiếm Cốc Cốc' alt='Cốc Cốc'/></a>
                            <a className='box' src='http://www.babson.edu/Pages/default.aspx'><img src={sheCodesSponsors3} title='Babson College' alt='Babson College'/></a>
                        </section>
                        <section className='flex-box'>
                            <a className='box' src='https://truejuice.vn/'><img src={sheCodesSponsors4} title='Nước ép nguyên chất từ rau củ quả hữu cơ giao tận nơi tại Hà Nội' alt='True Juice Vietnam'/></a>
                            <a className='box' src='http://gauuniform.vn/'><img src={sheCodesSponsors5} title='Gấu Uniform' alt='Gấu Uniform'/></a>
                            <a className='box' src='http://innovatube.com/'><img src={sheCodesSponsors6} title='Innovatube' alt='Innovatube'/></a>
                        </section>
                        <section className='flex-box'>
                            <a className='box' src='https://techkids.vn/'><img src={sheCodesSponsors7} title='Tech kids- Coding School' alt='Tech Kids'/></a>
                            <a className='box' src='http://up-co.vn/en/'><img src={sheCodesSponsors8} title='Up Coworking Space - Best Coworking Space in Vietnam' alt='Up Coworking Space'/></a>
                        </section>
                    </div>
                </div>

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
                    <div className="page-divider" data-color="green"/>
                </div>

                <div id="Về Seeds Vietnam" className="pageSection" data-color="green">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>CÁCH ĐĂNG KÍ THAM GIA</h1></div>
                    <div className="section-content">
                        <p className='flex-box'>Sự kiện sẽ được tổ chức vào tháng 7 hằng năm. Đơn đăng kí tham dự chương trình sẽ được mở 1 tháng trước sự kiện chính. Để nhận được thông tin khi đơn đăng kí mở, bạn có thể điền thông tin tại đây: </p>
                        <form action='' className='subcribe-box' id='subscribe-box'>
                            <p style={{width: '49.6vw', margin: '0 auto', fontSize: "1.5em", padding: "10px"}}>Đăng kí ngay để nhận thông tin tức thời</p><br/>
                            <span style={{display: 'inline'}}>
                                <i className='fa fa-user icon'/>
                                <input id='name-box' className='common-box' type='text' placeholder='Tên'/>
                                <i className='fa fa-envelope icon'/>
                                <input id='name-box' className='common-box' type='email' placeholder='Địa chỉ Email'/>
                                <button className='button-decoration'>Đăng kí</button>
                            </span>
                        </form>
                    </div>
                </div>
			</div>
		);
	}
}

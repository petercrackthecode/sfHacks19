import React, {Component} from 'react';
// import {Button, Card, PanelStack} from "@blueprintjs/core";
import firebase from "./firebase.js";
import seedsVietnam_banner from "../Images/seedsVietnamBanner.jpg";
import seedsACT_banner from "../Images/seedsACTBanner.jpg";
import sheCodes_banner from "../Images/sheCodesBanner.jpg";
import essayEditing_banner from "../Images/essayEditingBanner.jpg";
import seedsACT_logo from "../Images/seedsACTLogo.png";
import sheCodes_logo from "../Images/sheCodesLogo.png";
import essayEditing_logo from "../Images/essayEditingLogo.png";

import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody} from 'react-accessible-accordion';
import "../CSS/accordion.css";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../CSS/home-page.css";

// import {GetCurrentTime} from "../Helpers/HelperFn";
import BlogCrawler from "./BlogCrawler.js";
import SurveyCollector from "./SurveyCollector.js";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog_list: null,
            gallery: [],
        };
    };

    componentDidMount = () => {
        this.setGalleryImages();
        this.fetchBlogs();
    };

    fetchBlogs = () => {
        const blog_list = [];
        const blogsRef = firebase.database().ref("blogs/");
        blogsRef.orderByKey().limitToLast(5).on("value", (snapshot) => {
            let items = snapshot.val();
            for (let i in items) {
                if (i === "sequence") continue;

                blog_list.push(items[i]);
            }
            blog_list.reverse();
            this.setState({blog_list: blog_list});
        });

    };

    setGalleryImages = () => {
        const images = [
            {
                original: seedsVietnam_banner
            },
            {
                original: seedsACT_banner
            },
            {
                original: sheCodes_banner
            },
            {
                original: essayEditing_banner
            },
        ];
        this.setState({gallery: images});
    };

    renderBlogCrawler = () => {
        return ( <BlogCrawler list={this.state.blog_list} /> );
    };

    render() {
        return (
            <div className="homePage">
                {
                    this.state.blog_list !== null
                    ? this.renderBlogCrawler()
                    : null
                }

                <div className="pageGallery">
                    <ImageGallery items={this.state.gallery}
                                  showBullets={true}
                                  autoPlay={true}
                                  showGalleryPlayButton={false}
                                  showThumbnails={false}
                                  showNav={true}
                    />
                </div>

                <div id="Về Seeds Vietnam" className="pageSection" data-color="white">
                    <div className="sectionTitle"><h1 style={{marginTop: "0px"}}>SEEDS VIETNAM</h1></div>
                    <div className="section-content">
                        <p>SEEDS Vietnam được thành lập vào tháng 7/2017 với sứ mệnh truyền cảm hứng cho thế hệ trẻ Việt
                            Nam vượt qua những bất bình đẳng trên con đường học vấn để nắm lấy tri thức cho chính
                            mình.</p>
                        <br/>
                        <p>Trong thời gian vừa qua, SEEDS Vietnam đã tập trung thực hiện các chương trình trong 2 lĩnh
                            vực Du học Hoa Kỳ và Giáo dục Công nghệ thông tin. Trong tương lai, SEEDS Vietnam mong muốn
                            có thể cung cấp một nền tảng vững chắc cho học sinh Việt Nam trong hai lĩnh vực này.</p>
                    </div>
                </div>

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
                    <div className="page-divider" data-color="green"></div>
                </div>
                <div id="Về Seeds Vietnam" className="pageSection" data-color="green">
                    <div className="sectionTitle"><h1 style={{marginTop: "0px"}}>SEEDS VIETNAM</h1></div>
                    <div className="section-content">
                        <p>SEEDS Vietnam được thành lập vào tháng 7/2017 với sứ mệnh truyền cảm hứng cho thế hệ trẻ Việt
                            Nam vượt qua những bất bình đẳng trên con đường học vấn để nắm lấy tri thức cho chính
                            mình.</p>
                        <br/>
                        <p>Trong thời gian vừa qua, SEEDS Vietnam đã tập trung thực hiện các chương trình trong 2 lĩnh
                            vực Du học Hoa Kỳ và Giáo dục Công nghệ thông tin. Trong tương lai, SEEDS Vietnam mong muốn
                            có thể cung cấp một nền tảng vững chắc cho học sinh Việt Nam trong hai lĩnh vực này.</p>
                    </div>
                </div>

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="green">
                    <div className="page-divider" data-color="white"></div>
                </div>
                <div id="Nội Dung" className="pageSection" data-color="white">
                    <div className="sectionTitle"><h1 style={{marginTop: "0px"}}>CHƯƠNG TRÌNH</h1></div>
                    <div className="section-content" style={{display: "table"}}>
                        <div style={{display: "table-cell", width: "33%", padding: "15px"}}>
                            <div>
                                <img src={seedsACT_logo} alt="SeedsACT Logo"/>
                            </div>
                            <div><h3>Seeds ACT</h3></div>
                            <div style={{height: "2px", backgroundColor: "green"}}></div>
                            <div><p>Chương trình hỗ trợ du học Hoa Kỳ 10 tháng miễn phí cho học sinh đến từ gia đình thu
                                nhập trung bình / thấp</p></div>
                        </div>
                        <div style={{display: "table-cell", width: "33%", padding: "15px"}}>
                            <div>
                                <img src={sheCodes_logo} alt="SheCodes Logo"/>
                            </div>
                            <div><h3>SheCodes</h3></div>
                            <div style={{height: "2px", backgroundColor: "green"}}></div>
                            <div><p>Hackathon 28 giờ đồng hồ dành cho phái nữ thỏa sức sáng tạo & network</p></div>
                        </div>
                        <div style={{display: "table-cell", width: "33%", padding: "15px"}}>
                            <div>
                                <img src={essayEditing_logo} alt="Essay Editing Logo"/>
                            </div>
                            <div><h3>Essay Editing</h3></div>
                            <div style={{height: "2px", backgroundColor: "green"}}></div>
                            <div><p>Chương trình tư vấn luận 1-1 trong quá trình du học</p></div>
                        </div>
                    </div>
                </div>
                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
                    <div className="page-divider" data-color="green"></div>
                </div>
                <div id="Testimonials" className="pageSection" data-color="green">
                    <div className="sectionTitle"><h1 style={{marginTop: "0px"}}>TESTIMONIALS</h1></div>
                    <div className="section-content">
                        <Accordion accordion={false}>
                            <AccordionItem expanded={true}>
                                <AccordionItemTitle>
                                    <h2 className="u-position-relative">Nguyễn Thị Quỳnh Như
                                        <div className="accordion__arrow"></div>
                                    </h2>
                                    <div><i>Hà Nội, Việt Nam</i></div>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <p>Mình đã biết SEEDS một thời gian rồi. SEEDS luôn là cuốn sách chuẩn bị hữu ích
                                        nhất với kiến thức không giới hạn về du học.
                                        Hơn nữa, SEEDS đóng một vai trò quan trọng trong việc kết nối mình với một số
                                        người thân thiện và thông minh nhất trên thế giới.
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
                                    <p>Mặc dù mình chỉ biết SEEDS trong một vài tuần, mình đã theo dõi và sử dụng các
                                        tài liệu của SEEDS
                                        và điều đó giúp mình tự lập hơn rất nhiều trong quá trình du học.
                                        Những kinh nghiệm này chắc chắn là những thứ mình sẽ mang theo mình trong tương
                                        lai.</p>
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
                    <div className="page-divider" data-color="white"></div>
                </div>
                <div id="questionSubmit" className="pageSection" data-color="white">
                    <div className="sectionTitle"><h1 style={{marginTop: "0px"}}>CÂU HỎI CHO CHÚNG TÔI</h1></div>
                    <div className="section-content">
                        <SurveyCollector/>
                    </div>
                </div>
            </div>
        );
    }
}

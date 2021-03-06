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
import "../CSS/accordion.css";
import BlogCrawler from "./BlogCrawler.js";
import SurveyCollector from "./SurveyCollector.js";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog_list: [],
            gallery: [],
        };
    };

    componentDidMount = () => {
        setTimeout(() => {
            this.setGalleryImages();
            this.fetchBlogs().then(() => {
                this.state.blog_list.forEach((blog, index) => {
                    this.getAuthor(index);
                });
            });
        }, 1500);
    };

    fetchBlogs = () => {
        const blog_list = [];
        const blogsRef = firebase.database().ref("blogs/");
        return new Promise((resolve, reject) => {
            blogsRef.orderByChild("createTimeStamp").limitToLast(5).on("value", (snapshot) => {
                console.log();
                let items = snapshot.val();
                for (let i in items) {
                    blog_list.push(items[i]);
                }
                blog_list.reverse();
                this.setState({blog_list: blog_list}, () => {return resolve()});
            });
        });
    };

    getAuthor = (index) => {
        const userRef = firebase.database().ref("user_metadata/" + this.state.blog_list[index].author);
        userRef.on("value", snapshot => {
            let temp = this.state.blog_list;
            temp[index].author = snapshot.val().pseudonym;
            this.setState({blog_list: temp}, () => console.log(this.state.blog_list));
        });
    };

    setGalleryImages = () => {
        const images = [
            { original: seedsVietnam_banner },
            { original: seedsACT_banner },
            { original: sheCodes_banner },
            { original: essayEditing_banner },
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
                        : <div className="bp3-skeleton" style={{height: "110px", width: "100%"}}/>
                }

                <div className="pageGallery">
                    {
                        this.state.gallery.length > 0
                            ? <ImageGallery items={this.state.gallery}
                                            showBullets={true}
                                            showGalleryPlayButton={true}
                                            showThumbnails={false}
                                            showNav={true}/>
                            : <div className="bp3-skeleton" style={{height: "780px", width: "100%"}}/>
                    }
                </div>

                <div id="Về-Seeds-Vietnam" className="pageSection" data-color="white">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>SEEDS VIETNAM</h1></div>
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
                    <div className="page-divider" data-color="green"/>
                </div>
                <div id="Nội-Dung" className="pageSection" data-color="green">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>CHƯƠNG TRÌNH</h1></div>
                    <div className="section-content">
                        <div style={{padding: "15px", display: "block", overflow: "hidden", borderBottom: "1px #0000006b dashed"}}>
                            <img src={seedsACT_logo} alt="SeedsACT Logo" style={{float: "left"}}/>
                            <div style={{float: "right", width: "calc(100% - 30px - 128px)", textAlign: "left"}}>
                                <h3 style={{marginTop: "0"}}>Seeds ACT</h3>
                                Chương trình hỗ trợ du học Hoa Kỳ 10 tháng miễn phí cho học sinh đến từ gia đình thu nhập trung bình / thấp
                            </div>
                        </div>
                        <div style={{padding: "15px", display: "block", overflow: "hidden", borderBottom: "1px #0000006b dashed"}}>
                            <img src={sheCodes_logo} alt="SheCodes Logo" style={{float: "right"}}/>
                            <div style={{float: "left", width: "calc(100% - 30px - 128px)", textAlign: "right"}}>
                                <h3 style={{marginTop: "0"}}>SheCodes</h3>
                                Hackathon 28 giờ đồng hồ dành cho phái nữ thỏa sức sáng tạo & network
                            </div>
                        </div>
                        <div style={{padding: "15px", display: "block", overflow: "hidden"}}>
                            <img src={essayEditing_logo} alt="Essay Editing Logo" style={{float: "left"}}/>
                            <div style={{float: "right", width: "calc(100% - 30px - 128px)", textAlign: "left"}}>
                                <h3 style={{marginTop: "0"}}>Essay Editing</h3>
                                Chương trình tư vấn viết và sửa các bài luận 1-1 trong quá trình du học
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="green">
                    <div className="page-divider" data-color="white"/>
                </div>
                <div id="Testimonials" className="pageSection" data-color="white">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>TESTIMONIALS</h1></div>
                    <div className="section-content" style={{textAlign: "left"}}>
                        <Accordion accordion={false}>
                            <AccordionItem expanded={true}>
                                <AccordionItemTitle>
                                    <h2 className="u-position-relative">Nguyễn Thị Quỳnh Như
                                        <div className="accordion__arrow"/>
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
                                        <div className="accordion__arrow"/>
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
                                        <div className="accordion__arrow"/>
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

                <div style={{position: "relative", height: "35px", overflow: "hidden"}} data-color="white">
                    <div className="page-divider" data-color="green"/>
                </div>
                <div id="questionSubmit" className="pageSection" data-color="green">
                    <div className="section-title"><h1 style={{marginTop: "0px"}}>CÂU HỎI CHO CHÚNG TÔI</h1></div>
                    <div className="section-content">
                        <SurveyCollector/>
                    </div>
                </div>
            </div>
        );
    }
}

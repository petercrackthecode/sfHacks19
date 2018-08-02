import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header.js";
import Main from "./Components/Main.js";

class App extends Component {
    constructor() {
        super();
        this.state = {
            pageStructure: {
                "Home": ["Về Seeds Vietnam", "Nội Dung", "Testimonials"],
                "Seeds ACT": ["Về Seeds ACT", "Đối tượng tham gia", "Cách hoạt động", "Đơn vị cộng tác", "Đăng ký"],
                "SheCodes": ["Về SheCodes", "Chi tiết chương trình", "Đơn vị cộng tác", "Đăng ký"],
                "Essay Editing": ["Về Essay Editing", "Quyền lợi", "Dịch vụ", "Counselor của Seeds Vietnam", "Đăng ký"],
                "About & Contact": [],
                "Blog": [],
            },
        }
    }

	render() {
		return (
            <div className="App">
    			<Header pageStructure={this.state.pageStructure}/>
                <div className="lightBar" style={{width: "100%", height: "3px", backgroundColor: "grey"}}></div>
                <Main />
    		</div>
        );
	}
}

export default App;

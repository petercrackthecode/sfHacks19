import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header.js";
import Main from "./Components/Main.js";
import firebase from "./Components/firebase.js";

import {GetCurrentTime} from "./Helpers/HelperFn";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            uid: "",
            isAdmin: false,
            user_metadata: {},
        }
        this.pageStructure = {
            "Home": ["Về Seeds Vietnam", "Nội Dung", "Testimonials"],
            "Seeds ACT": ["Về Seeds ACT", "Đối tượng tham gia", "Cách hoạt động", "Đơn vị cộng tác", "Đăng ký"],
            "SheCodes": ["Về SheCodes", "Chi tiết chương trình", "Đơn vị cộng tác", "Đăng ký"],
            "Essay Editing": ["Về Essay Editing", "Quyền lợi", "Dịch vụ", "Counselor của Seeds Vietnam", "Đăng ký"],
            "About & Contact": [],
            "Blog": [],
        }
    }

    componentWillMount() {
        localStorage.setItem("lastAccessed", GetCurrentTime("ms"));
    }

    componentDidMount() {
        const lastAccessed = localStorage.getItem("lastAccessed");
        const timeElapsed = GetCurrentTime("ms") - parseInt(lastAccessed);
        const appPrevState = localStorage.getItem("appState");
        if (timeElapsed <= 18000000) {
            this.setState(JSON.parse(appPrevState));
        }
    }

    authenticated = (uid, isAdmin) => {
        this.getUserMetadata(uid).then(() => {
            this.setState({
                isLoggedIn: true,
                uid: uid,
                isAdmin: isAdmin,
            }, () => {
                localStorage.setItem("appState", JSON.stringify(this.state));
            });
        });
    };

    getUserMetadata = (uid) => {
        const userRef = firebase.database().ref("user_metadata/" + uid);
        return new Promise((resolve, reject) => {
            userRef.on("value", snapshot => {
                this.setState({user_metadata: snapshot.val()}, () => {return resolve()});
            })
        });
    };

	render() {
		return (
            <div className="App">
    			<Header pageStructure={this.pageStructure}
                        authenticated={this.authenticated}
                        isLoggedIn={this.state.isLoggedIn}
                        uid={this.state.uid}
                        isAdmin={this.state.isAdmin}
                        user_metadata={this.state.user_metadata}/>

                <div className="lightBar" style={{width: "100%", height: "3px", backgroundColor: "grey", marginTop: "3px", marginBottom: "7px"}}></div>

                <Main isLoggedIn={this.state.isLoggedIn}
                      uid={this.state.uid}
                      isAdmin={this.state.isAdmin}
                      user_metadata={this.state.user_metadata}/>
    		</div>
        );
	}
}

export default App;

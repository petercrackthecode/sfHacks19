import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header.js";
import Main from "./Components/Main.js";
import firebase from "./Components/firebase.js";
import AppToaster from "./Components/Toaster.js";

import {GetCurrentTime} from "./Helpers/HelperFn";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            uid: "",
            isAdmin: false,
            user_metadata: {},
        };
        this.pageStructure = {
            "Home": ["Về Seeds Vietnam", "Nội Dung", "Testimonials"],
            "Seeds ACT": ["Về Seeds ACT", "Đối tượng tham gia", "Cách hoạt động", "Đơn vị cộng tác", "Đăng ký"],
            "SheCodes": ["Về SheCodes", "Chi tiết chương trình", "Đơn vị cộng tác", "Đăng ký"],
            "Essay Editing": ["Về Essay Editing", "Quyền lợi", "Dịch vụ", "Counselor của Seeds Vietnam", "Đăng ký"],
            'About & Contact': [],
            "Blog": [],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        const lastAccessed = localStorage.getItem("lastAccessed");
        const timeElapsed = GetCurrentTime("ms") - lastAccessed;
        const appPrevState = localStorage.getItem("appState");
        if (timeElapsed <= 18000000) {
            this.setState(JSON.parse(appPrevState));
        } else {
            localStorage.removeItem("appState");
            localStorage.removeItem("lastAccessed");
        }
        localStorage.setItem("lastAccessed", GetCurrentTime("ms"));
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

    reloadUserMetadata = () => {
        this.getUserMetadata(this.state.uid);
    };

    getUserMetadata = (uid) => {
        if (uid === "") return;
        const userRef = firebase.database().ref("user_metadata/" + uid);
        return new Promise((resolve, reject) => {
            userRef.on("value", snapshot => {
                this.setState({user_metadata: snapshot.val()}, () => {
                    localStorage.setItem("appState", JSON.stringify(this.state));
                    return resolve();
                });
            });
        });
    };

    signOut = () => {
        this.setState({
            isLoggedIn: false,
            uid: "",
            isAdmin: false,
            user_metadata: {},
        }, () => {
            localStorage.setItem("appState", JSON.stringify(this.state));
            AppToaster.show({
                message: "Đăng xuất thành công!",
                intent: "success"
            });
            window.location.href="/Home";
        });
    };

    subscribe = () => {
        const userRef = firebase.database().ref("user_metadata/" + this.state.uid);
        return new Promise((resolve, reject) => {
            userRef.child("subscribe_state").set(true)
                .then(() => {
                    this.reloadUserMetadata();
                    return resolve();
                }).catch(() => {
                    return reject();
                });
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
                        user_metadata={this.state.user_metadata}
                        signOut={this.signOut} subscribe={this.subscribe}/>

                <div className="lightBar" style={{width: "100%", height: "3px", backgroundColor: "grey", marginTop: "10px", marginBottom: "7px"}}></div>

                <Main isLoggedIn={this.state.isLoggedIn}
                      reloadUserMetadata={this.reloadUserMetadata}
                      uid={this.state.uid}
                      isAdmin={this.state.isAdmin}
                      user_metadata={this.state.user_metadata}/>
    		</div>
        );
	}
}

export default App;

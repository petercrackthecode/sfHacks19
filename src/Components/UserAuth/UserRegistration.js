import React, {Component} from "react";
import {Button} from "@blueprintjs/core";
import AppToaster from "../Toaster.js";
import firebase from "../firebase.js";

import "../../CSS/user-registration.css";

export default class UserRegistration extends Component {
    constructor() {
        super();
        this.state = {
            real_name: "",
            display_name: "",
            pseudonym: "",
            email: "",
            password: "",
        }
    }

    writeUserDataToDB = (uid, metadata) => {
        const database = firebase.database();
        return database.ref("user_metadata/" + uid).set({
            real_name: metadata["real_name"],
            display_name: metadata["display_name"],
            isVerified: false,
            pseudonym: metadata["pseudonym"],
            profile_pic: "",
            introduction: "",
            subscribe_state: false,
        });
    };

    submitNewAccInfo = (e) => {
        e.preventDefault();
        const accInfoList = ["real_name", "display_name", "pseudonym", "email", "password"];
        const accInfoMap = {};
        let index = 0;
        for (let i of e.target) {
            if (i.type === "submit") continue;
            console.log(i.value);
            accInfoMap[accInfoList[index]] = i.value;
            index++;
        }
        console.log(accInfoMap);

        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(accInfoMap["email"], accInfoMap["password"])
            .then((user) => {
                this.writeUserDataToDB(user.user.uid, accInfoMap)
                    .then(() => {
                        user.user.sendEmailVerification()
                            .then(() => {
                                AppToaster.show({ message: "Email xác minh đã gửi đến tài khoản của bạn", intent: "success" });
                                window.location.href="/Home";
                            })
                            .catch(() => {
                                AppToaster.show({ message: "Email xác minh gửi thất bại", intent: "danger" });
                                user.user.delete();
                            });
                    })
                    .catch((error) => {
                        AppToaster.show({ message: "Tạo tài khoản thất bại", intent: "danger" });
                        AppToaster.show({ message: "Hãy gửi email seedsvietnam.contact@gmail.com để có thêm chi tiết", intent: "danger" });
                    });
            })
            .catch((error) => {
                console.log(error);
                AppToaster.show({ message: error.message, intent: "danger" });
            });

        this.refs["new-user-form"].reset();
    };

    render() {
        return(
            <div className="user-registration">
                <div className="account-info">
                    <div>
                        <h2>Tạo Tài Khoản Mới</h2>
                    </div>
                    <form ref="new-user-form" onSubmit={this.submitNewAccInfo}>
                        <label className="bp3-label" htmlFor="acc-name">Tên Người Dùng/User Name:*
                            <input id="acc-name" type="text" className="bp3-input bp3-fill" onChange={this.handleRealName} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-display-name">Tên Tài Khoản/Account Name:*
                            <input id="acc-display-name" type="text" className="bp3-input bp3-fill" onChange={this.handleDisplayName} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-pseudonym">Bút Danh/Pseudonym:
                            <input id="acc-pseudonym" type="text" className="bp3-input bp3-fill" onChange={this.handlePseudonym}/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-email">Email:*
                            <input id="acc-email" type="text" className="bp3-input bp3-fill" onChange={this.handleEmail} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-password">Mật Khẩu/Password:*
                            <input id="acc-password" type="password" className="bp3-input bp3-fill" onChange={this.handlePassword} required/>
                        </label>
                        <div>
                            <Button type="submit" text="Xác minh email và Tạo Tài Khoản!"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    handleRealName = (e) => {
        this.setState({real_name: e.target.value});
    };
    handleDisplayName = (e) => {
        this.setState({display_name: e.target.value});
    };
    handlePseudonym = (e) => {
        this.setState({pseudonym: e.target.value});
    };
    handleEmail = (e) => {
        this.setState({email: e.target.value});
    };
    handlePassword = (e) => {
        this.setState({password: e.target.value});
    };
}
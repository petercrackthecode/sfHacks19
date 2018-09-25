import React, {Component} from "react";
import {Button} from "@blueprintjs/core";
import AppToaster from "../Toaster.js";
import firebase from "../firebase.js";
import slugify from "slugify";
import "../../CSS/user-registration.css";

import green_check_icon from "../../Images/green_check_icon.png";

export default class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            real_name: "",
            display_name: "",
            pseudonym: "",
            email: "",
            password: "",
            isDisplayNameValid: false,
            isPasswordValid: false,
            isEmailValid: false,
            displayNameErrorMessage: "",
            passwordErrorMessage: "",
            emailErrorMessage: "",
        }
    }

    componentWillMount() {
        this.timer = null;
        this.passwordRegexNumber = new RegExp("[0-9]+");
        this.passwordRegexChar = new RegExp("[a-zA-Z]+");
        this.passwordRegexSpecial = new RegExp("[^0-9A-Za-z_\\-!@]");
    }

    writeUserDataToDB = (uid, metadata) => {
        const database = firebase.database();
        return database.ref("user_metadata/" + uid).set({
            real_name: metadata["real_name"],
            display_name: metadata["display_name"],
            isVerified: false,
            pseudonym: metadata["pseudonym"],
            profile_pic: "https://storage.googleapis.com/seeds-vietnam.appspot.com/site/profile_pic/empty_profile_pic.jpeg",
            introduction: "",
            subscribe_state: false,
        });
    };

    submitNewAccInfo = (e) => {
        e.preventDefault();
        if (!this.state.isDisplayNameValid || !this.state.isPasswordValid || !this.state.isEmailValid) {
            AppToaster.show({ message: "Kiểm tra lại các thông tin bạn nhé!", intent: "danger" });
            return;
        }
        const accInfoList = ["real_name", "display_name", "pseudonym", "email", "password"];
        const accInfoMap = {};
        let index = 0;
        for (let i of e.target) {
            if (i.type === "submit") continue;
            console.log(i.value);
            accInfoMap[accInfoList[index]] = i.value;
            index++;
        }
        if (accInfoMap.pseudonym.trim() === "") accInfoMap.pseudonym = accInfoMap.real_name;

        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(accInfoMap["email"], accInfoMap["password"])
            .then((user) => {
                this.writeUserDataToDB(user.user.uid, accInfoMap)
                    .then(() => {
                        user.user.sendEmailVerification()
                            .then(() => {
                                AppToaster.show({ message: "Email xác minh đã gửi đến tài khoản của bạn", intent: "success" });
                                AppToaster.show({ message: "Hãy xác minh và đăng nhập lại bạn nhé! Quay lại trang chủ...", intent: "success" });
                                setTimeout(() => {
                                    window.location.href="/Home";
                                }, 4000);
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

    renderCreateNewAccount = () => {
        return(
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
                        <p className="error-tooltip"><i>{this.state.displayNameErrorMessage}</i></p>
                    </label>

                    <label className="bp3-label" htmlFor="acc-pseudonym">Bút Danh/Pseudonym:
                        <input id="acc-pseudonym" type="text" className="bp3-input bp3-fill" onChange={this.handlePseudonym}/>
                    </label>

                    <label className="bp3-label" htmlFor="acc-email">Email:*
                        <input id="acc-email" type="text" className="bp3-input bp3-fill" onChange={this.handleEmail} required/>
                        <p className="error-tooltip"><i>{this.state.emailErrorMessage}</i></p>
                    </label>

                    <label className="bp3-label" htmlFor="acc-password">Mật Khẩu/Password:*
                        <input id="acc-password" type="password" className="bp3-input bp3-fill" onChange={this.handlePassword} required/>
                        <p className="error-tooltip"><i>{this.state.passwordErrorMessage}</i></p>
                    </label>

                    <div style={{marginTop: "10px"}}>
                        <Button type="submit" text="Xác minh email và Tạo Tài Khoản!"/>
                    </div>
                </form>
            </div>
        );
    };

    render() {
        return(
            <div className="user-registration">
                {
                    this.props.isLoggedIn
                        ? <div>Bạn phải đăng xuất để tạo tài khoản mới!</div>
                        : this.renderCreateNewAccount()
                }
            </div>
        );
    };

    handleRealName = (e) => {
        this.setState({real_name: e.target.value});
    };
    handleDisplayName = (e) => {
        let value = e.target.value;
        const checkAvailableUserName = firebase.functions().httpsCallable('checkAvailableUserName');
        this.setState({isDisplayNameValid: false});
        this.setState({displayNameErrorMessage: ""});
        clearTimeout(this.timer);
        this.setState({display_name: value}, () => {
            this.timer = setTimeout(() => {
                if (value === "") {
                    this.setState({displayNameErrorMessage: "Tên tài khoản không thể trống"});
                    this.setState({isDisplayNameValid: false});
                    return;
                }
                if (value.includes(" ")) {
                    this.setState({displayNameErrorMessage: "Tên tài khoản không thể có dấu cách"});
                    this.setState({isDisplayNameValid: false});
                    return;
                }
                checkAvailableUserName({id: slugify(value)}).then((result) => {
                    this.setState({isDisplayNameValid: JSON.parse(result.data)});
                    if (!JSON.parse(result.data))
                        this.setState({displayNameErrorMessage: "Tên tài khoản này đã tồn tại"})
                });
            }, 400);
        });
    };
    handlePseudonym = (e) => {
        this.setState({pseudonym: e.target.value});
    };
    handleEmail = (e) => {
        let value = e.target.value;
        this.setState({isEmailValid: false});
        this.setState({emailErrorMessage: ""});
        clearTimeout(this.timer);
        this.setState({email: value}, () => {
            this.timer = setTimeout(() => {
                if (this.state.email === "") {
                    this.setState({isEmailValid: false});
                    this.setState({emailErrorMessage: "Địa chỉ email không được trống"});
                    return;
                }
                if (this.state.email.includes(" ")) {
                    this.setState({isEmailValid: false});
                    this.setState({emailErrorMessage: "Địa chỉ email không được có dấu cách"});
                    return;
                }
                if (!this.state.email.includes("@")) {
                    this.setState({isEmailValid: false});
                    this.setState({emailErrorMessage: "Địa chỉ email không hợp lệ"});
                    return;
                }
                this.setState({isEmailValid: true});
            }, 300);
        });
    };
    handlePassword = (e) => {
        let value = e.target.value;
        this.setState({isPasswordValid: false});
        this.setState({passwordErrorMessage: ""});
        clearTimeout(this.timer);
        this.setState({password: value}, () => {
            this.timer = setTimeout(() => {
                if (this.state.password.length < 8) {
                    this.setState({isPasswordValid: false});
                    this.setState({passwordErrorMessage: "Mật khẩu phải có ít nhất 8 kí tự"});
                    return;
                }
                if (!this.passwordRegexNumber.test(this.state.password)) {
                    this.setState({isPasswordValid: false});
                    this.setState({passwordErrorMessage: "Mật khẩu phải có ít nhất 1 số"});
                    return;
                }
                if (!this.passwordRegexChar.test(this.state.password)) {
                    this.setState({isPasswordValid: false});
                    this.setState({passwordErrorMessage: "Mật khẩu phải có ít nhất 1 chữ"});
                    return;
                }
                if (this.passwordRegexSpecial.test(this.state.password)) {
                    this.setState({isPasswordValid: false});
                    this.setState({passwordErrorMessage: "Mật khẩu chỉ được có các kí tự đặc biệt: ! - _ @"});
                    return;
                }
                this.setState({isPasswordValid: true});
            }, 300);
        });
    };
}
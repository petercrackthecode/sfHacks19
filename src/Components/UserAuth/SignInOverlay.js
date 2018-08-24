import React, {Component} from "react";
import {Overlay, Button} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core";
import AppToaster from "../Toaster.js";
import firebase from "../firebase.js";

export default class SignInOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    checkIfAdminUser = (uid) => {
        const userRef = firebase.database().ref("user_privilege");
        return new Promise((resolve, reject) => {
            userRef.orderByChild(uid).on("child_added", (data) => {
                if(data.key === uid) {
                    if (data.val() !== null && data.val() === "admin"){
                        return resolve(true);
                    }
                    if (data.val() !== null && data.val() !== "admin") {
                        return resolve(false);
                    }
                } else {
                    return resolve(false);
                }
            });
        });
    };

    authenticateUser = (e) => {
        e.preventDefault();
        this.setState({isSignInClicked: false});
        firebase.auth().signInWithEmailAndPassword(this.refs["username"].value, this.refs["password"].value)
        .then((user) => {
            AppToaster.show({
                message: "Đăng nhập thành công!",
                intent: Intent.SUCCESS
            });
            const uid = firebase.auth().currentUser.uid;
            const displayName = firebase.auth().currentUser.displayName;
            this.checkIfAdminUser(uid).then((isAdmin) => {
                console.log(isAdmin);
                if(isAdmin) {
                    AppToaster.show({
                        message: "Chào mừng quản lý! Chúc bạn 1 ngày tốt lành!",
                        intent: Intent.SUCCESS
                    });
                }
                if (!isAdmin && displayName !== null){
                    AppToaster.show({
                        message: "Chào mừng " + displayName,
                        intent: Intent.SUCCESS
                    });
                }
                if (!isAdmin && displayName === null){
                    AppToaster.show({
                        message: "Chào mừng bạn! Chúc bạn ngày tốt lành!",
                        intent: Intent.SUCCESS
                    });
                }
            });
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
            AppToaster.show({
                message: "Lỗi đăng nhập: " + errorMessage,
                intent: Intent.DANGER
            });
        });
        this.refs["sign-in-form"].reset();
    };

    render() {
        return(
            <Overlay isOpen={this.props.isVisible} hasBackdrop={false} autoFocus={false}>
                <div style={{
                    backgroundColor: "#D5DADF",
                    width: "240px",
                    borderRadius: "5px",
                    margin: "1px",
                    padding: "5px",
                    left: this.props.posx,
                    top: this.props.posy}}>
                    <form ref="sign-in-form" onSubmit={this.authenticateUser}>
                        <div style={{marginBottom: "10px"}}>
                            <label htmlFor="username">Email/Tên Tài Khoản:</label><br/>
                            <input className="pt-input" type="text"
                                   ref="username" style={{marginTop: "10px"}}
                                   onChange={(e) => {this.setState({username: e.target.value})}}/>
                        </div>
                        <div style={{marginBottom: "15px"}}>
                            <label htmlFor="password">Mật Khẩu:</label><br/>
                            <input className="pt-input" type="password"
                                   ref="password" style={{marginTop: "10px"}}
                                   onChange={(e) => {this.setState({password: e.target.value})}}/>
                        </div>
                        <div>
                            <Button className="pt-button" type="submit" text="Đăng nhập"/>
                        </div>
                        <div style={{padding: "5px"}}>
                            <a href="registration" role="button" tabIndex={0}><i>Chưa có tài khoản? Đăng ký ngay</i></a>
                        </div>
                    </form>
                </div>
            </Overlay>
        );
    }
}

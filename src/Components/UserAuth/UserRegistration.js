import React, {Component} from "react";
import {Button} from "@blueprintjs/core";

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

    };

    render() {
        return(
            <div className="user-registration">
                <div className="account-info">
                    <div>
                        <h2>Tao Tai Khoan Moi</h2>
                    </div>
                    <form onSubmit={this.submitNewAccInfo}>
                        <label className="bp3-label" htmlFor="acc-name">Ten Nguoi Dung:*
                            <input id="acc-name" type="text" className="bp3-input bp3-fill" onChange={this.handleRealName} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-display-name">Ten Tai Khoan:*
                            <input id="acc-display-name" type="text" className="bp3-input bp3-fill" onChange={this.handleDisplayName} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-pseudonym">But Danh:
                            <input id="acc-pseudonym" type="text" className="bp3-input bp3-fill" onChange={this.handlePseudonym}/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-email">Email:*
                            <input id="acc-email" type="text" className="bp3-input bp3-fill" onChange={this.handleEmail} required/>
                        </label>

                        <label className="bp3-label" htmlFor="acc-password">Mat Khau:*
                            <input id="acc-password" type="password" className="bp3-input bp3-fill" onChange={this.handlePassword} required/>
                        </label>
                        <div>
                            <Button type="submit" text="Tao Tai Khoan!"/>
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
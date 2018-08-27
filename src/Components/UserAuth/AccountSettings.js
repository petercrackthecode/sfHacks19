import React, {Component} from "react";
import firebase from "../firebase.js";
import {AppToaster} from "../Toaster.js";

import {Card, Button, Overlay, Intent} from "@blueprintjs/core";
import {Tab, Tabs, Label, Tooltip, Position} from "@blueprintjs/core";
import resizeImage from "resize-image";

// import {GetCurrentTime} from "./helpers/HelperFn.js";

// import "../css/account-settings.css"

export default class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="account-settings">

            </div>
        );
    }
}
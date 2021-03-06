import React, {Component} from "react";
import {Overlay, Button} from "@blueprintjs/core";

export default class UserAccOverlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Overlay isOpen={this.props.isVisible} hasBackdrop={false} autoFocus={false} className="user-acc-overlay">
                <div style={{
                    backgroundColor: "#D5DADF",
                    width: "240px",
                    borderRadius: "5px",
                    margin: "1px",
                    padding: "5px",
                    left: this.props.posx,
                    top: this.props.posy}}>
                    <div className="profile-pic" style={{minHeight: "70px"}}>
                        {
                            this.props.user_metadata.profile_pic == null || this.props.user_metadata.profile_pic === ""
                                ? <div className="bp3-skeleton"
                                       style={{float: "left", width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto"}}/>
                                : <img src={this.props.user_metadata.profile_pic} alt="profile_pic" style={{float: "left", width: "64px", borderRadius: "50%"}}/>
                        }
                        <div style={{width: "calc((100% - 70px))", float: "right", minHeight: "70px"}}>
                            <h3 style={{lineHeight: "70px", margin: "0px"}}>@{this.props.user_metadata.display_name}</h3>
                        </div>
                    </div>
                    <div className="bp3-menu-divider"/>
                    <div>
                        <a href={"/user/settings/@" + this.props.user_metadata.display_name} role="button" className="bp3-button bp3-icon-user bp3-fill bp3-minimal bp3-large">
                            Thông tin cá nhân
                        </a>
                        {
                            this.props.isAdmin
                                ? <a href="/BlogCMS" role="button" className="bp3-button bp3-icon-briefcase bp3-fill bp3-minimal bp3-large">
                                    Quản lý blog
                                  </a>
                                : null
                        }
                    </div>
                    <div>
                        <a href={"/@" + this.props.user_metadata.display_name + "/createNewPost"} role="button" className="bp3-button bp3-icon-user bp3-fill bp3-minimal bp3-large">
                            Tạo post mới
                        </a>
                    </div>
                    <div className="bp3-menu-divider"/>
                    <div>
                        <Button className="bp3-icon-log-out bp3-fill bp3-minimal bp3-large" onClick={this.props.signOut}>
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </Overlay>
        );
    }
}
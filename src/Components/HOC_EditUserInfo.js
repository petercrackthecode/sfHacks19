import React, {Component} from "react";
import {Button, Card} from "@blueprintjs/core";

const HOC_EditUserInfo = (WrappedComponent) => {
    return class Test extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isHovered: false,
            }
        }

        render() {
            return(
                <div style={{position: "relative", display: "inline-block", paddingTop: "5px", paddingRight: "25px"}}
                     onMouseOver={() => this.setState({isHovered: true})}
                     onMouseLeave={() => this.setState({isHovered: false})}>
                    {
                        this.state.isHovered
                            ? <Button className="bp3-icon-edit bp3-minimal bp3-small"
                                      style={{position: "absolute", top: "0", right: "0"}}
                                      onClick={this.props.clickHandle}/>
                            : null
                    }
                    <WrappedComponent {...this.props}/>
                </div>
            );
        }
    }
};

class HOC_UserProfilePic extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <img className="bp3-card bp3-interactive bp3-elevation-2" src={this.props.src} alt={this.props.alt} style={{padding: "3px"}}/>
        );
    }
}

class HOC_UserAttribute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {this.props.text}
            </div>
        );
    }
}

export const WrappedUserProfilePic = HOC_EditUserInfo(HOC_UserProfilePic);
export const WrappedUserAttribute = HOC_EditUserInfo(HOC_UserAttribute);
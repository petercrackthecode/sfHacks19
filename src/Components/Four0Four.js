import React, {Component} from "react";

import "../CSS/four-0-four.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Four0Four extends Component {

    render() {
        return(
            <div className="four-0-four blue-bg" style={{minHeight: "1000px"}}>
                <div className="col-md-12" style={{top: "48vmin"}}>
                    <div className="dog">
                        <div className="dog-head">
                            <div className="dog-nose"></div>
                            <div className="dog-eye">
                                <div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="dog-ear"></div>
                            <div className="dog-smile">
                                <div className="dog-fang1"></div>
                                <div className="dog-fang2"></div>
                                <div className="dog-tongue"></div>
                            </div>
                        </div>
                        <div className="dog-body">
                            <div className="dog-tail"></div>
                            <div className="dog-spot"></div>
                            <div className="dog-leg1">
                                <div></div>
                            </div>
                            <div className="dog-leg2">
                                <div></div>
                            </div>
                            <div className="dog-leg3">
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <h1>404</h1>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="message">
                        <h2>I'm only cute when you touch me</h2>
                        <p>{"Mình rất vui vì bạn đang cố hack trang này...Nhưng để lần khác nhé <3 <3 <3"}</p><br />
                        <div className="btndiv"><a href="/Home">
                            <button className="btnpop">Về Trang Chủ</button>
                        </a></div>
                    </div>
                </div>
            </div>
        );
    }
}
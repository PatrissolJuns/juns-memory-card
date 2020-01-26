import React, {Component} from 'react';
import Logo from '../assets/images/logo.png';
import MenuIcon from '../assets/images/menu_icon.png';

import JMCTitle from "./UIElements/JMCTitle";

class Header extends Component {

    render() {
        return (
            <header>
              <div className="head_top">
                <div className="header">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-1 logo_section">
                        <div className="full">
                          <div className="center-desk">
                            <div className="logo">
                              <a href="#"><img src={Logo} alt="#" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-10">
                        <JMCTitle
                            displayPaddingBottom={false}
                            paddingButtonTitle={"pb-2"}
                            title="Welcome to the Juns Memory Game"
                        />
                      </div>
                      <div className="col-md-1">
                        <div className="right_header_info">
                          <ul>
                            {/*<li className="menu_iconb">
                              <a href="Javascript:void(0)">Login</a>
                            </li>*/}
                            <li>
                              <a href={"/"} type="button" id="sidebarCollapse">
                                <i className="fa fa-home fa-2x"> </i>
                              </a>
                              {/*<button type="button" id="sidebarCollapse">
                                <img src={MenuIcon} alt="#"/>
                              </button>
                              */}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
        );
    }
}

export default Header;
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../Contexts/Authentication";

import "./SideBar.css";

const DATA_MENU = [
  {
    no: 1,
    nama: "Home",
    icon: "fa-home",
    route: "/home",
  },
  {
    no: 2,
    nama: "Supplier",
    icon: "fa-box",
    route: "/supplier",
  },
];

const MenuContent = (props) => {
  return (
    <Link to={props.data.route}>
      <div className="sidebar-content">
        <i className={`fas ${props.data.icon} sidebar-content-icon`}></i>
        {props.data.nama}
      </div>
    </Link>
  );
};

export default class SideBar extends Component {
  static contextType = AuthContext;

  onClickLogout = () => {
    this.context.changeAuthToFalse();
  };

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-user">
          <div className="row">
            <div className="col-3">
              <div className="sidebar-icon-user">
                {this.context.data.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12 sidebar-user-name">
                  {this.context.data.username}
                </div>
              </div>
              <div className="row">
                <div className="col-12 sidebar-user-status">
                  <i className="fas fa-circle sidebar-user-status-icon"></i>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="sidebar-line" />
        {DATA_MENU.map((data) => {
          return <MenuContent key={data.no} data={data}></MenuContent>;
        })}
        <hr className="sidebar-line" />
        <div onClick={this.onClickLogout} className="sidebar-content">
          <i className={`fas fa-sign-out-alt sidebar-content-icon`}></i>
          Logout
        </div>
      </div>
    );
  }
}

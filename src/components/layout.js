import React from "react";

export default function layout(props) {
  return (
    <div className="layout-main">
      <div className="nav-bar">
        <div className="nav-right">
          <li className="active">Service Provider</li>
          <li>Content Provider</li>
        </div>
        <div className="nav-left">
          Filter by :{" "}
          <select name="" id="">
            <option value="">This Year</option>
          </select>
        </div>
      </div>
      <div className="side-bar">
        <div className="brand">Telecomme</div>
        <ul>
          <li>Services</li>
          <li>Accounts</li>
          <li className="active">Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="content-main">{props.children}</div>
    </div>
  );
}

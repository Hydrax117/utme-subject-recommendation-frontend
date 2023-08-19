import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <Link to="/user/dashboard">Profile</Link>
        </li>
        <li>
          <Link to="/Subject-combination">Subject Combination</Link>
        </li>
        <li>
          <Link to="/user/update-profile">Update Profile</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};
export const SidebarContainer = styled.div`
  margin-left: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;
  background-color: #9a616d;
  padding: 20px;
`;
export default Sidebar;

import { BiBookAdd, BiMenu, BiSolidDashboard, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
export const LogoCont = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 80px;
  width: 100%;
`;
export const NavLink = styled(Link)`
  color: black;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  display: block;

  cursor: pointer;
  &.active {
    color: #000000;
  }
`;

const AdminSidebar = () => {
  const url = window.location.href;

  return (
    <>
      <div
        id="menu"
        onClick={() => {
          document.getElementById("menu").style.opacity = 0;
          document.getElementById("lgMenu").classList.add("enter");
        }}
      >
        |||
      </div>
      <div id="lgMenu">
        <span
          id="exit"
          onClick={() => {
            document.getElementById("lgMenu").classList.remove("enter");
            document.getElementById("menu").style.opacity = 1;
          }}
        >
          &times;
        </span>
        <ul>
          <li
            className={
              url === "http://localhost:3000/admin/dashboard" ? "active" : "v"
            }
          >
            <NavLink to="/admin/dashboard">
              <LogoCont>
                <label htmlFor="">
                  <BiSolidDashboard fontSize={"40px"} />
                </label>
                <label htmlFor=""> dashbord</label>
              </LogoCont>
            </NavLink>
          </li>
          <li
            className={
              url === "http://localhost:3000/admin/add-institution"
                ? "active"
                : "v"
            }
          >
            <NavLink to="/admin/add-institution">
              <LogoCont>
                <label htmlFor="">
                  <BiBookAdd fontSize={"40px"} />
                </label>
                <label htmlFor="">add university</label>
              </LogoCont>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;

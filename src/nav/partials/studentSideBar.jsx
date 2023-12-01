import { BiBookAdd, BiMenu, BiSolidDashboard, BiX } from "react-icons/bi";

import { Link } from "react-router-dom";
import { NavLink } from "./adminSideBar";
import { LogoCont } from "./adminSideBar";
import React from "react";

export const StudentSidebar = () => {
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
              url === "http://localhost:3000/candidate/profile" ? "active" : "v"
            }
          >
            <NavLink to="/candidate/profile">
              {" "}
              <LogoCont>
                <label htmlFor="">
                  <BiSolidDashboard fontSize={"40px"} />
                </label>
                <label htmlFor="">My Profile</label>
              </LogoCont>
            </NavLink>
          </li>
          <li
            className={
              url === "http://localhost:3000/candidate/subject-combination"
                ? "active"
                : "v"
            }
          >
            <NavLink to="/candidate/subject-combination">
              <LogoCont>
                <label htmlFor="">
                  <BiBookAdd fontSize={"40px"} />
                </label>
                <label htmlFor=""> Subject Combination</label>
              </LogoCont>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

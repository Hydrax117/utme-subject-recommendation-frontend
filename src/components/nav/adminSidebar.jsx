import { BiMenu, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect, useState } from "react";
import Aos from "aos";

const AdminSidebar = () => {
  const url = window.location.href;
  console.log(url);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    Aos.init();
  }, []);
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
              url === "http://localhost:3000/admin/view-universities"
                ? "active"
                : "v"
            }
          >
            <Link to="/admin/view-universities">dashbord</Link>
          </li>
          <li
            className={
              url === "http://localhost:3000/admin/add-university"
                ? "active"
                : "v"
            }
          >
            <Link to="/admin/add-university">add university</Link>
          </li>
          <li>Link Three</li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;

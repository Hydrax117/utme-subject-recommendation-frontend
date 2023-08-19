import { useState } from "react";
import { useCookies } from "react-cookie";
import "../auth/login.css";
import { Form, Btn, ErrorMsg, ErrorMsgContainer, TxtField } from "../../form";
import { Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
export const NavLink = styled(Link)`
  color: blue;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [userType, setUserType] = useState();

  const [cookies, setCookies] = useCookies(["user"]);

  const navigate = useNavigate();

  function Index() {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      // navigate("/user/dashboard", { replace: true });
      window.location.replace("/user/dashboard");
    }, 5000);
  }

  const handleSubmit = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${email}` === "" || `${password}` === "") {
      document.getElementById("errorContainer").style.display = "block";
      document.getElementById("error").innerHTML = "* please fill in the above";
      // document
      //   .getElementById("error")
      //   .insertAdjacentHTML("beforeend", "<div><h1> Hello world</h1></div>");
    } else {
      if (`${email}`.includes("@")) {
        const user = { email, password };
        const response = await axios.post("http://localhost:4000/login", user);
        if (response.data.status === 200) {
          // store the user in localStorage
          setCookies("token", response.data.data.token, {
            maxAge: 28800,
            path: "/",
          });
          setCookies("id", response.data.data._id, {
            maxAge: 28800,
            path: "/",
          });
          setCookies("email", response.data.data.email, {
            maxAge: 28800,
            path: "/",
          });
          setCookies("userType", response.data.data.userType, {
            maxAge: 28800,
            path: "/",
          });
          toast.success("Login Successfull", {
            position: toast.POSITION.TOP_CENTER,
          });

          Index();
          console.log(response.data);
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(response.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <Form className="form">
          <div className="login">
            <TxtField
              className="txt"
              label="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <div>
              <ToastContainer />
            </div>
            <ErrorMsgContainer id="errorContainer">
              <ErrorMsg id="error">something happed</ErrorMsg>
            </ErrorMsgContainer>
            <br /> <br />
            <Btn onClick={handleSubmit}>Submit</Btn>
          </div>
          <br />
          <p>
            don't have an account? <br /> click
            <NavLink to="/register">here</NavLink>
            to signup.
          </p>
        </Form>{" "}
        <br />
        <br />
      </div>
    </>
  );
};

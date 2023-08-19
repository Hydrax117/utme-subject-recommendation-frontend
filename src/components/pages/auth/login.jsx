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
  const logo = require("../../../images/loginlogo.jpeg");

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
      toast.error("please fill in all the reqiured fields", {
        position: toast.POSITION.TOP_CENTER,
      });
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
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={logo}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">Welcome Back</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="abc@gmail.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="******"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <ToastContainer style={{ marginTop: "35%" }} />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <NavLink style={{ color: "#393f81" }} to="/register">
                            register here
                          </NavLink>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

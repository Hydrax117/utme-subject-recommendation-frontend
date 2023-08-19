import { useState } from "react";
import { Form, ErrorMsg, ErrorMsgContainer, Btn, TxtField } from "../../form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

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
const Msgbox = styled.div`
  height: 50px;
  background-color: white;
  border: 1px solid green;
  padding: 10px;
  width: 98%;
  text-align: center;
  align-items: center;
`;
const Message = styled.label`
  color: green;
`;
export const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const logo = require("../../../images/loginlogo.jpeg");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["user_token"]);

  function Index() {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate("/login", { replace: true });
    }, 3000);
  }

  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${password}` === "" || `${email}` === "") {
    } else {
      fetch("http://localhost:4000/add-candidate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (result.success === false) {
            var a = result.message.toString().toUpperCase();
            toast.error(`error!,${a}`, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
          if (result.data["email"] == email) {
            toast.success("Registration Successfull!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });

            Index();
          }
        })
        .catch((error) => console.log("s error", setError(error.message)));
    }
  };

  return (
    <>
      {/* <div className="container">
        <Form>
          <div class="login">
            <ToastContainer />
            <br />
            <TxtField
              className="txt"
              label="Email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />{" "}
            <br />
            <br />
            <TxtField
              className="txt"
              label="First Name"
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Middle Name(optional)"
              name="middleName"
              type="text"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Last name"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                document.getElementById("errorContainer").style.display =
                  "none";
              }}
            />
            <br /> <br />
            <TxtField
              className="txt"
              label="Password"
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
            <ErrorMsgContainer id="errorContainer">
              <ErrorMsg id="error"> </ErrorMsg>
            </ErrorMsgContainer>
            <br /> <br />
            <Btn onClick={handleSubmit}>Submit</Btn>
            <br /> <br />
            <p>
              already have an account? <br /> click
              <NavLink to="/login">here</NavLink>
              to login.
            </p>
          </div>
        </Form>
      </div> */}

      <section className="vh-110" style={{ backgroundColor: "#9A616D" }}>
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
                          <span className="h1 fw-bold mb-0">Welcome</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign up
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
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Middle Name
                          </label>
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={middleName}
                            onChange={(e) => {
                              setMiddleName(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={dob}
                            onChange={(e) => {
                              setDob(e.target.value);
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
                            Register
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?{" "}
                          <NavLink style={{ color: "#393f81" }} to="/login">
                            login here
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

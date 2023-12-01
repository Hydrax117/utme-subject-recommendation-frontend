import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiCollapse } from "react-icons/bi";
import { network } from "../../config/config";
import { set } from "mongoose";

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

export const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const logo = require("../../images/loginlogo.jpeg");
  const [state, setState] = useState("");
  const [LGA, setLGA] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);

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
      dob: dob,
      gender: document.getElementById("gender").value,
      state: document.getElementById("states").value,
      phoneNumber: phone,
      LGA: document.getElementById("lgas").value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (
      `${password}` === "" ||
      `${email}` === "" ||
      document.getElementById("gender").value === "none"
    ) {
      alert("please fill in all the required fields");
    } else {
      fetch(`${network.serverip}/add-candidate`, requestOptions)
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
        .catch((error) => console.log("s error", console.log(error.message)));
    }
  };
  const fetchStates = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(`${network.serverip}/api/all-states`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStates(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onStateChange = async () => {
    let id = document.getElementById("states").value;
    if (id === "none") {
      document.getElementById("lgas").value = "none";
      setLgas([]);
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      await fetch(`${network.serverip}/api/all-lgas?_id=${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLgas(result.data[0]);
          console.log("id" + id);

          console.log(result.data[0]);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);
  return (
    <>
      <section
        className="bg1"
        style={{ backgroundColor: "#9A616D", height: "auto" }}
      >
        <div className="container tw py-5">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col col-xl-10">
              <div className="card tw" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-10 col-lg-10 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <center>
                            <span className="h1 fw-bold mb-0">Sign Up</span>
                          </center>
                        </div>

                        <div className="form-outline mb-4 ">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg ms-1"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <select name="" id="gender" className="mt-5">
                            <option value="none">tap to select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <br />
                          <label
                            className="form-label ms-2 mt-5"
                            htmlFor="form2Example17"
                          >
                            Phone
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg ms-1"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
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
                            placeholder=""
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-outline mb-4 d-flex ">
                          <select
                            name=""
                            id="states"
                            className="form-control"
                            onChange={onStateChange}
                          >
                            <option value="none">Tap to Select State</option>
                            {states?.map((state) => (
                              <option key={state?._id} value={state?._id}>
                                {state?.name}
                              </option>
                            ))}
                          </select>

                          <select name="" id="lgas" className="form-control">
                            <option value="none">Tap to Select Lga</option>
                            {lgas?.map((lga) => (
                              <option key={lga} value={lga}>
                                {lga}
                              </option>
                            ))}
                          </select>
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
                            placeholder="**********"
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

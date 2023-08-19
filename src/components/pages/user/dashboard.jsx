import React from "react";
import { useCookies } from "react-cookie";
import { Footer } from "../../footer/footer";
import { useState, useEffect } from "react";
import Sidebar from "../../nav/sidebar";
import styled from "styled-components";
import { SidebarContainer } from "../../nav/sidebar";
import { network } from "../../../config/config";
const profileImage = require("../../../images/profile.jpg");

const ProfileImage = styled.img`
  height: 240px;
  width: 240px;
  border-radius: 280px 280px;
`;
const ImgContainer = styled.div``;

const Card = styled.div`
  color: grey;
  box-shadow: 1px 2px 2px 2px;
  height: 230px;
`;

const UserDashboard = () => {
  const [cookies, setCookies] = useCookies(["user"]);
  const [user, setUser] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState("");
  const [isLoading, setIsloading] = useState(true);

  const fetchCandidate = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let email = cookies.email.toString();
      await fetch(
        `${network.serverip}/get-candidate?email=${email}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUser(result.data);
        })
        .catch((error) => console.log("s error", error.message));
    } catch (error) {}
  };
  useEffect(() => {
    fetchCandidate();
    setTimeout(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isLoading === true ? (
        <>
          <Sidebar /> <div className="loader"></div>
        </>
      ) : (
        <>
          <Sidebar />
          <SidebarContainer className="fadeIn">
            <div
              className="container py-5 h-100"
              style={{
                backgroundColor: "white",
                width: "80%",
                margin: "0",
                borderRadius: "1rem",
              }}
            >
              <div className="row">
                <div className="col-lg-4">
                  <ImgContainer>
                    <ProfileImage
                      src={profileImage}
                      className="img-fluid profile-img"
                    />
                  </ImgContainer>
                </div>
                <div className="col-lg-6">
                  <div className="profile">
                    <h6>
                      Name: {user?.firstName} {user?.middleName}{" "}
                      {user?.lastName}
                    </h6>
                    <h6>Email: {user?.email}</h6>
                    <h6>Dob: 3/3/2023</h6>
                    <h6>Registration Number: ABC123XYZ1</h6>
                    <h6>State of Origin: Kaduna</h6>
                  </div>
                </div>
              </div>
              <hr />
              <h3>
                <center>Institution Of Study</center>
              </h3>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <h4>First Choice</h4>
                  <p>Type: Degree Awarding</p>
                  <p>Institution: Kaduna State University(KASU)</p>
                  <p>Faculty: Sciences</p>

                  <p>Course: Bsc. Computer Science</p>
                </div>
              </div>
            </div>
            <br />
          </SidebarContainer>
          <Footer />{" "}
        </>
      )}
    </>
  );
};

export default UserDashboard;

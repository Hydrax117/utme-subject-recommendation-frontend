import React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { network } from "../../config/config";

import { StudentSidebar } from "../../nav/partials/studentSideBar";
import axios from "axios";
const profileImg = require("../../images/profile.jpg");
const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 1rem;
  float: right;
`;
const ImgContainer = styled.div``;

const Card = styled.div`
  color: grey;
  box-shadow: 1px 2px 2px 2px;
  height: 230px;
`;

const CandidateProfile = () => {
  const [cookie] = useCookies(["userCookie"]);
  const [isloading, setIsloading] = useState(true);
  const [image, setImage] = useState("");
  const [user, setUser] = useState([]);
  const url = window.location.href;
  console.log(url);

  const fetchCandidate = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let email = cookie.userCookie.email.toString();
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

  const imageUpload = async (event) => {
    // const data = new FormData();
    // data.append('file', event.target.files[0]);
    // data.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // replace with your upload preset

    var formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    try {
      const res = await axios.post("http://localhost:4000/upload", formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("successfull");
      const u = res.data.uri;
      console.log(u);
      setImage(u);
    } catch (error) {
      console.log("error " + error);
      console.log(error.request);
    }
  };

  const handleSubmit = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("img", image);
    var raw = JSON.stringify({
      image: image,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    console.log("pressed");
    await fetch(
      `${network.serverip}/image/update?_id=${cookie.userCookie._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((results) => {
        alert("successful");
      })
      .catch((error) => console.log("s error", error.message));
  };

  useEffect(() => {
    fetchCandidate();
    setInterval(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isloading === true ? (
        <div class="loader"></div>
      ) : (
        <>
          <StudentSidebar />
          <div className="  fadeIn bg1">
            <div
              className="container py-5 vh-90 mt-5"
              style={{
                backgroundColor: "white",
                width: "80%",
                margin: "auto",
                borderRadius: "1rem",
              }}
            >
              <div className="row dd">
                <div className="col-md-6">
                  <div className="profile">
                    <h2>Personal Details:</h2> <br />
                    <h6>
                      Surname/First Name/Other Name : {user?.firstName},
                      {user?.middleName} {user?.lastName}
                    </h6>
                    <h6>Date of Birth: {user.dob}</h6>
                    <span className="d-flex flex-row">
                      <h6>Gender:Male</h6>
                      <h6 className="ms-4">
                        LGA/STATE: {user?.LGA} / {user?.state}
                      </h6>
                    </span>
                    <span className="d-flex flex-row">
                      <h6>
                        Telrphone No. /eMail: {user?.phoneNumber} /{user?.email}
                      </h6>
                    </span>
                    <span className="d-flex flex-row">
                      <strong>Crn:</strong>
                      <span className="ms-1">{user?.crn}</span>
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <ImgContainer className="profile-img-cont">
                    <ProfileImage
                      src={image ? image : profileImg}
                      className="img-fluid profile-img"
                    />
                  </ImgContainer>
                  <input type="file" name="" id="" onChange={imageUpload} />
                  <button onClick={handleSubmit}>Upload</button>
                </div>
              </div>
              <hr />
              <h3>
                <center> Choice Of Institution</center>
              </h3>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <h4>First Choice</h4>
                  <span className="d-flex flex-row">
                    <strong>Institution Type:</strong>
                    <span className="ms-1">Degree-Awarding</span>
                  </span>
                  <span className="d-flex flex-row">
                    <strong>Institution: </strong>
                    <span className="ms-1">{user?.institution}</span>
                  </span>
                  <span className="d-flex flex-row">
                    <strong>Faculty:</strong>{" "}
                    <span className="ms-1">{user?.faculty} </span>
                  </span>
                  <span className="d-flex flex-row">
                    <strong>Course:</strong>
                    <span className="ms-1">{user?.course}</span>
                  </span>
                  <span className="d-flex flex-row">
                    <strong>UTME Subjects:</strong>
                    <span className="ms-1">{user?.recomSubject1}</span>
                    <span className="ms-1">{user?.recomSubject2}</span>
                    <span className="ms-1">{user?.recomSubject3}</span>
                    <span className="ms-1">{user?.recomSubject4}</span>
                  </span>
                </div>
              </div>
            </div>
            <br />
          </div>
        </>
      )}
    </>
  );
};

export default CandidateProfile;

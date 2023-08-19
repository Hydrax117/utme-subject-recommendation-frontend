import { useParams } from "react-router-dom";
import { SidebarContainer } from "../../nav/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { network } from "../../../config/config";
import AdminSidebar from "../../nav/adminSidebar";
import { Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import e from "cors";

export const UniversityDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);

  const [facultyname, setFacultyname] = useState("");
  const [facultymarks, setFacultymarks] = useState("");
  const addFaculty = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      university: id,
      cutoffmarks: facultymarks,
      name: facultyname,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${facultymarks}` === "" || `${facultyname}` === "") {
      toast.error("please fill in all the fields", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await fetch(`${network.serverip}/add-faculty`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            toast.success("faculty added Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("faculty already exist in the university  ", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => console.log("s error", error.message));
    }
  };

  const addDepartment = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: departmentName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    let facultyId = document.getElementById("faculty").value;
    console.log(facultyId);
    if (`${facultyId}` === "none") {
      toast.error("please select department", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await fetch(
        `${network.serverip}/add-department?_id=${facultyId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            toast.success("department added Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("department already exist in the faculty  ", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => console.log("s error", error.message));
    }
  };

  const fetchFaculties = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(
      `${network.serverip}/get-faculties?university=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        var a = result.data;
        setFaculties(a);
      })
      .catch((error) => console.log("s error", error.message));
  };

  const onFacultyChange = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let U_id = event.target.value;
    if (id !== "none") {
      var uni = id;
      console.log("uni", uni);

      await fetch(
        `${network.serverip}/get-courses?_id=${uni}&faculty=${U_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          var a = result.data;
          setDepartments(a);
        })
        .catch((error) => console.log("s error", error.message));
      document.getElementById("courseDiv").style.display = "block";
    }
  };

  const addcourse = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(faculty);

    var raw = JSON.stringify({
      university: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${network.serverip}/add-course?_id=${id}`);
  };

  useEffect(() => {
    fetchFaculties();
    setTimeout(() => {
      setIsloading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading === true ? (
        <>
          <AdminSidebar /> <div className="loader"></div>
        </>
      ) : (
        <>
          <AdminSidebar />
          <SidebarContainer>
            <div>
              <ToastContainer style={{ marginTop: "30%" }} />
            </div>
            <div className="row">
              <div className="col-md-6">
                <h3>Add course</h3>
                <div className="course">
                  <h4>Course title</h4> <br />
                  <input type="text" name="" id="" /> <br /> <br />
                  <h3>Select Faculty</h3>
                  <select id="faculty1" onChange={onFacultyChange}>
                    <option value="none">----</option>

                    {faculties.length > 0 ? (
                      faculties.map((faculty) => (
                        <option
                          key={faculty._id.toString()}
                          value={faculty._id}
                        >
                          {faculty.name}
                        </option>
                      ))
                    ) : (
                      <p>No Faculties yet</p>
                    )}
                  </select>
                  <br /> <br />
                  <select name="" id="">
                    <option value="">Select department</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="recomm">
                  <h5>Recommended Subject 1</h5>
                  <input type="text" name="" id="" />
                </div>

                <div className="recomm">
                  <h5>Recommended Subject 2</h5>
                  <input type="text" name="" id="" />
                </div>

                <div className="recomm">
                  <h5>Recommended Subject 3</h5>
                  <input type="text" name="" id="" />
                </div>

                <div className="recomm">
                  <h5>Recommended Subject 4</h5>
                  <input type="text" name="" id="" />
                </div>
              </div>

              <div
                className="btn btn-primary"
                style={{ margin: "10px", width: "80px" }}
              >
                Add
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <h3>add faculty</h3>
                <input
                  type="text"
                  value={facultyname}
                  placeholder="Faculty Name"
                  onChange={(event) => setFacultyname(event.target.value)}
                />{" "}
                <br /> <br />
                <input
                  type="text"
                  value={facultymarks}
                  placeholder="cutoff marks"
                  onChange={(event) => setFacultymarks(event.target.value)}
                />{" "}
                <br /> <br />
                <button className="btn btn-primary" onClick={addFaculty}>
                  Add
                </button>
              </div>
              <div className="col-md-4">
                <h3>add department</h3>
                <select id="faculty">
                  <option value="none">Select Faculty</option>

                  {faculties.length > 0 ? (
                    faculties.map((faculty) => (
                      <option key={faculty._id.toString()} value={faculty._id}>
                        {faculty.name}
                      </option>
                    ))
                  ) : (
                    <p>No Faculties yet</p>
                  )}
                </select>
                <br /> <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="department name"
                  value={departmentName}
                  onChange={(event) => setDepartmentName(event.target.value)}
                />{" "}
                <br /> <br />
                <button className="btn btn-primary" onClick={addDepartment}>
                  Add
                </button>
              </div>
            </div>
          </SidebarContainer>
        </>
      )}
    </>
  );
};

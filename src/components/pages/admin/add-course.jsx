import { useParams } from "react-router-dom";
import { SidebarContainer } from "../../nav/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { network } from "../../../config/config";
import AdminSidebar from "../../nav/adminSidebar";
import { Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddCourse = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);
  const subjects = [
    "Accounting",
    "Agricultral Science",
    "Arabic",
    "Biology",
    "Chemistry",
    "Christian Religion Studies",
    "Civic Education",
    "Commerce",
    "Computer Studies",
    "Economics",
    "Fisheries",
    "Geography",
    "Government",
    "Fisheries",
    "Hausa",
    "Islamic Studies",
    "Literature in English",
    "Mathematics",
    "Physics",
    "Technical Drawing",
  ];

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
            <section
              className="container   py-5 h-100"
              style={{
                backgroundColor: "#9a616d",
                width: "85%",
                margin: "0px",
                padding: "50px",
                borderRadius: "1rem",
                overflow: "auto",
              }}
            >
              <div>
                <ToastContainer style={{ marginTop: "30%" }} />
              </div>
              <section
                className="container   py-5 h-70"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  margin: "0px",
                  padding: "50px",
                  borderRadius: "1rem",
                }}
              >
                <div className="row " style={{ borderRadius: "1rem" }}>
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
                      <h5>Jamb Subject 1</h5>
                      <select>
                        <option value="Engish">Use of English</option>
                      </select>
                    </div>

                    <div className="recomm">
                      <h5>Jamb Subject 2</h5>
                      <select name="" id="">
                        <option value="none">------</option>
                        {subjects.map((subject) => (
                          <option value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div className="recomm">
                      <h5>Jamb Subject 3</h5>
                      <select name="" id="">
                        <option value="none">------</option>
                        {subjects.map((subject) => (
                          <option value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div className="recomm">
                      <h5>Recommended Subject 4</h5>
                      <select name="" id="">
                        <option value="none">------</option>
                        {subjects.map((subject) => (
                          <option value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div
                    className="btn btn-primary"
                    style={{ margin: "10px", width: "80px" }}
                  >
                    Add
                  </div>
                </div>
              </section>
            </section>
          </SidebarContainer>
        </>
      )}
    </>
  );
};

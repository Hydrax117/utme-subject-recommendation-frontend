import Sidebar from "../../nav/sidebar";
import { SidebarContainer } from "../../nav/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { network } from "../../../config/config";
export const SubjectConmination = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const OnSave = async () => {
    let uni = document.getElementById("uni").value;
    let university = [];
    let cours = course?.title;
    let faculty = course?.faculty;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${network.serverip}/get-university?_id=${uni}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var a = result.data;
        university = a;
      });
  };
  const fetchUniversity = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${network.serverip}/all-universities`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var a = result.data;
        setUniversities(a);
      });
  };

  const onFacultyChange = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let id = event.target.value;
    console.log("id", id);
    if (id !== "none") {
      await fetch(
        `${network.serverip}/get-department?_id=${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          var a = result.data;
          setDepartments(a);
        })
        .catch((error) => console.log("s error", error.message));
      document.getElementById("departmentDiv").style.display = "block";
    }
  };
  const OndepartmentChange = async (event) => {
    let uni = document.getElementById("uni").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let departmentID = event.target.value;
    let faculty = document.getElementById("faculty").value;

    if (departmentID !== "none") {
      await fetch(
        `${network.serverip}/get-courses?university=${uni}&faculty=${faculty}&department=${departmentID}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          var a = result.data;
          setCourses(a);
        })
        .catch((error) => console.log("s error", error.message));
      document.getElementById("courseDiv").style.display = "block";
    }
  };
  const OnUniversityChange = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    var uni = document.getElementById("uni").value;
    if (uni !== "none") {
      document.getElementById("facultyDiv").style.display = "block";
      await fetch(
        `${network.serverip}/get-faculties?university=${uni}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          var a = result.data;
          setFaculties(a);
          document.getElementById("faculty").value = "none";
          document.getElementById("courseDiv").style.display = "none";
        })
        .catch((error) => console.log("s error", error.message));
    }
  };

  const OnCourseChange = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let id = event.target.value;
    let faculty = document.getElementById("faculty").value;
    let department = document.getElementById("departments").value;

    console.log("id", id);
    if (id !== "none") {
      await fetch(
        `${network.serverip}/get-course?_id=${id}&faculty=${faculty}&dept=${department}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          var a = result.data;
          setCourse(a);
        })
        .catch((error) => console.log("s error", error.message));
      document.getElementById("details").style.display = "initial";
    } else {
      document.getElementById("details").style.display = "none";
    }
  };
  useEffect(() => {
    fetchUniversity();

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
            <h1>this is the kHome</h1>

            <div className="row">
              <div className="col-md-6">
                <select name="uni" id="uni" onChange={OnUniversityChange}>
                  <option value="none">----</option>

                  {universities.map((university) => (
                    <option value={university._id}>{university.name}</option>
                  ))}
                </select>

                <div
                  className="fadeIn"
                  id="facultyDiv"
                  style={{ display: "none" }}
                >
                  <h3>Select Faculty</h3>
                  <select id="faculty" onChange={onFacultyChange}>
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
                </div>

                <div
                  className="fadeIn"
                  id="departmentDiv"
                  style={{ display: "none" }}
                >
                  <h3>select Department</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <select id="departments" onChange={OndepartmentChange}>
                        <option value="none">----</option>

                        {departments.length > 0 ? (
                          departments.map((deparment) => (
                            <>
                              <option
                                key={deparment._id.toString()}
                                value={deparment._id}
                              >
                                {deparment?.name}
                              </option>
                            </>
                          ))
                        ) : (
                          <p> departments yet</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className="fadeIn"
                  id="courseDiv"
                  style={{ display: "none" }}
                >
                  <h3>List of courses</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <select id="course" onChange={OnCourseChange}>
                        <option value="none">----</option>

                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <>
                              <option
                                key={course._id.toString()}
                                value={course._id}
                              >
                                {course?.title}
                              </option>
                            </>
                          ))
                        ) : (
                          <p>Nocourses yet</p>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 fadeIn"
                id="details"
                style={{ display: "none" }}
              >
                <p>Course details</p>
                <p>course title :{course.title}</p>
                <p>faculty: {course?.faculty}</p>
                <p>deparment: {course?.department}</p>

                <p>
                  recommended subjects: {course.recomSubject1},
                  {course.recomSubject2},{course.recomSubject3},
                  {course.recomSubject4}
                  <button onClick={OnSave}>Procede to payment</button>
                </p>
              </div>
            </div>
          </SidebarContainer>
        </>
      )}
    </>
  );
};

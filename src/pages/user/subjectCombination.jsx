import { network } from "../../config/config";
import React, { useContext, useEffect, useState } from "react";
import { StudentSidebar } from "../../nav/partials/studentSideBar";
import PayButton from "../../components/paystack/paystack";
import Pay from "../../components/paystack/paystack";
import { useCookies } from "react-cookie";

export const SubjectCombination = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [cookies, setCookies] = useCookies(["userCookie"]);

  const OnSave = async () => {
    let uni = document.getElementById("uni").value;
    let cours = course?.title;
    let faculty = course?.faculty;
    let recomSubject1 = course?.recomSubject1;
    let recomSubject2 = course?.recomSubject2;
    let recomSubject3 = course?.recomSubject3;
    let recomSubject4 = course?.recomSubject4;
    let _id = cookies.userCookie._id;

    var raw = JSON.stringify({
      institution: uni,
      faculty: faculty,
      course: cours,
      recomSubject1: recomSubject1,
      recomSubject2: recomSubject2,
      recomSubject3: recomSubject3,
      recomSubject4: recomSubject4,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };

    await fetch(`${network.serverip}/save?_id=${_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        let crn = result.data.toString();
        alert("successfull your crn is " + crn);
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

  const OnUniversityChange = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    var uni = document.getElementById("uni").value;
    document.getElementById("details").style.display = "none";

    if (uni !== "none") {
      document.getElementById("courseDiv").style.display = "block";
      await fetch(
        `${network.serverip}/student/get-courses?university=${uni}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          var a = result.data;
          setCourses(a);
        })
        .catch((error) => console.log("s error", error.message));
    } else {
      document.getElementById("courseDiv").style.display = "none";
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
    var university = document.getElementById("uni").value;

    console.log("id", id);
    if (id !== "none") {
      await fetch(
        `${network.serverip}/get-course?courseid=${id}&&university=${university}`,
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
    setInterval(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isloading === true ? (
        <div className="loader"></div>
      ) : (
        <>
          <StudentSidebar />
          <div className="fadeIn bg1 ">
            <div
              className="container py-5 mt-5 profileCard "
              style={{
                backgroundColor: "white",
                width: "80%",
                margin: "auto",
                borderRadius: "1rem",
                height: "auto",
              }}
            >
              <div className="row">
                <div className="col-sm-6">
                  <h3>Select University</h3>
                  <select
                    name="uni"
                    className="form-control"
                    id="uni"
                    onChange={OnUniversityChange}
                  >
                    <option value="none">----</option>

                    {universities.map((university) => (
                      <option value={university._id} key={university._id}>
                        {university.name}
                      </option>
                    ))}
                  </select>

                  <div
                    className="fadeIn"
                    id="courseDiv"
                    style={{ display: "none" }}
                  >
                    <h3>List of courses</h3>
                    <div className="row">
                      <div className="col-sm-6">
                        <select
                          className="form-control"
                          id="course"
                          onChange={OnCourseChange}
                        >
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
                  className="col-md-5 fadeIn profileCard"
                  id="details"
                  style={{
                    display: "none",
                    margin: "5px",
                    padding: "10px",
                  }}
                >
                  <h3 style={{ textAlign: "center", padding: "10px" }}>
                    Selected Course Details
                  </h3>
                  <label className="form-control">
                    <strong>Course Title </strong>:{course.title}
                  </label>
                  <label className="form-control" htmlFor="">
                    <strong>Faculty</strong>: {course?.faculty}
                  </label>

                  <label className="form-control">
                    <strong>Subjects</strong>: {course.recomSubject1},
                    {course.recomSubject2},{course.recomSubject3},
                    {course.recomSubject4} <br /> <br />
                    {/* <button className="btn btn-primary" onClick={OnSave}>
                  Procede to payment

                </button> */}
                  </label>

                  <div className="profileCard" style={{ padding: "10px" }}>
                    <Pay callm={OnSave} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

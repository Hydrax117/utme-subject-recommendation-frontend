import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../infrastructure/themeContex/themeContext";
import { Footer } from "../../footer/footer";
import { network } from "../../../config/config";
export const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  var key = 0;
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

  const onChang = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let id = event.target.value;
    console.log(document.getElementById("course"));
    await fetch(`${network.serverip}/get-course?_id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var a = result.data;
        setCourse(a);
      })
      .catch((error) => console.log("s error", error.message));
  };
  const oncha = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    var uni = document.getElementById("uni").value;
    if (uni !== "none") {
      document.getElementById("t").style.display = "block";
      await fetch(
        `${network.serverip}/get-courses?university=${uni}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          var a = result.data;
          setCourses(a);
          document.getElementById("course").value = "none";
        })
        .catch((error) => console.log("s error", error.message));
    }
  };
  useEffect(() => {
    fetchUniversity();
  }, []);
  return (
    <>
      <div className="container">
        <h1>this is the kHome</h1>
        <select name="uni" id="uni" onChange={oncha}>
          <option value="none">----</option>

          {universities.map((university) => (
            <option value={university._id}>{university.name}</option>
          ))}
        </select>

        <div className="" id="t" style={{ display: "none" }}>
          <h3>List of courses</h3>
          <div className="row">
            <div className="col-md-6">
              <select id="course" onChange={onChang}>
                <option value="none">----</option>

                {courses.length > 0 ? (
                  courses.map((course) => (
                    <option key={course._id.toString()} value={course._id}>
                      {course.title}
                    </option>
                  ))
                ) : (
                  <p>Nocourses yet</p>
                )}
              </select>
            </div>
            <div className="col-md-6">
              <p>Course details</p>
              <p>course title :{course.title}</p>
              <p>faculty: {course?.faculty?.name}</p>
              <p>
                recommended subjects: {course.recomSubject1},
                {course.recomSubject2},{course.recomSubject3},
                {course.recomSubject4}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

import { useParams } from "react-router-dom";
import { SidebarContainer } from "../../nav/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { network } from "../../../config/config";
import AdminSidebar from "../../nav/adminSidebar";
import { Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";
import { BiAddToQueue, BiCartAdd, BiPlus, BiMenu } from "react-icons/bi";
import { CgAdd, CgMathPlus } from "react-icons/cg";

export const UniversityDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);
  const [check, setCheck] = useState(false);
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

  var modal = document.getElementById("id01");

  // When the user clicks anywhere outside of the modal, close it
  window.onClick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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
          <div
            className=""
            style={{
              overflow: "",
              background: "red",
              height: "100vh",
              width: "100%",
            }}
          >
            <AdminSidebar />
          </div>
        </>
      )}
    </>
  );
};

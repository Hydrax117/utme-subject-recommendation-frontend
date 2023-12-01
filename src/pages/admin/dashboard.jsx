import React, { useContext, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { network } from "../../config/config";
import AdminSidebar from "../../nav/partials/adminSideBar";
import axios from "axios";

export const AdminDashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  function UniversityDetails(id) {
    navigate(`/institutions/${id}`, { replace: false });
  }

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
      })
      .catch((error) => console.log("s error uni"));

    setInterval(async () => {
      await fetch(`${network.serverip}/all-universities`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          var a = result.data;
          setUniversities(a);
        })
        .catch((error) => console.log("s error"));
    }, 3000);
  };

  const handleUniversityDelete = async (id) => {
    if (window.confirm("are you sure you want to delete this material?")) {
      var response = await axios.delete(
        `${network.serverip}/delete-university?_id=${id}`
      );
      alert(response.data.message);
      window.location.reload();
    } else {
      alert("operation was canceled ");
    }
  };

  useEffect(() => {
    fetchUniversity();
  }, []);
  return (
    <>
      <>
        <AdminSidebar />
        <div className="bg1 py-5 h-80">
          <div className="container" style={{ color: "white" }}>
            <h1>List of all universities</h1>

            <div className="row">
              <div className="col-md-10">
                <table className="table">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Address</td>
                      <td>State</td>
                      <td>View</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {universities.map((university) => (
                      <tr key={university._id}>
                        <td>{university?.name}</td>
                        <td>{university?.address}</td>
                        <td>{university?.state}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              UniversityDetails(`${university?._id}`);
                              console.log(`${university?._id}`);
                            }}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleUniversityDelete(university._id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

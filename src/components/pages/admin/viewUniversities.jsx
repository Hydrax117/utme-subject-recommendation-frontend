import Sidebar from "../../nav/sidebar";
import { SidebarContainer } from "../../nav/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { network } from "../../../config/config";
import AdminSidebar from "../../nav/adminSidebar";
import { Route, useNavigate } from "react-router-dom";

export const AdminViewUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();

  function UniversityDetails(id) {
    navigate(`/university/${id}`, { replace: false });
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
      });
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
          <AdminSidebar /> <div className="loader"></div>
        </>
      ) : (
        <>
          <AdminSidebar />
          <SidebarContainer className="fadeIn">
            <h1>List of all universities</h1>

            <div className="row">
              <div className="col-md-10">
                <table className="table">
                  <thead>
                    <tr>
                      <td>name</td>
                      <td>address</td>
                      <td>state</td>
                      <td>view</td>
                    </tr>
                  </thead>
                  <tbody>
                    {universities.map((university) => (
                      <tr>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SidebarContainer>
        </>
      )}
    </>
  );
};

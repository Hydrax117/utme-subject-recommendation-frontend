import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import { network } from "../../config/config";
import axios from "axios";
import AdminSidebar from "../../nav/partials/adminSideBar";

export const UniversityDetails = () => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();

  //State to store table Column nameupl
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
    console.log(JSON.stringify(parsedData));
  };

  const handleSubmit = (event) => {
    console.log(JSON.stringify(parsedData));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(parsedData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();

    fetch(`${network.serverip}/add-course?_id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        console.log("result", result);
      })
      .catch((error) => console.log("s error", console.log(error.message)));
  };

  const fetchCoursesx = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("rendered");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(
      `${network.serverip}/get-courses?university=${id}&page=${currentPage}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        var a = result.data;
        setCourses(a);
        setTotalPages(result.totalPages);
      })
      .catch((error) => console.log("s error", error.message));
  };

  const handleCourseDelete = async (courseId) => {
    if (window.confirm("are you sure you want to delete this course?")) {
      var response = await axios.delete(
        `${network.serverip}/delete-course?courseId=${courseId}&universityId=${id}`
      );
      alert(response.data.message);
    } else {
      alert("operation was canceled ");
    }
  };

  useEffect(() => {
    fetchCoursesx();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="container">
        <div className="">
          <center>
            <h1>List of all courses</h1>
          </center>
          <hr />
          <table className="table">
            <tbody>
              {courses?.length > 0 ? (
                <>
                  {courses.map((course) => (
                    <tr>
                      <td>{course.title}</td>
                      <td>{course.faculty}</td>
                      <td>{course.recomSubject1}</td>
                      <td>{course.recomSubject2}</td>
                      <td>{course.recomSubject3}</td>
                      <td>{course.recomSubject4}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleCourseDelete(`${course._id}`);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <div className="pagination d-flex flex-column">
            <p>
              Showing page{currentPage} of {totalPages}
            </p>
            <div className="">
              <button onClick={handlePreviousPage}>Previous</button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  className="ms-2"
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNextPage} className="ms-2">
                Next
              </button>
            </div>
          </div>
        </div>
        {/* File Uploader */}

        <center>
          <h1>Add Course</h1>
        </center>
        <hr />
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <hr />
        <br />
        <br />
        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </>
  );
};

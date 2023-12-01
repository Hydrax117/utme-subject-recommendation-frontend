import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../nav/partials/adminSideBar";
import { network } from "../../config/config";
import styled from "styled-components";
const Form = styled.div`
  height: 50vh;
  width: 70%;
  margin: auto;
  color: white;
  font-size: 25px;
  word-spacing: 2px;
  margin-top: 50px;
`;
export const AddInstitution = () => {
  const [university, setUniversity] = useState("");
  const [address, setAdress] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {}, []);

  const adding = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: university,
      state: state,
      address: address,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    event.preventDefault();
    if (`${university}` === "" || `${state}` === "" || `${address}` === "") {
      toast.error("please fill in all the fields", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await fetch(`${network.serverip}/add-university`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            console.log(result);
            toast.success("University added Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("University already exist in the database  ", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => console.log("s error", error.message));
    }
  };
  return (
    <>
      <AdminSidebar />
      <div className="bg1">
        <Form>
          <div className="formInputContainer" style={{ margin: "10px" }}>
            <label htmlFor="">University name</label> <br />
            <input
              type="text"
              name="uni"
              id=""
              value={university}
              onChange={(event) => setUniversity(event.target.value)}
              style={{
                width: "90%",
                caretColor: "blue",
              }}
            />
          </div>

          <div className="formInputContainer" style={{ margin: "10px" }}>
            <label htmlFor=""> Address</label> <br />
            <input
              type="text"
              name="uni"
              id=""
              value={address}
              onChange={(event) => setAdress(event.target.value)}
              style={{
                width: "90%",
                caretColor: "blue",
              }}
            />
          </div>

          <div className="formInputContainer" style={{ margin: "10px" }}>
            <label htmlFor="">State</label> <br />
            <input
              type="text"
              name="uni"
              id=""
              value={state}
              onChange={(event) => setState(event.target.value)}
              style={{
                width: "90%",
                caretColor: "blue",
              }}
            />{" "}
            <br />
            <br />
            <center>
              <button className="btn btn-primary" onClick={adding}>
                Add
              </button>
            </center>
            <div>
              <ToastContainer style={{ marginTop: "30%" }} />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

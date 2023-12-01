import styled from "styled-components";
import AdminSidebar from "../../nav/partials/adminSideBar";
import { useEffect, useState } from "react";

const Section1 = styled.div`
  height: 100vh;
  background-color: #f3e8eb;
  overflow: hidden;
`;
const Welcome = styled.div`
  width: 80%;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  color: white;
  margin-top: 15%;
  word-spacing: 4px;
  font: bold;
`;
export const Home = () => {
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isloading === true ? (
        <div class="loader"></div>
      ) : (
        <>
          <div className="bg1">
            <div className="bg-cover">
              <div className="welcome">
                <h1 className="welcome-text">Welcome</h1>
                <p className="welcome-subtext">
                  Begin your academic journey on the right foot. Explore,
                  select, and succeed with the ideal UTME subject combinations.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.location.assign("/register");
                  }}
                >
                  Let`s get Started
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

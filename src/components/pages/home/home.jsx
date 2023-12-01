import React, { useEffect, useState } from "react";
import { Footer } from "../../footer/footer";
import style from "../home/home.module.css";
export const Home = () => {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isLoading === true ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className={style.section}>
            <div className={style.Homecontainer}>
              <div className="row">
                <div className="col-md-6" style={{ height: "700px" }}>
                  <div className={style.bg_img}>
                    <div className={style.bg}></div>
                  </div>
                </div>

                <div className="col-md-6" style={{ height: "700px" }}>
                  <div className={style.welcome}>
                    <h1 style={{ fontSize: "70px" }}>Welcome </h1>
                    <h3>To UTME Subject Recommendation System</h3>
                    <h4>The First Of Its Kind...</h4>
                    <h6>
                      "We provide students with the appropriate UTME subject
                      base on their selected institution and field of study"
                    </h6>
                    <hr />
                    <p></p>
                    <button
                      className={style.get_started}
                      onClick={() => {
                        window.location.assign("/register");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
// const oncha = async () => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   var uni = document.getElementById("uni").value;
//   if (uni !== "none") {
//     document.getElementById("t").style.display = "block";
//     await fetch(
//       `${network.serverip}/get-courses?university=${uni}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result.data);
//         var a = result.data;
//         setCourses(a);
//         document.getElementById("course").value = "none";
//       })
//       .catch((error) => console.log("s error", error.message));
//   }
// };

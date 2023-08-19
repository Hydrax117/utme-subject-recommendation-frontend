import React, { useEffect, useState } from "react";
import { Footer } from "../../footer/footer";
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

import React from "react";
import { Home } from "./components/pages/home/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Abt } from "./components/pages/about";
import { NavBar } from "./components/nav/nav";
import { Login } from "./components/pages/auth/login";
import { Register } from "./components/pages/auth/register";
import { Footer } from "./components/footer/footer";
import { SubjectConmination } from "./components/pages/user/subjectCombination";
import UserDashboard from "./components/pages/user/dashboard";
import { AddUniversity } from "./components/pages/admin/addUniversity";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UniversityDetails } from "./components/pages/admin/universityDetails";
import { AdminViewUniversity } from "./components/pages/admin/viewUniversities";
import { UserUpdateProfile } from "./components/pages/user/updateprofile";
export const App = () => {
  const [user, setUser] = useState();
  const [cookies, setCookies] = useCookies(["user"]);

  // if (loggedInUser) {
  //   const foundUser = JSON.parse(loggedInUser);
  //   setUser(foundUser);
  // }

  // useEffect(() => {

  // }, [cookies.token])

  return (
    <>
      <Router>
        <NavBar cookies={cookies} setCookies={setCookies} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={Abt}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/login" Component={Login} element={<Login />} />
          <Route path="/user/update-profile" Component={UserUpdateProfile} />

          <Route
            path="/user/dashboard"
            Component={
              cookies.token && cookies.userType === "STUDENT"
                ? UserDashboard
                : Login
            }
          />
          <Route path="/Subject-combination" Component={SubjectConmination} />
          <Route path="/admin/add-university" Component={AddUniversity} />
          <Route
            path="/admin/view-universities"
            Component={AdminViewUniversity}
          />
          <Route path="/university/:id" Component={UniversityDetails} />

          <Route path="/redirect" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

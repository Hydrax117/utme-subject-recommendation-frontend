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
import { useEffect, useState } from "react";
export const App = () => {
  const [user, setUser] = useState();

  // if (loggedInUser) {
  //   const foundUser = JSON.parse(loggedInUser);
  //   setUser(foundUser);
  // }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={Abt}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/login" Component={Login} element={<Login />} />
          <Route path="/user/dashboard" Component={UserDashboard} />
          <Route path="/Subject-combination" Component={SubjectConmination} />

          <Route path="/redirect" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

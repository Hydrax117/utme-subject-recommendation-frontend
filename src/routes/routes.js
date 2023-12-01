import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/nav";
import { Home } from "../pages/home/home";
import { useCookies } from "react-cookie";
import { UserLogin } from "../components/login/userLogin";
import { UserRegister } from "../components/login/userRegistration";
import { AdminDashboard } from "../pages/admin/dashboard";
import { UniversityDetails } from "../pages/admin/institutionDetails";
import CandidateProfile from "../pages/user/candidateProfile";
import { SubjectCombination } from "../pages/user/subjectCombination";
import { AddInstitution } from "../pages/admin/addInstitution";
import { AdminLogin } from "../components/login/adminLogin";
import Recomm from "../components/subject-selector/recom-index";
import { AdminRegistration } from "../components/login/adminRegistration";

export const Routers = () => {
  const [cookie, setCookie] = useCookies(["userCookie"]);

  return (
    <Router>
      <NavBar cookies={cookie.userCookie} setCookies={setCookie} />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/re" Component={Recomm} />
        <Route path="/login" Component={UserLogin} />
        <Route path="/register" Component={UserRegister} />
        <Route path="/admin/register" Component={AdminRegistration} />
        <Route path="/admin/dashboard" Component={AdminDashboard} />
        <Route path="/admin/add-institution" Component={AddInstitution} />
        <Route path="/admin/login" Component={AdminLogin} />

        <Route path="/institutions/:id" Component={UniversityDetails} />
        <Route
          path="/candidate/profile"
          Component={
            cookie?.userCookie?.userType === "STUDENT" &&
            cookie?.userCookie?.token
              ? CandidateProfile
              : UserLogin
          }
        />
        <Route
          path="/candidate/subject-combination"
          Component={
            cookie?.userCookie?.userType === "STUDENT" &&
            cookie?.userCookie?.token
              ? SubjectCombination
              : UserLogin
          }
        />
      </Routes>
    </Router>
  );
};

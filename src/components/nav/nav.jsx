import "./nav.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

export const NavLink = styled(Link)`
  color: white;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;
export const NavBar = ({ cookies, setCookies }) => {
  const logout = () => {
    setCookies("token", "", {
      maxAge: 0,
      path: "/",
    });
    window.location.replace("/");
  };

  return (
    // <div className="Nav">
    //   <div className="title">
    //     <p>UTME Subject Recomdation</p>
    //   </div>
    //   <ul className="header">
    //     <li>
    //       <NavLink to="/">Home</NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/programs">Programs</NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/about">About</NavLink>
    //     </li>
    //     {cookies.token ? (
    //       <>
    //         <li>
    //           <NavLink to="/user/dashboard">Dashboard</NavLink>
    //         </li>
    //         <li onClick={logout}>
    //           <button className="btn btn-primary">Logout</button>
    //         </li>
    //       </>
    //     ) : (
    //       <li>
    //         <NavLink to="/login" className="btn btn-primary">
    //           Login
    //         </NavLink>
    //       </li>
    //     )}
    //   </ul>
    // </div>

    <div class="header">
      <a href="#default" class="logo">
        UTME Subject Recomdation{" "}
      </a>
      <div class="header-right">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <a href="#about">About</a>
        {cookies.token ? (
          <>
            <NavLink to="/user/dashboard">Dashboard</NavLink>

            <button className="btn btn-primary">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

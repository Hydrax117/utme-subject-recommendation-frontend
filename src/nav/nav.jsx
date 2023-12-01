import style from "./nav.module.css";
import { Link, useNavigate } from "react-router-dom";
const logo = require("../images/logo.png");
export const NavBar = ({ cookies, setCookies }) => {
  const navigate = useNavigate();
  // for logging out users
  const logout = () => {
    setCookies("userCookie", "", {
      maxAge: 0,
      path: "/",
    });
    navigate("/", { replace: true });
  };
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <img src={logo} alt="" height={120} width={120} />
      </div>
      <div className={style.navList}>
        <ul>
          {(cookies?.token && cookies?.userType === "STUDENT") ||
          cookies?.userType === "ADMIN" ? (
            <>
              <li>
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>
              </li>
              <li>about</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

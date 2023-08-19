import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <Link to="/admin/view-universities">dashbord</Link>
        </li>
        <li>
          <Link to="/admin/add-university">add university</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

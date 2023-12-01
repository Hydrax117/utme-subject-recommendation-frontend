import { useState } from "react";
import { network } from "../../config/config";
import axios from "axios";
export const AdminRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [institution, setInstitution] = useState("");
  const handleSubmit = async () => {
    var user = { email, password };
    const response = await axios.post(`${network.serverip}/admin/login`, user);
    console.log(response.data.message);
  };
  return (
    <>
      <h1>Admin Register</h1>
      <div className="form-group">
        <label htmlFor="email" className="form-control">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />

        <button>Login</button>
      </div>
    </>
  );
};

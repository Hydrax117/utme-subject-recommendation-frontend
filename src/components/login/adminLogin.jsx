import { useState } from "react";
import axios from "axios";
import { network } from "../../config/config";
export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    var user = { email, password };
    const response = await axios.post(`${network.serverip}/admin/login`, user);
    console.log(response.data.message);
  };
  return (
    <>
      <h1>Admin Login</h1>
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

        <button onClick={handleSubmit}>Login</button>
      </div>
    </>
  );
};

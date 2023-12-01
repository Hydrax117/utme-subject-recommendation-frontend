import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

const Pay = ({ callm }) => {
  const publicKey = "pk_test_7a848f60947df155e867cf16adce56321353c474";
  const amount = 50000;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const thankyou = () => {
    callm();
  };
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => thankyou(),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="App">
      <div className="container">
        <div className="checkout-form">
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton
            {...componentProps}
            className="mt-2 btn btn-success"
          />
        </div>
      </div>
    </div>
  );
};

export default Pay;

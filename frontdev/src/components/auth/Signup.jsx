// import React from "react";
import { useState } from "react";
import { Button, TextInput } from "../../elements";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !phone || !name) {
      setError("Field can not be empty");
    } else {
      axios
        .post("http://localhost:3001/user/register", {
          name: name, 
          email: email,
          phone: phone,
          password: password,
        })
        .then((response) => {
          console.log(response);
          console.log("Account Created Sucessfully");
          navigate("/verfiying");
        })
        .catch((error) => {
          console.error("Error occurred during registration:", error);
          setError("User with this email already exist");
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-200">
      <form onSubmit={handleSubmit}>
        <div className="bg-bg_additional w-[650px] h-[550px] p-12 px-16 rounded-tl-[150px] rounded-br-[150px] flex flex-col justify-center">
          <div className="mb-8">
            {error && <p className="text-tx_primary text-lg mt-1">{error}</p>}
            <label className="mr-16">Name</label>
            <TextInput
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="rounded-none w-80 relative left-11"
            />
          </div>
          <div className="mb-8">
            <label className="mr-16">Email</label>
            <TextInput
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none w-80 relative left-11"
            />
          </div>
          <div className="mb-8">
            <label className="mr-16">Phone No</label>
            <TextInput
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-none w-80 relative left-4"
            />
          </div>
          <div className="mb-8">
            <label className="mr-16">Password</label>
            <TextInput
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none w-80 relative left-4"
            />
          </div>
          <div className="mb-8">
            <label className="mr-16">
              Confirm
              <br />
              Password
            </label>
            <TextInput className="rounded-none w-80 relative left-3" />
          </div>
        </div>
        <div className="flex justify-around mt-8">
          <Button className="w-48 text-white" type="submit">
            Signup
          </Button>
          <Button
            variant="tertiary"
            className="w-48"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

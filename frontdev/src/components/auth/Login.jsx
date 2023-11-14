import React, { useState } from "react";
import prof from "../../assets/images/c60bd48f322b4d711b3e7227674e4f35-fotor-20230812214253.png";
import { Button, TextInput } from "../../elements";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Field can not be empty");
    } else {
      axios
        .post("http://localhost:3001/user/login", {
          email: email,
          password: password,
        })
        .then(response => {
          const { token } = response.data;
          localStorage.setItem("token", token);
          console.log("LoggedIn Sucessfully");
          navigate("/");
        })
        .catch((err) => {
          console.log("Error Logging in", err);
          setError("Invaild email or password");
        });
    }
  };
  return (
    <div className="flex justify-center items-center h-200">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <img className="w-32 -mb-12 rounded-full" src={prof} alt="username" />
        </div>
        <div className="bg-bg_additional w-[550px] h-[380px] p-12 px-16 rounded-tr-[150px] rounded-bl-[150px] flex flex-col justify-center">
          <div className="mt-8">
            {error && <p className="text-tx_primary text-lg mt-1">{error}</p>}

            <label className="mr-10">Email</label>
            <TextInput
              className="rounded-none w-72 relative left-10"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <label className="mr-10">Password</label>
            <TextInput
              className="rounded-none w-72 relative left-3"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-tx_link flex justify-end pt-4 font-small">
              Forgot password?
            </p>
          </div>
        </div>
        <div className="flex justify-around mt-8">
          <Button className="w-48 text-white" type="submit">
            Login
          </Button>
          <Button
            variant="tertiary"
            className="w-48"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { serverURL } from "../utils/Common";

function Signup(props) {
  const [pass, setPassShowhide] = useState(false);
  const [cpass, setCpassShowhide] = useState(false);
  let history = useHistory();

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const Createuser = async (e) => {
    e.preventDefault();
    try {
      if (data.cpassword === data.password) {
        const response = await axios.post(
          `${serverURL}/api/userSignup`,
          {
            name: data.name,
            email: data.email,
            password: data.password,
            cpassword: data.cpassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = response.data;
        if (json.success) {
          //save the authtoken and redirect
          localStorage.setItem("token", json.jwttoken);
          setdata({
            name: "",
            email: "",
            password: "",
            cpassword: "",
          });
          Swal.fire("Account Created Successfuly");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else if (
          json.success === false &&
          json.err === "you have already register"
        ) {
          Swal.fire("You Have Already Register");
        } else {
          Swal.fire("Something Went Wrong");
        }
      } else {
        Swal.fire("Password not match.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleclick = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="signbox" style={{ height: "100vh" }}>
      <div
        className="bg-white"
        style={{
          width: "440px",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <h3 className="text-center">Create Account</h3>
        <form onSubmit={Createuser}>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={data.name}
              onChange={handleclick}
              aria-describedby="name"
              placeholder="Enter Name"
              minLength={5}
            />
          </div>
          <div className="my-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={data.email}
              onChange={handleclick}
              aria-describedby="emailHelp"
              placeholder="Enter valid email"
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              margin: " 12px 0",
            }}
          >
            <input
              type={pass ? "test" : "password"}
              className="form-control "
              id="password"
              name="password"
              value={data.password}
              onChange={handleclick}
              placeholder="Enter password"
              minLength={5}
            />
            <div style={{ position: "absolute", right: "10px" }}>
              <FontAwesomeIcon
                onClick={() => setPassShowhide(!pass)}
                id="eyet"
                className=" font-medium cursor-pointer absolute right-[40px] top-[130px] "
                icon={pass ? faEye : faEyeSlash}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input
              type={cpass ? "test" : "password"}
              className="form-control "
              id="cpassword"
              name="cpassword"
              value={data.cpassword}
              onChange={handleclick}
              placeholder="Enter Confirm password"
              minLength={5}
            />
            <div style={{ position: "absolute", right: "10px" }}>
              <FontAwesomeIcon
                onClick={() => setCpassShowhide(!cpass)}
                id="eyet"
                className=" font-medium cursor-pointer absolute right-[40px] top-[130px] "
                icon={cpass ? faEye : faEyeSlash}
              ></FontAwesomeIcon>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-danger my-3"
            style={{ width: "100%" }}
            disabled={
              data.cpassword.length === 0 ||
              data.password.length === 0 ||
              data.email.length === 0 ||
              data.name.length === 0
                ? true
                : false
            }
          >
            Create New Account
          </button>
          <div className=" text-center">
            <span style={{ color: "#9CA3AF" }}>
              Have an account
              <Link className="btn p-0 mx-1" to="/sigin">
                <div style={{ color: "red" }}>SignIn</div>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

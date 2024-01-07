import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { serverURL, setUserSession } from "../utils/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Login() {
  const [credintial, setcredintal] = useState({ email: "", password: "" });
  const [pass, setPassShowhide] = useState(false);
  let history = useHistory();

  const userlogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverURL}/api/userSignin`,
        {
          email: credintial.email,
          password: credintial.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = response.data;
      if (json.success) {
        //save the authtoken and
        setUserSession(json.jwttoken, json.email, json.username);
        history.push("/dashboard");
      } else {
        Swal.fire(response.data.error);
      }
    } catch (error) {
      Swal.fire(error.response.data.error);
    }
  };

  const onChange = (e) => {
    setcredintal({ ...credintial, [e.target.name]: e.target.value });
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
        <h2 className="text-center">Sign in</h2>
        <p className="text-center" style={{ color: "#9CA3AF" }}>
          Welcome back to the community
        </p>
        <form onSubmit={userlogin}>
          <div className="my-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credintial.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter valid email"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input
              type={pass ? "test" : "password"}
              className="form-control "
              id="password"
              name="password"
              value={credintial.password}
              onChange={onChange}
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
          <button
            type="submit"
            className="btn btn-danger my-3"
            style={{ width: "100%" }}
          >
            Sign in
          </button>
          <div className=" text-center">
            <span style={{ color: "#9CA3AF" }}>
              Don't have an account yet?
              <Link className="btn p-0 mx-1" to="/signup">
                <div style={{ color: "red" }}>SignUp</div>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { setUserSession } from "../utils/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function Login(props) {
  const [credintial, setcredintal] = useState({ email: "", password: "" });
  const [pass, setPassShowhide] = useState(false);
  let history = useHistory();

  //   useEffect(() => {
  //     if (getToken()) {
  //       history.push("/about");
  //     } else history.push("/");
  //   }, []);

  const userlogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/api/userSignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credintial.email,
        password: credintial.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the authtoken and
      setUserSession(json.jwttoken);
      //   localStorage.setItem("token", json.jwttoken);
      //   props.showalert("logged in Successfully", "success ");
      history.push("/about");
    } else {
      //   props.showalert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setcredintal({ ...credintial, [e.target.name]: e.target.value });
  };

  return (
    <div className="BgColor flex-1 m-auto" style={{ width: "440px" }}>
      <h2 className="mt-3">Sign in</h2>
      <form onSubmit={userlogin}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
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
          <div id="emailHelp" className="form-text">
            .
          </div>
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="flex flex-row">
            <input
              type={pass ? "test" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={credintial.password}
              onChange={onChange}
            />
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
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Submit
        </button>
        <Link className="btn btn-primary my-3 " to="/signup">
          SignUp
        </Link>
      </form>
    </div>
  );
}

export default Login;

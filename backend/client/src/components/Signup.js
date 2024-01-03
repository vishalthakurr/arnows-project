import React, { useState } from "react";
import { useHistory } from "react-router";

function Signup(props) {
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
  });

  let history = useHistory();

  const Createuser = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/api/userSignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        cpassword: data.cpassword,
      }),
    });
    const json = await response.json();

    if (json.sucess) {
      // showalert("Sucessfully Account Created", "success");
      //save the authtoken and redirect
      localStorage.setItem("token", json.jwttoken);
      setdata({ name: "", email: "", phone: "", password: "", cpassword: "" });
      // router.push("/");
    } else if (
      json.sucess === false &&
      json.err === "you have already register"
    ) {
      // showalert("You  Have Already Register", "danger");
    } else if (json.sucess === false && json.mes === " password is not same") {
      // showalert("Password is Not Same", "warning");
    } else {
      // showalert("please fill all the field", "danger");
    }
  };

  const handleclick = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="BgColor flex-1 m-auto" style={{ width: "440px" }}>
      {/* <div className="container mt-2"> */}
      <h2 className="mt-3">Create user</h2>
      <form onSubmit={Createuser} >
        <input
          className=" w-full   px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
          type="text"
          placeholder="Enter your Name"
          name="name"
          onChange={handleclick}
          required
          id="name"
          value={data.name}
        />
        <input
          className="  w-full  px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
          type="email"
          placeholder="Enter Email address "
          name="email"
          onChange={handleclick}
          required
          id="email"
          value={data.email}
        />
        <input
          className=" w-full   px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
          type="number"
          placeholder="Enter Your phone"
          name="phone"
          onChange={handleclick}
          required
          id="phone"
          value={data.phone}
        />

        <div className=" flex flex-row">
          <input
            className="w-full px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
            type="password"
            placeholder="Enter your passowrd"
            name="password"
            onChange={handleclick}
            required
            minLength={5}
            id="showhide"
            value={data.password}
          />
          {/* <FontAwesomeIcon
            onClick={eyehandel}
            id="eyet"
            className=" font-medium cursor-pointer absolute right-[40px] top-[255px] "
            icon={eye}
          ></FontAwesomeIcon> */}
        </div>
        <div className=" flex flex-row">
          <input
            className="w-full px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
            type="password"
            placeholder="Confirmation passowrd"
            name="cpassword"
            onChange={handleclick}
            required
            minLength={5}
            id="showhide2"
            value={data.cpassword}
          />
          {/* <FontAwesomeIcon
            onClick={eyehandel2}
            id="ey"
            className=" font-medium cursor-pointer  absolute right-[40px] top-[320px] "
            icon={eye2}
          ></FontAwesomeIcon> */}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;

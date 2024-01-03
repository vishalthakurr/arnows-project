import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import UserContext from "./context/UserContext";
import { useContext } from "react";

const Signup = () => {
  const context = useContext(UserContext);
  const { showalert } = context;

  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const router = useRouter();

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
      showalert("Sucessfully Account Created", "success");
      //save the authtoken and redirect
      localStorage.setItem("token", json.jwttoken);
      setdata({ name: "", email: "", phone: "", password: "", cpassword: "" });
      router.push("/");
    } else if (
      json.sucess === false &&
      json.err === "you have already register"
    ) {
      showalert("You  Have Already Register", "danger");
    } else if (json.sucess === false && json.mes === " password is not same") {
      showalert("Password is Not Same", "warning");
    } else {
      showalert("please fill all the field", "danger");
    }
  };

  const handleclick = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const [eye, setEye] = useState(faEyeSlash);

  const eyehandel = () => {
    const Tin = document.querySelector("#showhide");
    if (Tin.getAttribute("type") === "password") {
      Tin.setAttribute("type", "Text");
      setEye(faEye);
    } else {
      Tin.setAttribute("type", "password");
      setEye(faEyeSlash);
    }
  };

  const [eye2, setEye2] = useState(faEyeSlash);

  const eyehandel2 = () => {
    const Tin = document.querySelector("#showhide2");
    if (Tin.getAttribute("type") === "password") {
      Tin.setAttribute("type", "Text");
      setEye2(faEye);
    } else {
      Tin.setAttribute("type", "password");
      setEye2(faEyeSlash);
    }
  };
  return (
    <div className="bg-gray-100  h-[90vh]  ">
      <div className="container pt-[5rem] flex flex-col-reverse  md:flex-row  md:px-4 lg:px-6   mx-auto items-center justify-center">
        <div className="  h-fit right flex flex-col bg-white px-8 py-2 rounded-md lg:w-2/4 shadow-2xl text-md relative">
          <h1 className="text-center text-sm md:text-xl lg:text-2xl">
            Create the Account
          </h1>
          <form onSubmit={Createuser} method="post">
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
              <FontAwesomeIcon
                onClick={eyehandel}
                id="eyet"
                className=" font-medium cursor-pointer absolute right-[40px] top-[255px] "
                icon={eye}
              ></FontAwesomeIcon>
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
              <FontAwesomeIcon
                onClick={eyehandel2}
                id="ey"
                className=" font-medium cursor-pointer  absolute right-[40px] top-[320px] "
                icon={eye2}
              ></FontAwesomeIcon>
            </div>

            <button
              type="submit"
              className="  w-full m-auto bg-green-600 text-white font-bold rounded-md p-3 hover:bg-green-700"
            >
              Create New Account
            </button>
          </form>
          <hr className="my-3 border-gray-400" />
          <Link href="/Signin">
            <button className=" my-3 bg-blue-500 text-white w-fit  m-auto font-bold rounded-md p-3 hover:bg-blue-600">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

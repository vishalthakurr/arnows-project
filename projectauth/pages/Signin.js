import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"; // import the icons you need

import { useContext } from 'react';
import UserContext from './context/UserContext';



const Signin = () => {



    const context = useContext(UserContext);
    const { showalert } = context;

    const [data, setdata] = useState({ email: "", password: "", });

    const router = useRouter()
    const Createlogin = async (e) => {
        e.preventDefault()


        const response = await fetch(`http://localhost:8000/api/userSignin`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({

                email: data.email, password: data.password
            })


        });
        const json = await response.json();

        if (json.sucess || json.mess === "login sucess full") {

            //save the authtoken and redirect
            localStorage.setItem('token', json.jwttoken)

            setdata({ email: "", password: "", })
            router.push("/")
            showalert(" Sucessfully login", "success");
            // alert("Sucessfully login", "success")


        }
        else if (json.sucess === false || json.error === "please try to login with  correct  credentials") {
            showalert("please try to login with  correct  credentials", "warning")

        }

        else {
            showalert("Invalid credential", "danger")
        }


    }



    const handleclick = (e) => {

        setdata({ ...data, [e.target.name]: e.target.value })

    }

    const [eye, setEye] = useState(faEyeSlash);

    const eyehandel = () => {

        const Tin = document.querySelector("#showhide")
        if (Tin.getAttribute('type') === 'password') {

            Tin.setAttribute('type', 'Text');
            setEye(faEye)
        }
        else {
            Tin.setAttribute('type', 'password');
            setEye(faEyeSlash)

        }


    }





    return (

        <div className="bg-gray-100 h-[90vh]  ">
            <div className="container  pt-[5rem] flex flex-col-reverse  md:flex-row  md:px-4 lg:px-6   mx-auto items-center justify-center">

                <div className="right flex flex-col bg-white px-8 py-2 rounded-md  md:w-2/6 shadow-2xl text-md relative" >
                <h1 className='text-center text-sm md:text-xl lg:text-2xl'>
                        Login in
                    </h1>
                    <form onSubmit={Createlogin} method="POST">



                        <input className="px-5 w-full h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600" type="text" placeholder="Email address or Phone Number" name='email' id='email' value={data.name} onChange={handleclick} required />


                        <div className=' flex flex-row'>
                            <input id="showhide" className=" w-full  relative px-5 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600" type="password" placeholder="Password" name='password' minLength={5} value={data.password} onChange={handleclick} required />
                            <FontAwesomeIcon onClick={eyehandel} id='eyet' className=' font-medium cursor-pointer absolute right-[40px] top-[130px] ' icon={eye}></FontAwesomeIcon>
                        </div>

                        <button type='submit' className=" mx-40  my-3 bg-blue-600 text-white  font-bold rounded-md p-3 hover:bg-blue-700">Sign In</button>

                    
                    </form>
                    <hr className="my-3 border-gray-400" />

                    <Link href="/Signup">
                        <button className=" my-3  bg-green-600 text-white w-fit  m-auto font-bold rounded-md p-3 hover:bg-green-700">Create New Account</button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Signin
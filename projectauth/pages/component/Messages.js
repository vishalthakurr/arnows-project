import React, { useEffect } from 'react'
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { BsTrash } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"

const Messages = (props) => {


    const context = useContext(UserContext);
    const { usermessage, getmessage, deletemessage, showalert } = context;

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getmessage();
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line 
    }, [])




    return (
        <div>

            <div>
                <h1 className='text-center my-6 text-base font-semibold font-serif'>Your Messages Here</h1>
            </div>
            <div>


                <section className="text-gray-600 body-font grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full  my-2  relative">
                    {
                        usermessage.map((item) => {

                            return <div key={item._id} className="container m-2   shadow-lg  h-auto overflow-hidden shadow-black relative">
                                <div className=" mx-2 ">
                                    <div className="p-2 ">
                                        <div className="h-full bg-gray-100 bg-opacity-75 px-2 pt-16 pb-24 rounded-lg overflow-hidden text-center ">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Message</h2>
                                            <p className="leading-relaxed mb-3">{item.message}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='absolute  bottom-2  left-14 text-xl cursor-pointer hover:text-red-600 ' title='Delete Message'>

                                    <BsTrash onClick={() => { deletemessage(item._id); showalert("Delete message successfully", "danger"); }} />
                                </div>
                                <div title='Edit Message' className='absolute bottom-2  left-36 text-xl cursor-pointer  hover:text-green-600'>

                                    <FiEdit />
                                </div>
                            </div>

                        })
                    }



                </section>


            </div>
        </div>
    )
}

export default Messages
import React, { useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { BsTrash, BsUiChecksGrid } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"
import { useRouter } from 'next/router'


const Messages = (props) => {


    const context = useContext(UserContext);
    const { usermessage, getmessage, deletemessage, showalert, messageupdated } = context;

    const router = useRouter();


    const [editmessage, seteditmessage] = useState({ id: "", emessage: "" })
    const [showModal, setShowModal] = useState(false);


    const updatemessage = (newEditmessage) => {
        setShowModal(true)
        seteditmessage({ id: newEditmessage[0]._id, emessage: newEditmessage[0].message })

    }


    const Editclick = (e) => {
        // e.preventDefault()

        if (editmessage.emessage.length < 10) {
            showalert("Message should be atleast 10 char. ", "info");

        }
        if (editmessage.emessage.length === 0 ) {
            showalert("Please write the message. ", "warning");

        }
        if (editmessage.emessage.length > 10) {
            messageupdated(editmessage.id, editmessage.emessage);
            setShowModal(false)
            showalert("updated message successfully", "success");
        }

    }

    const onchange = (e) => {
        seteditmessage({ ...editmessage, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getmessage();
        }
        else {
            router.push('/Signin')
        }
        // eslint-disable-next-line 
    }, [])




    return (
        <div>

            <button



                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {/* Open regular modal */}
            </button>
            {showModal ? (
                <>
                    <div
                        className=" bg-transparent justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white   shadow-gray-800  outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold font-mono">
                                        Edit Message
                                    </h3>

                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form method="post">
                                        <textarea minLength={10} maxLength={250} rows="40" cols="50" className=" w-full   p-2 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600" type='text' placeholder="Enter Message Here (250 char.)" name='emessage' onChange={onchange} required id='emessage' value={editmessage.emessage} />

                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => Editclick()}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}





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

                                    <FiEdit onClick={() => { updatemessage(usermessage); }} />
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
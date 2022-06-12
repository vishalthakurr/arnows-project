import React from 'react'
import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { useRouter } from 'next/router'




const Alert = (props) => {

    const context = useContext(UserContext);

    const { Aler } = context;

    const capt = (word) => {

        let c = word.toLowerCase();
        return c.charAt(0).toUpperCase() + c.slice(1)

    }

    return (

        <div>
            {
                (Aler && (Aler.type == 'success')) ?

                    <div className="border border-green-400 bg-green-300 text-green-900 p-2 rounded-md"  >{capt(Aler.type)}  : {Aler.msg} </div>
                    : (Aler && (Aler.type == 'danger')) ?
                        <div className="border border-red-400 bg-red-300 text-red-900 p-2 rounded-md"  >{capt(Aler.type)}
                            : {Aler.msg} </div>
                        : (Aler && (Aler.type == 'warning')) ? <div className="border border-yellow-400 bg-yellow-300 text-yellow-900 p-2 rounded-md"  >{capt(Aler.type)}
                            : {Aler.msg} </div>
                            : (Aler && (Aler.type == 'info')) ? <div className="border border-blue-400 bg-blue-300 text-blue-900 p-2 rounded-md"  >{capt(Aler.type)}
                                : {Aler.msg} </div> : null
            }


        </div>


    )
}

export default Alert

import UserContext from "../context/UserContext";
import { useState } from "react";



const UserState = (props) => {




  const [user, setuser] = useState([])

  // //////// get user
  const getuser = async () => {
    //api call
    const response = await fetch(`http://localhost:8000/api/getuser`, {

      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

    });
    const json = await response.json();
    // console.log([json]);

    setuser(json)


  }

  //add message

  const imessage = []
  const [usermessage, setusermessage] = useState(imessage)

  const addmessage = async (message) => {

    const response = await fetch(`http://localhost:8000/api/message/addmessage`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ message })
    });

    const mess = await response.json();
    setusermessage(usermessage.concat(mess))


  }


  //fetch message
  // //////// get all message
  const getmessage = async () => {

    //api call
    const response = await fetch(`http://localhost:8000/api/message/fetchallMessage`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

    });
    const json = await response.json();
    // console.log(json);

    setusermessage(json)


  }

  //delete message
  const deletemessage = async (id) => {

    //delete api
    //api call
    const response = await fetch(`http://localhost:8000/api/message/deletemessage/${id}`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },


    });

    // const json =
    await response.json();
    // console.log(json);

    // console.log("deleting node " + id);

    const newmessage = usermessage.filter((mess) => { return mess._id !== id })
    setusermessage(newmessage)


  }


  //
  const messageupdated = async (id, message) => {


    //api call
    const response = await fetch(`http://localhost:8000/api/message/updatemessage/${id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ message })
    });

    const json =await response.json();
    console.log(json ,id);

    let newmessage =  JSON.parse(JSON.stringify(usermessage))

    for (let i = 0; i < newmessage.length; i++) {

      const element = newmessage[i];
      if (element._id === id) {
      newmessage[i].message = message;
     
      break;

      }
    }
    setusermessage(newmessage)


  }




  // alert
   const  [Aler, setAler] = useState({})
  const showalert = (meassage, type) => {

    setAler({
      msg: meassage,
      type: type
    })

    setTimeout(() => {
      setAler(null);
    }, 2000);

  }




  return (


    <UserContext.Provider value={{ user, getuser, Aler, showalert, addmessage, usermessage, getmessage, deletemessage,messageupdated }} >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;




import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const innotes = []


  const [notes, setNote] = useState(innotes)

   // //////// get all note
   const getnote = async  () => {

       //api call
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
  
        },
  
      });
      const json = await response.json();
      // console.log(json);

      setNote(json)


  }



  // ////////////////////////////////////////////////////////////////////////ADD a note
  const addNote = async  (title, description, tag) => {

    //ADD api
       //api call
       const response = await fetch(`${host}/api/notes/addnotes`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
  
        },
  
        body: JSON.stringify({ title, description, tag })
      });
  
      const note = await response.json();
      // console.log(note+ "added");

    // console.log("Addding a node");

    // const note = {
    //   "_id": "615ac5d9fe064b39ceced58e",
    //   "user": "615abdf530b13608f5191c5e",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-10-04T09:14:01.996Z",
    //   "__v": 0
    // };

    setNote(notes.concat(note))

  }


  ////////////////////////////////////////////////////////////////Delete note

  const deleteNote = async (id) => {

    //delete api
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {

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

    const newNote =  notes.filter((note) => { return note._id !== id })
    setNote(newNote)
    

  }

  // /////////////////////////////////////////////////////////////////////////Edit note 
  const editNote = async (id, title, description, tag) => {


    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag })
    });

    const json =await response.json();
    console.log(json);

    let newnote =  JSON.parse(JSON.stringify(notes))

    for (let i = 0; i < newnote.length; i++) {

      const element = newnote[i];
      if (element._id === id) {
      newnote[i].title = title;
      newnote[i].description = description;
      newnote[i].tag = tag;
      break;

      }
    }
    setNote(newnote)


  }



  return (


    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote ,getnote}} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

//   const note = 
//     {
//       _id: "615c3cd05d647a6712a5187e",
//       user: "615abdf530b13608f5191c5e",
//       title: "welcome",
//       description: "good morning vanshika",
//       tag: " greet",
//       date: "2021-10-05T11:53:52.859Z",
//       __v: 0
//     } 

//   // const [notes , setNotes ] = useState(notein)

//     return ( 

//         <NoteContext.Provider value={{note}} >
//             {props.children}


//         </NoteContext.Provider>
//     )


// }
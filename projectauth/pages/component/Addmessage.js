import React, { useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const Addmessage = (props) => {
  const context = useContext(UserContext);
  const { addmessage, showalert } = context;

  const [mess, setmess] = useState({ message: "" });
  const handleclick = (e) => {
    setmess({ ...mess, [e.target.name]: e.target.value });
  };

  const Adclick = (e) => {
    e.preventDefault();
    if (mess.message.length < 10) {
      showalert("Message should be atleast 10 char. ", "info");
    }
    if (mess.message.length === 0) {
      showalert("Please write the message. ", "warning");
    }
    if (mess.message.length > 10) {
      addmessage(mess.message);
      setmess({ message: "" });
      showalert("Add message successfully", "success");
    }
  };
  return (
    <div>
      <form method="post">
        <textarea
          minLength={10}
          maxLength={250}
          rows="40"
          cols="50"
          className=" w-full   p-2 h-12 my-2 rounded-md border-2 border-x-gray-300 outline-blue-600"
          type="text"
          placeholder="Enter Message Here (250 char.)"
          name="message"
          onChange={handleclick}
          required
          id="message"
          value={mess.message}
        ></textarea>

        <button
          onClick={Adclick}
          type="submit"
          className=" cursor-pointer  w-full m-auto bg-blue-400 text-white font-bold rounded-md p-3 cur hover:bg-blue-500"
        >
          Add Message
        </button>
      </form>
    </div>
  );
};

export default Addmessage;

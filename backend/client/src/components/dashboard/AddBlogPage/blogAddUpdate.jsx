import React from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


import { getToken, getUserEmail, getUserName } from "../../../utils/Common";

const AlogAddUpdate = ({ state, data, setdata, locationName }) => {

  const histoy = useHistory()
  
  const Createblog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/blog/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          email: getUserEmail(),
          user: getUserName(),
        }),
      });

      const mess = await response.json();
      if (mess.sucess) {
        setdata({
          title: "",
          content: "",
        });
        Swal.fire(mess.message);
      }
    } catch {
      console.log("Something went wrong");
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      const id = locationName.split("/")[2] || 0;
      const response = await fetch(
        `http://localhost:8000/api/blog/updateblog/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
          body: JSON.stringify({
            title: data.title,
            content: data.content,
          }),
        }
      );
      const mess = await response.json();
      Swal.fire(mess.sucess);
      histoy.push("/dashboard")
    } catch {
      console.log("Something went wrong");
    }
  };
  const handleclick = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="bg-white"
      style={{ width: "600px", padding: "20px", borderRadius: "16px" }}
    >
      <h4 style={{ color: "#111827" }}>
        {state ? "Create New Blog" : " Update Blog"}
      </h4>
      <form onSubmit={state ? Createblog : updateBlog}>
        <div className="my-3">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={data.title}
            onChange={handleclick}
            aria-describedby="title"
            placeholder="Blog Title"
            minLength={5}
          />
        </div>
        <div className="my-3">
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={data.content}
            onChange={handleclick}
            placeholder="Content"
            maxLength="500"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-3"
          style={{ width: "100%" }}
          disabled={
            state
              ? data.content.length === 0 || data.title.length === 0
                ? true
                : false
              : false
          }
        >
          {state ? "Publish" : "Edit Save"}
        </button>
      </form>
    </div>
  );
};

export default AlogAddUpdate;

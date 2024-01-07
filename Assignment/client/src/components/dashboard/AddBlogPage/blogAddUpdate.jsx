import React from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import {
  getToken,
  getUserEmail,
  getUserName,
  serverURL,
} from "../../../utils/Common";
import axios from "axios";

const AlogAddUpdate = ({ state, data, setdata, locationName }) => {
  const histoy = useHistory();

  const Createblog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverURL}/api/blog/addblog`,
        {
          title: data.title,
          content: data.content,
          email: getUserEmail(),
          user: getUserName(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
        }
      );
      const mess = response.data;
      if (mess.success) {
        setdata({
          title: "",
          content: "",
        });
        Swal.fire(mess.message);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const updatefunc = async () => {
    try {
      const id = locationName.split("/")[2] || 0;
      const response = await axios.put(
        `${serverURL}/api/blog/updateblog/${id}`,
        {
          title: data.title,
          content: data.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
        }
      );
      const mess = response.data;
      Swal.fire(mess.success);
      histoy.push("/dashboard");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        updatefunc();
      }
    });
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

import React, { useState } from "react";
import Swal from "sweetalert2";
import { getUser } from "../../utils/Common";

function Addblog(props) {
  //   let history = useHistory();

  const [data, setdata] = useState({
    title: "",
    content: "",
  });

  const Createblog = async (e) => {
    e.preventDefault();
    console.log(data, getUser());
    try {
      if (data.title.length !== 0) {
      }
      const response = await fetch(`http://localhost:8000/api/blog/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          user: getUser(),
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
  const handleclick = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="signbox" style={{ marginTop: "100px" }}>
        <div
          className="bg-white"
          style={{ width: "600px", padding: "20px", borderRadius: "16px" }}
        >
          <h4 style={{ color: "#111827" }}>Create New Blog</h4>
          <form onSubmit={Createblog}>
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
                maxLength={5}
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
                data.content.length === 0 || data.title.length === 0
                  ? true
                  : false
              }
            >
              Publish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addblog;

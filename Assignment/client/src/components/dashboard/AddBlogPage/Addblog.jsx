import React, { useState, useEffect } from "react";
import BlogAddUpdate from "./blogAddUpdate";
import { useLocation } from "react-router-dom";
import { getToken, serverURL } from "../../../utils/Common";
import axios from "axios";

function Addblog(props) {
  let location = useLocation();

  const state = location.pathname.split("/")[1] === "createBlog" ? true : false;
  const [data, setdata] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!state) {
      const fetchData = async () => {
        const id = location.pathname.split("/")[2];
        const response = await axios.get(
          `${serverURL}/api/blog/blogdetail/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": getToken(),
            },
          }
        );

        const res = response.data;
        setdata({
          title: res[0].title,
          content: res[0].content,
        });
      };
      fetchData();
    } else {
      setdata({
        title: "",
        content: "",
      });
    }
  }, [location.pathname, state]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="signbox" style={{ marginTop: "100px" }}>
        <BlogAddUpdate
          state={state}
          data={data}
          setdata={setdata}
          locationName={location.pathname}
        />
      </div>
    </div>
  );
}

export default Addblog;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken, serverURL } from "../../utils/Common";
import Spinner from "../../utils/Spinner";
import axios from "axios";

const ArticleDetail = ({ match }) => {
  const id = match.params.id;
  const [blogData, setBlogData] = useState([]);
  const fetchData = async () => {
    try {
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
      setBlogData(res);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  if (!blogData.length === 0) {
    return <div>Article not found!</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {blogData.length === 0 ? (
        <Spinner />
      ) : (
        blogData &&
        blogData.map((item) => {
          return (
            <div
              key={item._id}
              style={{
                width: "430px",
              }}
            >
              <div className="card" style={{ width: "fit-content" }}>
                <img src="https://dummyimage.com/424x264" alt="error" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-title">Author - {item.user}</p>
                  <p className="card-title">Email - {item.email}</p>
                  <p className="card-text">{item.content}</p>
                  <p className="card-text">
                    Created Date - {new Date(item.date).toGMTString()}
                  </p>
                </div>
                <div className="mx-3 my-2">
                  <Link className="btn p-0 mx-1" to="/dashboard">
                    <div style={{ color: "red" }}>&#8592; Go Back</div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ArticleDetail;

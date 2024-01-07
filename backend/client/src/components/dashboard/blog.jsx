import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken, getUserEmail, serverURL } from "../../utils/Common";
import Spinner from "../../utils/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

const Blog = () => {
  const [allBlogList, setAllBlogList] = useState([]);
  const [reRender, setreRender] = useState();
  const [spinnerState, setspinnerState] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/blog/allblog`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
      });
      const data = response.data;
      setAllBlogList(data);
      setspinnerState(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender]);

  const deleteFunc = async (id) => {
    const response = await axios.delete(
      `${serverURL}/api/blog/deleteBlog/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
      }
    );
    const res = response.data;
    setreRender(res);
  };

  const handleBlogDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this blog ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFunc(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div>
      <div className="my-3 d-flex flex-wrap justify-content-center align-items-center">
        {spinnerState ? (
          <Spinner />
        ) : allBlogList.length !== 0 ? (
          allBlogList.map((item, index) => {
            return (
              <div
                key={item._id}
                className="card my-2"
                style={{ width: "350px", margin: "10px" }}
              >
                <img src="https://dummyimage.com/424x264" alt="error" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="m-1">{item.title}</h5>
                    {getUserEmail() === item.email && (
                      <div className="d-flex m-1 justify-content-center align-items-center">
                        <Link to={`/updateBlog/${item._id}`}>
                          <FontAwesomeIcon
                            style={{
                              color: "lightblue",
                              margin: "0 4px",
                              cursor: "pointer",
                            }}
                            icon={faEdit}
                          />
                        </Link>
                        <FontAwesomeIcon
                          onClick={() => handleBlogDelete(item._id)}
                          style={{
                            color: "orange",
                            margin: "0 4px ",
                            cursor: "pointer",
                          }}
                          icon={faTrashAlt}
                        />
                      </div>
                    )}
                  </div>
                  <p className="m-1" style={{ color: "gray" }}>
                    author - {item.user}{" "}
                  </p>
                  <p
                    className="m-1"
                    style={{ color: "gray", fontSize: "13px" }}
                  >
                    {item.content.length > 50
                      ? item.content.slice(0, 50) + "..."
                      : item.content}
                  </p>
                  <div className="m-1 d-flex justify-content-between align-items-center">
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      Create At - {new Date(item.date).toGMTString()}
                    </div>
                    <Link className="btn p-0 mx-1" to={`/article/${item._id}`}>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        Read More
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: "white", height: "100vh", textAlign: "center" }}>
            No Blog found
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

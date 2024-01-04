import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/Common";

const Blog = () => {
  const [allBlogList, setAllBlogList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blog/allblog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
      });

      const data = await response.json();
      setAllBlogList(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div className="my-3 cardstyle">
        {allBlogList.length !== 0 ? (
          allBlogList.map((item, index) => {
            return (
              <div
                key={item._id}
                className="card my-2"
                style={{ width: "350px" }}
              >
                <img src="https://dummyimage.com/424x264" alt="error" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.content}</p>
                  <Link className="btn p-0 mx-1" to={`/article/${item._id}`}>
                    <div style={{ color: "red", fontSize: "12px" }}>
                      Read More
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{color:"white",height:'100vh' ,textAlign:"center"}}>No Blog found</div>
        )}
      </div>
    </div>
  );
};

export default Blog;

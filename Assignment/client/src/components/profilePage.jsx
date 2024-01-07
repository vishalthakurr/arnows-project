import React, { useEffect, useState } from "react";
import {
  getToken,
  getUserEmail,
  getUserName,
  serverURL,
} from "../utils/Common";
import axios from "axios";

const ProfilePage = () => {
  const [numberPost, setNumberPost] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/api/blog/userPost/${getUserEmail()}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setNumberPost(data.userpost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          width: "530px",
        }}
      >
        <div className="card p-3">
          <h5 className="card-title">Your Profile </h5>
          <div className="card-body">
            <div className="profileCard">
              <img
                src="https://dummyimage.com/100x100"
                className="rounded-circle"
                alt="..."
                width={60}
                height={60}
              />
              <div>
                <p className="m-0">{getUserName()}</p>
                <p className="m-0" style={{ color: "#9CA3AF" }}>
                  {getUserEmail()}
                </p>
              </div>
            </div>
            <div className="profileBlogPost">
              <p className="m-0" style={{ color: "#9CA3AF" }}>
                Number of Posts
              </p>
              <p className="m-0">{numberPost}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

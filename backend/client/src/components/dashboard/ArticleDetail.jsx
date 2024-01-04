import React from "react";
import { Link } from "react-router-dom";

const ArticleDetail = ({ match }) => {
  const articleId = parseInt(match.params.id);
  console.log(articleId);
  const article = true;

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "60px" }}
      >
        <div className="card" style={{ width: "fit-content" }}>
          <img
            src="https://dummyimage.com/424x264"
            className="card-img-top "
            alt="error"
            style={{ width: "fit-content" }}
          />
          <div className="card-body">
            <h5 className="card-title">Blod post title</h5>
            <p className="card-text">
              Lorem Blod post title Blod post title Blod post title ...
            </p>
          </div>
          <div className="mx-3 my-2">
            <Link className="btn p-0 mx-1" to="/dashboard">
              <div style={{ color: "red" }}>&#8592; Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

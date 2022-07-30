import React from "react";
import { useNavigate } from "react-router-dom";

function Posts({ posts, loading }) {

  const navigate = useNavigate();

  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  
  const gotoPage = (value) => {
    navigate("/blogview", {
      state: {
        id: value.id,
        title: value.title,
        content: value.content,
        date: value.date,
      },
    });
  };


  return (
    <div>
      {posts.map((value, index) => {
        const dateString = value.date;

        const formatDate = (dateString) => {
          return new Date(dateString).toLocaleString();
        };

        return (
          <div key={index} style={{ cursor: "pointer" }}>
            <div
              className="card text-white bg-secondary mt-5 mb-3"
              style={{ maxWidth: "50rem" }}
              onClick={() => {
                gotoPage(value);
              }}
            >
              <div
                style={{
                  backgroundColor: "#038AF0",
                  display: "inline-block",
                  padding: "2px 10px",
                }}
              >
                <img src="user-icon.png" alt="" />
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#038AF0",
                    display: "inline-block",
                  }}
                >
                  {value.title}
                </div>
              </div>
              <div
                className="card-body"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <h5 className="card-title">{}</h5>
                <h5
                  className="card-text"
                  style={{ fontSize: "12px", textAlign: "justify" }}
                >
                  {value.content}
                </h5>
                <h5 className="card-text">
                  <small style={{ color: "gray", fontSize: "10px" }}>
                    Posted on {formatDate(dateString)}
                  </small>
                </h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;

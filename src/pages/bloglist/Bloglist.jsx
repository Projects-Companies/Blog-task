import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";

function CommentPost({ itemsPerPage }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  function fetchPosts() {
    setLoading(true);
    fetch("http://localhost:3001/post")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data.Response);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // GET CURRENT POST

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // CHANGE PAGE

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // POSTING A POST

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    date: "",
  });

  // POSTING S POST

  const handlePost = (e) => {
    const { name, value } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    const bodies = {
      title: postData.title,
      content: postData.content,
      date: postData.date,
    };

    const res = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodies),
    });

    const data = res.json();

    console.log(data);

    setPostData(data);
    setPostData({
      title: "",
      content: "",
      date: "",
    });

    fetchPosts()

  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Add New Post
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Your Post Here
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Write the Title"
                    name="title"
                    value={postData.title}
                    onChange={handlePost}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    placeholder="Write the Content"
                    name="content"
                    value={postData.content}
                    onChange={handlePost}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>

      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default CommentPost;

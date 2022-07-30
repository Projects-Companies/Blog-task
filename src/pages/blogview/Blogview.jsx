import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Accordion,
  useAccordionButton,
  Row,
  Col,
} from "react-bootstrap";
import Test from "./Test";

const Blogview = () => {
  // RENDERING A PAGE

  const { state } = useLocation();

  // =====================================

  // SET REPLY DATA STATE

  const [ReplyData, setReplyData] = useState({
    name: "",
    comment: "",
  });

  // GET API FOR REPLIES STATE

  const [getReplyFromBackend, setGetReplyFromBackend] = useState([]);

  console.log(getReplyFromBackend);

  // =========================================

  // SET COMMENT DATA STATE

  const [comments, setComments] = useState({
    name: "",
    comment: "",
  });

  // GET API FOR COMMENT STATE

  const [commentData, setCommentData] = useState([]);

  // ==========================================

  // GETTING A BLOG ID FOR DIFFERENT API (state.id)

  const getBlogIDForReply = state;

  const getIdOfBlog = state;

  const gettingIdForBlogToPostComments = state;

  // POST API FOR REPLY START HERE

  const inputReplies = (e) => {
    const { name, value } = e.target;
    setReplyData({ ...ReplyData, [name]: value });
  };

  const onSubmitReplies = (id) => {
    const BlogID = getBlogIDForReply.id;

    const { name, comment } = ReplyData;

    const method = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        comment: comment,
        replyid: id,
        blog: BlogID,
      }),
    };

    fetch(`http://localhost:3001/reply`, method)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setReplyData(data.Response);
      });

    setReplyData({
      name: "",
      comment: "",
    });

    getCommentsDataFromBackend(getIdOfBlog);
  };

  // POST API FOR COMMENT START HERE

  const inputComments = (e) => {
    const { name, value } = e.target;
    setComments({ ...comments, [name]: value });
  };

  const onSubmit = async (gettingIdForBlogToPostComments) => {
    const id = gettingIdForBlogToPostComments.id;

    const { name, comment } = comments;

    const method = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comments),
    };

    const res = await fetch(`http://localhost:3001/comment/${id}`, method);

    const data1 = res.json();

    setComments(data1.Response);

    setComments({
      name: "",
      comment: "",
    });

    getCommentsDataFromBackend(getIdOfBlog);
  };

  // GET API FOR PARENT COMMENT

  async function getCommentsDataFromBackend(getIdOfBlog) {
    const num = getIdOfBlog;
    const id = num.id;

    let res = await fetch(`http://localhost:3001/comment/${id}`, {
      method: "GET",
    });
    let data = await res.json();

    setCommentData(data.Response);
  }

  // GET API FOR REPLY COMMENT

  async function getReplyDataFromBackend(id) {
    // const num = getIdOfBlog;
    // const id = num.id;

    let res = await fetch(`http://localhost:3001/reply/${id}`, {
      method: "GET",
    });
    let data = await res.json();

    setGetReplyFromBackend(data.Response);
  }

  useEffect(() => {
    getCommentsDataFromBackend(getIdOfBlog);
    getReplyDataFromBackend(15);
  }, []);

  // COMMENT TOGGLE

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      return "";
    });

    return (
      <div>
        <Button
          className="btn btn-sm-primary btn-sm"
          style={{ fontSize: "10px" }}
          onClick={decoratedOnClick}
        >
          Comment
        </Button>
      </div>
    );
  }

  function CancelToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      return "";
    });

    return (
      <div>
        <Button
          variant="outline-danger mt-2 btn-sm"
          style={{ fontSize: "10px" }}
          onClick={decoratedOnClick}
        >
          Cancel
        </Button>
      </div>
    );
  }

  // PARENT REPLY TOGGLE

  function CustomToggle2({ eventKey }) {
    const decoratedOnClick2 = useAccordionButton(eventKey, () => {
      return "";
    });

    return (
      <div>
        <Button
          variant="outline-secondary btn-sm"
          style={{ fontSize: "10px", marginBottom: "20px" }}
          onClick={() => decoratedOnClick2()}
        >
          Reply
        </Button>
      </div>
    );
  }

  function CancelToggle2({ eventKey }) {
    const decoratedOnClick2 = useAccordionButton(eventKey, () => {
      return "";
    });

    return (
      <div>
        <Button
          variant="outline-danger mt-2 btn-sm"
          style={{ fontSize: "10px" }}
          onClick={decoratedOnClick2}
        >
          Cancel
        </Button>
      </div>
    );
  }

  // CHANGING A DATE FORMAT FORM TIMESTAMP TO DATE AND TIME FORMAT

  const dateString = state.date;

  // THIS ONE IS FOR BLOG TIME AND DATE

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // THIS ONE IS FOR COMMENTS TIME AND DATE

  const formatDate2 = (dateString2) => {
    return new Date(dateString2).toLocaleString();
  };

  // MAIN FUNCTION RETURN STARTS HERE

  return (
    <div>
      {/* BLOG */}
      <div
        className="card text-white bg-secondary mt-5 mb-3"
        style={{ maxWidth: "50rem" }}
      >
        <div className="card-header" style={{ backgroundColor: "#038AF0" }}>
          {state.title}
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
            {state.content}
          </h5>
          <h5 className="card-text">
            <small style={{ color: "gray", fontSize: "10px" }}>
              Posted on {formatDate(dateString)}
            </small>
          </h5>
          <hr></hr>

          {/* COMMENT TOGGLE BUTTON */}

          <Accordion defaultActiveKey="0">
            <Card style={{ border: "none" }}>
              <CustomToggle eventKey="1"></CustomToggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <form>
                    <label
                      style={{
                        fontSize: "17px",
                        fontWeight: 500,
                        marginBottom: "3px",
                      }}
                    >
                      User:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={comments.name}
                      className="form-control"
                      onChange={inputComments}
                      placeholder="Name"
                    ></input>
                    <label>Comment</label>
                    <textarea
                      className="form-control"
                      placeholder="Comment"
                      name="comment"
                      value={comments.comment}
                      onChange={inputComments}
                    ></textarea>
                    <Row>
                      <Col sm={8}></Col>
                      <Col sm={2}>
                        <CancelToggle eventKey="1"></CancelToggle>
                      </Col>
                      <Col sm={2}>
                        <Button
                          style={{ fontSize: "10px" }}
                          variant="outline-success mt-2 btn-sm"
                          onClick={() => {
                            return onSubmit(gettingIdForBlogToPostComments);
                          }}
                        >
                          Comment
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          {/* GETTNG PARENT COMMENT DATA */}

          <p style={{ marginTop: "16px" }}>Comments</p>

          {commentData &&
            commentData.map((cValue, index) => {
              return (
                cValue.replyid === 0 && (
                  <div key={index}>
                    <Row>
                      <Col sm={1}>
                        <img src="/user-icon.png" alt="" />
                      </Col>
                      <Col>
                        <Row>
                          <Col
                            sm={2}
                            style={{
                              fontSize: "15px",
                              fontWeight: 500,
                              color: "blue",
                            }}
                          >
                            {cValue.name}
                          </Col>
                          <Col
                            style={{
                              fontSize: "8px",
                              color: "gray",
                              textAlign: "center",
                              paddingTop: "3px",
                            }}
                            sm={3}
                          >
                            {formatDate2(cValue.commentdatetime)}
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col sm={12} style={{ fontSize: "12px" }}>
                            {cValue.comment}
                          </Col>
                        </Row>
                      </Col>

                      {/* REPLY TOGGLE */}

                      <Row>
                        <Col sm={1}></Col>
                        <Col sm={1}>{CancelToggle2}</Col>

                        <Col sm={9}>
                          <Accordion defaultActiveKey="0">
                            <Card style={{ border: "none" }}>
                              <CustomToggle2 eventKey="1"></CustomToggle2>
                              <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                  <form>
                                    <label>User</label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={ReplyData.name}
                                      onChange={inputReplies}
                                      className="form-control"
                                      placeholder="Name"
                                    ></input>
                                    <label>Comment</label>
                                    <textarea
                                      className="form-control"
                                      name="comment"
                                      value={ReplyData.comment}
                                      onChange={inputReplies}
                                      placeholder="Comment"
                                    ></textarea>
                                    <Row>
                                      <Col sm={8}></Col>
                                      <Col sm={2}>
                                        <CancelToggle2 eventKey="1"></CancelToggle2>
                                      </Col>
                                      <Col sm={2}>
                                        <Button
                                          style={{ fontSize: "10px" }}
                                          variant="outline-success mt-2 btn-sm"
                                          onClick={() => {
                                            return onSubmitReplies(
                                              cValue.parentid
                                            );
                                          }}
                                        >
                                          Reply
                                        </Button>
                                      </Col>
                                    </Row>
                                  </form>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </Col>
                      </Row>
                    </Row>
                  </div>
                )
              );
            })}

          {/* REPLY DATA */}

          {getReplyFromBackend &&
            getReplyFromBackend.map((rValue, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Col sm={3}></Col>
                    <Col sm={1}>
                      <img src="/user-icon.png" alt="" />
                    </Col>
                    <Col>
                      <Row>
                        <Col
                          sm={5}
                          style={{
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "blue",
                          }}
                        >
                          {rValue.name}
                        </Col>
                        <Col
                          style={{
                            fontSize: "8px",
                            color: "gray",
                            textAlign: "center",
                            paddingTop: "3px",
                          }}
                          sm={3}
                        >
                          {formatDate2(rValue.commentdatetime)}
                        </Col>
                      </Row>
                      <Row className="mb-1">
                        <Col sm={12} style={{ fontSize: "12px" }}>
                          {rValue.comment}
                        </Col>
                      </Row>
                    </Col>

                    {/* REPLY TOGGLE */}

                    <Row>
                      <Col sm={1}></Col>
                      <Col sm={5}>{CancelToggle2}</Col>

                      <Col sm={3}>
                        <Accordion defaultActiveKey="0">
                          <Card style={{ border: "none" }}>
                            <CustomToggle2 eventKey="1"></CustomToggle2>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                <form>
                                  <label>User</label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={ReplyData.name}
                                    onChange={inputReplies}
                                    className="form-control"
                                    placeholder="Name"
                                  ></input>
                                  <label>Comment</label>
                                  <textarea
                                    className="form-control"
                                    name="comment"
                                    value={ReplyData.comment}
                                    onChange={inputReplies}
                                    placeholder="Comment"
                                  ></textarea>
                                  <Row>
                                    <Col sm={8}></Col>
                                    <Col sm={2}>
                                      <CancelToggle2 eventKey="1"></CancelToggle2>
                                    </Col>
                                    <Col sm={2}>
                                      <Button
                                        style={{ fontSize: "10px" }}
                                        variant="outline-success mt-2 btn-sm"
                                        onClick={() => {
                                          return onSubmitReplies(
                                            rValue.parentid
                                          );
                                        }}
                                      >
                                        Reply
                                      </Button>
                                    </Col>
                                  </Row>
                                </form>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </Col>
                    </Row>
                  </Row>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Blogview;

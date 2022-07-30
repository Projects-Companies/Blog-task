import React, { useState, useEffect } from "react";

function Test() {
  const [getChildReplies, setGetChildReplies] = useState([]);
  




  const settingRepliesCommenToBackend = () => {
    fetch(`http://localhost:3001/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name: "",
        comment: "",
        replyid: "",
        blog: "",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setGetChildReplies(data.Response));
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      {getChildReplies.map((value, index) => {
        return (
          <div key={index}>
            {value.parentid}
            {value.comment}
            {value.blog}
          </div>
        );
      })}
    </div>
  );
}

export default Test;

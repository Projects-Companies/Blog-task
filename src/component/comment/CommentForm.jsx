import React from "react";

const CommentForm = (commentorId) => {
  

  return (
    <div className="comment-form-div">
      <form>
      <h3>Add a Comment</h3>
        <input
          className="comment-form-textarea-1"
          type="text"
          placeholder="Name"
          name="username"
          // value={username}
        />

        <textarea
          className="comment-form-textarea"
          name="body"
          // value={body}
          placeholder="Comment"
        />

        <div className="Buttons-of-comment">
          <button className="comment-form-button" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;





// const CommentPost = () => {
//   return (
//     <div>

//             <div>
//               <div className="comment">
//                 <div className="comment-box">
//                   <div className="comment-image-container">
//                     <img src="/user-icon.png" alt="Logo unloaded" />
//                   </div>

//                   <div className="comment-right-part">
//                     <div className="comment-content">
//                       <div className="comment-author">Username</div>
//                       <div>CreatedAt</div>
//                     </div>
//                     <div className="comment-text">Body</div>
//                   </div>
//                   <button className="comment-actions">Reply</button>
//                   <button className="comment-actions">Edit</button>
//                   <button className="comment-actions">Delete</button>
//                 </div>

//                 <div></div>
//               </div>
//            </div>
//     </div>
//   );
// };

// export default CommentPost;
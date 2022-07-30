import React from "react";
import {Link } from "react-router-dom"

function Pagination({ postsPerPage, totalPosts, paginate }) {
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
         return <li key={number} className="page-item">
            <Link to="#" className="page-link" onClick={() => paginate(number)}>
            {number}
            </Link>
          </li>;
        })}
      </ul>
    </nav>
  );
}

export default Pagination;

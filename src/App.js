import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Blogview from "./pages/blogview/Blogview";
import Bloglist from "./pages/bloglist/Bloglist";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/" element={<Bloglist />} />
          <Route path="/bloglist" element={<Bloglist />} />
          <Route path="/blogview" element={<Blogview />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
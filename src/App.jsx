import React from "react"
//
import Header from "./components/Header";
import Home from "./components/Home";
import Blog from "./components/Blog";
import About from "./components/About";
import Projects from "./components/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return(
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

    
    
  );

  
  
}

export default App

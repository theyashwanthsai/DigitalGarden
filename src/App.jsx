import React from "react"
import ArticlePage from "./components/ArticlePage"
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import About from "./components/About";
import Projects from "./components/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return(
    <div className="bg-black text-white min-h-screen font-iosevka">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

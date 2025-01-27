import React from "react"
import ArticlePage from "./components/ArticlePage"
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import About from "./components/About";
import Projects from "./components/Projects";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import PDFEmbed from './components/PDFEmbed';

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
          <Route path="/content/:slug" element={<ArticlePage />} />
          <Route path="/content/:folder/:slug" element={<ArticlePage />} />
          <Route path="/resume" element={<PDFEmbed />} />
        </Routes>
     <Analytics />
      </BrowserRouter>
    </div>
  );
}

export default App

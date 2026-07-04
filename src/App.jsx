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
import Timeline from './components/Timeline'



function App() {
  return(
    <div
      className="min-h-screen w-full relative"
      style={{ backgroundColor: "var(--canvas)" }}
    >
      <div className="relative z-10 ">
        <BrowserRouter>
          <Header />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<PDFEmbed />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/:slug" element={<ArticlePage />} />
            <Route path="/:folder/:slug" element={<ArticlePage />} />
          </Routes>
          <Analytics />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App

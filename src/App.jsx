import React from "react"
import ArticlePage from "./components/ArticlePage"
import Header from "./components/Header";
import Garden from "./components/Garden";
import Articles from "./components/Articles";
import Me from "./components/Me";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import PDFEmbed from './components/PDFEmbed';
import Timeline from './components/Timeline'



function App() {
  return(
    <div className="min-h-screen w-full relative app-canvas">
      <div className="relative z-10 ">
        <BrowserRouter>
          <Header />

          <Routes>
            <Route exact path="/" element={<Garden />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/me" element={<Me />} />
            <Route path="/about" element={<Navigate to="/me" replace />} />
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

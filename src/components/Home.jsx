import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import './markdown.css'; 

function Home() {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/static/home.md`);
        if (response.ok) {
          const markdownFile = await response.text();
          setMarkdownContent(markdownFile);
        } else {
          console.error("Error fetching the Markdown file");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkdown();
  }, []); // Add empty dependency array to run effect only once


  return (
    <div className="lg:p-5 flex items-center justify-center flex-col text-left pt-5">
      <div className="p-5 text-lg mb-6 w-11/12 lg:w-5/12 leading-loose font-medium">
        <Markdown 
          className="markdown" 

          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {markdownContent}
        </Markdown>
      </div>
    </div>
  );
}

export default Home;

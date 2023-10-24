import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import gfm from 'remark-gfm';
// import Markdown from 'marked-react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

function ArticlePage() {
  const { slug } = useParams();
  // const markdownContent = '# A demo of `react-markdown`'
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/content/${slug}.md`);
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
  }, [slug]);

  return (
    <div className="lg:p-5 flex items-center justify-center flex-col text-left pt-5 pb-6">
      <div className="markdown p-5 text-lg mb-6 border-4 w-11/12 lg:w-9/12 ">
            <Markdown>{markdownContent}</Markdown>
      </div>
    </div>
    
  );
}



export default ArticlePage;
// `../content/${slug}.md`
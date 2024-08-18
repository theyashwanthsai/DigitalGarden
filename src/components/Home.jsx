import React, { useEffect, useRef, useState } from "react";
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import Markdown from "react-markdown";
// import './markdown-styles.css';

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
  });

  const components = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-blue-600 mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-green-600 mb-3" {...props} />,
    a: ({node, ...props}) => <a className="text-purple-600 underline hover:text-purple-800" {...props} />,
    // Add more custom components as needed
  };

  return (
    <div className="lg:p-5 flex items-center justify-center flex-col text-left pt-5">
      
      <div className=" p-5 text-lg mb-6 w-11/12 lg:w-5/12 leading-loose font-medium">
      
      <Markdown className="markdown" components={components}>
        {markdownContent}
      </Markdown>

      </div>
    </div>
    
  );
  
  
}

export default Home

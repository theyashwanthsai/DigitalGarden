import React, { useEffect, useRef, useState } from "react";
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import Markdown from "react-markdown";


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

  return (
    <div className="lg:p-5 flex items-center justify-center flex-col text-left pt-5">
      
      <div className=" p-5 text-lg mb-6 w-11/12 lg:w-5/12 leading-loose font-medium">
      <Markdown className="markdown">
        {markdownContent}
      </Markdown>

      </div>
    </div>
    
  );
  
  
}

export default Home

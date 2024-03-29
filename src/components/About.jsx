import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

// ![linee](https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif)

function About() {
  
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/static/about.md`);
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
export default About

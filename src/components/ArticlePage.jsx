import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Markdown from "react-markdown";
// import gfm from 'remark-gfm';
import Markdown from 'marked-react'


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
    <div className="p-5 flex items-center justify-center flex-col text-left pt-5 pb-6 ">
      <div className="markdown p-10 text-lg max-w-xl mb-6">
            <Markdown>{markdownContent}</Markdown>
      </div>
    </div>
    
  );
}



export default ArticlePage;
// `../content/${slug}.md`
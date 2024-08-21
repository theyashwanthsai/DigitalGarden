import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './markdown.css';

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
  }, []);

return (

    <div className="markdown-content">
      <Markdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdownContent}
      </Markdown>
    </div>
  );
}

export default Home;

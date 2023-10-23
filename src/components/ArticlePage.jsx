import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Markdown from "react-markdown";
// import gfm from 'remark-gfm';
import Markdown from 'markdown-to-jsx'


function ArticlePage() {
  const { slug } = useParams();
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
    <div className="p-10">
            {/* <Markdown remarkPlugins={[gfm]}>{markdownContent}</Markdown> */}
            <Markdown>{markdownContent}</Markdown>
    </div>
  );
}



export default ArticlePage;
// `../content/${slug}.md`
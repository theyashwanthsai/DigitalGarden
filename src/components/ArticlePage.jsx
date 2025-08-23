import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './markdown.css'

function ArticlePage() {
  const { folder, slug } = useParams();
  console.log(folder)
  console.log(slug)
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        // Still fetch from the content directory, but URLs don't show it
        const path = folder 
          ? `/content/${folder}/${slug}.md`  // For nested files
          : `/content/${slug}.md`;          // For root level files
        
        const response = await fetch(path);
  
        if (response.ok) {
          const markdownFile = await response.text();
          setMarkdownContent(markdownFile);
        } else {
          console.error("Error fetching the Markdown file");
          setMarkdownContent("# 404\nArticle not found");
        }
      } catch (error) {
        console.error(error);
        setMarkdownContent("# Error\nFailed to load article");
      }
    };
    fetchMarkdown();
  }, [folder, slug]);

  const customRenderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    // <div className="article-container ">
      
        <div className="markdown-content backdrop-blur-sm bg-white/30">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={customRenderers}
          >
            {markdownContent}
          </Markdown>
        </div>
      // </div>

  );
}

export default ArticlePage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './markdown.css'

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
    <div className="article-container">
      <div className="article-content">
        <div className="markdown-content">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={customRenderers}
          >
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;

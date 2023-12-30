import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
    <div className="lg:p-5 flex items-center justify-center flex-col text-left pt-5 pb-">
      <div className="markdown p-5 text-lg mb-6 border-4 w-11/12 lg:w-9/12 font-victor">
      {/* <Markdown>
          {markdownContent}
        </Markdown> */}
        {/* <Markdown>{markdownContent}</Markdown> */}
        <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }, any) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (
            <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdownContent}
    </Markdown>

      </div>
    </div>
    
  );
}



export default ArticlePage;
// `../content/${slug}.md`
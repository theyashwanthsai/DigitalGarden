// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { useParams } from 'react-router-dom';

// const Article = () => {
//   const { slug } = useParams();
//   const [articleContent, setArticleContent] = useState('');

//   useEffect(() => {
//     import(`./content/${slug}.md`)
//       .then((module) => {
//         setArticleContent(module.default);
//       })
//       .catch((error) => {
//         console.error(`Error loading content for ${slug}:`, error);
//         // You can set some default content or redirect to an error page here
//       });
//   }, [slug]);

//   return (
//     <div className="p-5">
//       <ReactMarkdown source={articleContent} />
//     </div>
//   );
// };

// export default Article;
import React from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { slug } = useParams();
  return (
    <div className="p-5">
      <p>Loading article with slug: {slug}</p>
    </div>
  );
};

export default Article;

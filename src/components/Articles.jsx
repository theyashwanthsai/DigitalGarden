import React from "react"
import articles from "./articleList"
import { Link } from 'react-router-dom';

function Articles() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-center pt-20 pb-6">
      <div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
        <h1 className = "p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Articles</h1>
      </div>
      <div className="md:w-2/4 ">
      {articles.map((item, index) => (
        
        <p key={index} className="p-9 mt-2 text-lg border-4 rounded-2xl">
            <Link to= {`/articles/${item.slug}`}>{item.title}</Link>
          <p className="italic font-thin text-base p-3">{item.tags}</p>
        </p>
        
      ))} 
      </div>
    </div>
  );
}

export default Articles

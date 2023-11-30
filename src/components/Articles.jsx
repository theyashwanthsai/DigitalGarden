import React from "react"
import articles from "./articleList"
import { Link } from 'react-router-dom';

function Articles() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
        <h1 className = "p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Articles</h1>
      </div>
      <div className="p-2 text-xl  mb-6 font-semibold md:w-6/12">
      <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">"If you don’t produce, you won’t thrive—no matter how skilled or talented you are." - Cal Newport</p>
      </blockquote>
      </div>
      
      <div className="md:w-6/12 ">
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

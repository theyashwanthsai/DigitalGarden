import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";


// function Projects() {
//   return(
//     <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
//       <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
//       <h1 className = "p-2 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Projects</h1>
//       </div>
      
//       <p className="p-2 text-xl  mb-6 font-semibold md:w-6/12">
//       <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
//         <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">"When a measure becomes a target, it ceases to be a good measure." - Goodhart's Law</p>
//       </blockquote>
//       <br></br>
//         I always believe in learning by building. 
//         Projects are what I have been building from the past two years. 
//         Here are few of the projects I built while exploring various fields of interest. </p>
      
//       <div className="md:w-6/12 ">
//       {projects.map((item, index) => (
//         <p key={index} className="p-9 mt-2 text-lg border-4 rounded-xl">
//           <a className="underline font-semibold" href={item.link}>
//             {item.title}
//           </a>{' '}
//           - {item.description}
//           <p className="italic font-thin text-base p-3">{item.tags}</p>
//         </p>
//       ))}     
//       </div>
      
//     </div>
//   );

  
  
// }



function Projects() {
  
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/static/projects.md`);
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



export default Projects

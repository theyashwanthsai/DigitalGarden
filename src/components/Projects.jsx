import React from "react" 
import projects from "./ProjectList.js";


function Projects() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className = "p-2 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Projects</h1>
      <p className="p-2 text-xl  mb-6 font-semibold md:w-2/4">
        I always believe in learning by building. 
        Projects are what I have been building from the past two years. 
        Here are few of the projects I built while exploring various fields of interest. </p>
      <div className="md:w-2/4 ">
      {projects.map((item, index) => (
        <p key={index} className="p-3 mt-2 text-lg border-4 rounded-xl">
          <a className="underline font-semibold" href={item.link}>
            {item.title}
          </a>{' '}
          - {item.description}
        </p>
      ))}
      
      
      </div>
      
    </div>
  );

  
  
}

export default Projects

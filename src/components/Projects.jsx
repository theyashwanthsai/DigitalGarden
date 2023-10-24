import React from "react" 
import projects from "./ProjectList.js";


function Projects() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className = "p-2 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Projects</h1>
      </div>
      
      <p className="p-2 text-xl  mb-6 font-semibold md:w-5/12">
      <p>When a measure becomes a target, it ceases to be a good measure - Goodhart's Law</p>
      <br></br>
        I always believe in learning by building. 
        Projects are what I have been building from the past two years. 
        Here are few of the projects I built while exploring various fields of interest. </p>
      <div className="md:w-5/12 ">
      {projects.map((item, index) => (
        <p key={index} className="p-9 mt-2 text-lg border-4 rounded-2xl">
          <a className="underline font-semibold" href={item.link}>
            {item.title}
          </a>{' '}
          - {item.description}
          <p className="italic font-thin text-base p-3">{item.tags}</p>
        </p>
      ))}     
      </div>
      
    </div>
  );

  
  
}

export default Projects

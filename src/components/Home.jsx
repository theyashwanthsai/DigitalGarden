import React from "react"
import { SocialIcon } from 'react-social-icons';


function Home() {
  return(
    <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Sai Yashwanth</h1>
      <img className = "h-100 w-96 object-cover rounded-3xl" src="./img.jpeg" alt="a cool pic" />
      <p className="p-10 text-lg max-w-xl mb-6 font-bold ">
        Hello, I'm Sai Yashwanth. I am a passionate developer, builder and learner. Welcome to my <a className= "underline" href = "https://www.dschapman.com/notes/5e6ba56d-11d3-4db0-a114-c8a415fd0bf6">Digital Garden!</a>
        <br />
        <br />
        Here's a rough map of this website:

        <br /> 
        <b className="underline">Projects</b>: List of all the Projects I have worked on since I started this journey of computer science.
        <br /> 
        <b className="underline"> Blog</b>: List of some of the best blogs I have written. I try to share my learnings by writing blogs, in hopes of helping someone in some way.

      </p>
      <div className="flex">
      <div className="p-2">
      <SocialIcon url="https://github.com/theyashwanthsai" fgColor= "#ffff" />
      </div>
      <div className="p-2">
      <SocialIcon url="https://twitter.com/yashwanthsai29" />
      </div>       
      <div className="p-2">
      <SocialIcon url="https://www.linkedin.com/in/yashwanth-sai-457aa51b9/" />
      </div>
      </div>
      

    </div>
  );

  
  
}

export default Home

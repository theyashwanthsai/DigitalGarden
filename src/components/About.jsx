import React from "react"



function About() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className = "p-2 text-3xl md:text-4xl dark:text-white mb-1 md:mb-3 font-bold">About</h1>
      <p className="p-2 text-base max-w-xl mb-6 font-semibold">Hello, I am Sai Yashwanth, a Computer Science Engineer from Bangalore currently pursuing my undergrad from PES University.
       I am a Developer interested in Backend development, Devops and Machine Learning. 
       I love building products which help others in some way or the other. I believe in learning in public, That is how I make friends and in-turn learn from them and their experiences. 
       You can check what I'm building <a className= "underline" href="https://github.com/theyashwanthsai">here</a>. 
      <br /> Follow me on Twitter, Linkedin, Github</p>
    </div>
  );

  
  
}

export default About

import React from "react"


function About() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
        <div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
          <h1 className = "p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">About Me</h1>
        </div>
        <img src="/sai2.png" alt="cool guy" className="rounded-xl"/>
      <p className="p-5 text-lg max-w-xl mb-6 font-bold">Hi there! My name is Sai Yashwanth, I am an Engineer. I love building stuff and writing about them online. I also like solving problems using tech and and enjoy learning various things.
      <br /> <br />You can check what I'm building <a className= "underline" href="https://github.com/theyashwanthsai">here</a>. 
        <br /> Follow me on Twitter, Linkedin, Github
        <br />
        <br />
        <br />
        <h3 class=" text-2xl md:text-3xl dark:text-white mb-1 md:mb-3 font-bold">Tech that I use</h3>
        <li>
          Macbook Air 2017
        </li>
        <li>
          Acer ED270R 27 Inch Curved LCD
        </li>
        <li>
          Quantum Rapid Strike Mechanical Keyboard
        </li>
        <li>
          Wings Crosshair 200 Gaming Mouse
        </li>
      </p>
    </div >
  );

  
  
}

export default About

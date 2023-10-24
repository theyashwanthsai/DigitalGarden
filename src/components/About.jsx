import React from "react"


function About() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
        <div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
          <h1 className = "p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">About Me</h1>
        </div>
      <p className="p-5 text-lg max-w-xl mb-6 font-bold">Hi there! My name is Sai Yashwanth, and I'm a Computer Science undergraduate from PES University.
       You can check what I'm building <a className= "underline" href="https://github.com/theyashwanthsai">here</a>. 
      <br /> <br /> Follow me on Twitter, Linkedin, Github</p>

      <h5 className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Tech</h5>
      <div className="p-5 text-lg max-w-xl mb-6 font-bold">
        <ul></ul>
      <p>
        Macbook Air 2017 <br />
        Acer ED270R 27 Inch Curved LCD <br />
        Quantum Rapid Strike Mechanical Keyboard <br />
        Huion H430P OSU Drawing Tablet (Idk why I have it)
        Wings Crosshair 200 Gaming Mouse
      </p>
      
      </div>
    </div >
  );

  
  
}

export default About

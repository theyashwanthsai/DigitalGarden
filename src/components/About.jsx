import React from "react"
import Typewriter from 'typewriter-effect';


function About() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      {/* <h1 className = "p-2 text-3xl md:text-4xl dark:text-white mb-1 md:mb-3 font-bold">About Me</h1> */}
      <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
<div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
<Typewriter 
  onInit={(typewriter) => {
    typewriter.typeString('About Me')
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(2500)
      .deleteAll()
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
  }}
/>
</div>
</div>












      <p className="p-2 text-lg md:w-2/4 mb-6 font-semibold ">Hi there! My name is Sai Yashwanth, and I'm a Computer Science undergraduate from PES University. I'm passionate about exploring various domains of computer science and constantly upgrading my skills.
Currently, I'm honing my skills in Web Development, with a primary focus on Backend Development. I'm also interested in Game Development using Python libraries like Pygame and Ursina, as well as Data Structures and Algorithms (DSA) Problem Solving and Competitive Programming. Besides, I'm enthusiastic about Machine Learning and Data Science and exploring its applications in different domains. I also recently got into chess programming and it's very interesting to say the least.
In my free time, I like to explore new technologies, learn something new like a new framework, and work on personal projects that challenge me to improve my skills.
I'm excited about leveraging my skills and knowledge to contribute to exciting projects and collaborate with like-minded individuals in the tech industry.
       You can check what I'm building <a className= "underline" href="https://github.com/theyashwanthsai">here</a>. 
      <br /> <br /> Follow me on Twitter, Linkedin, Github</p>
      <br />
      <br />
      <br />
      <h5 className="p-2 text-3xl md:text-4xl dark:text-white mb-1 md:mb-3 font-bold">Uses</h5>
      <div className="p-2 text-lg md:w-2/4 mb-6 font-semibold ">
      <li>Macbook Air 2017</li>
      <li>Acer ED270R 27 Inch Curved LCD</li>
      <li>Quantum Rapid Strike Mechanical Keyboard</li>
      <li>Huion H430P OSU Graphics Drawing Tablet </li>
      <li>Wings Crosshair 200 Gaming Mouse</li>
      </div>
    </div >
  );

  
  
}

export default About

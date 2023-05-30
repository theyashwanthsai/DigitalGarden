import React from "react"



function Home() {
  return(
    <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Sai Yashwanth</h1>
      <img className = "h-80 w-80 object-cover rounded-3xl" src="a.jpg" alt="a cool pic" />
      <p className="p-10 text-lg max-w-xl mb-6 font-bold">
        Hello, I'm Sai Yashwanth. I am a passionate developer, builder and learner. Welcome to my <a className= "underline" href = "https://www.dschapman.com/notes/5e6ba56d-11d3-4db0-a114-c8a415fd0bf6">Digital Garden!</a>
      </p>

    </div>
  );

  
  
}

export default Home

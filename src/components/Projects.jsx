import React from "react" 



function Projects() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
      <h1 className = "p-2 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Projects</h1>
      <p className="p-2 text-xl  mb-6 font-semibold md:w-2/4">
        I always believe in learning by building. 
        Projects are what I have been building from the past two years. 
        Here are few of the projects I built while exploring various fields of interest. </p>
      <div className="md:w-2/4 ">
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/UltrasonicFPS">UltraSonicFPS</a> - A 3d Exploration game played using our hand gestures</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/raycasting-3d-engine">Raycasting 3d Engine</a> - 3D raycasting engine similar to Doom/Wolfenstein made using python and pygame</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/ActionRPG-Pygame">ActionRPG</a> - Trying to build my dream action rpg game like Zelda using python</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/Anime-Recommendation-System">Anime Recommendation System</a> - A web app built with the help of Streamlit and using the Kaggle dataset to build a simple anime recommendation system.</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/ToyChessEngine">Toy Chess Engine</a> - Creating my own tiny toy chess engine for fun... and to learn more about chess programming :)</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/Theft-Detection_System">Theft Detection System</a> - A project made using Arduino, UltraSonic sensor, PIR sensor which detects any movement within a specific range from the sensor and lights up the LED.</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/First-Person-Shooter">First-Person-Shooter</a> - The project is a simple first-person shooter game built using the Ursina game engine and Python programming language.</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/Snake-Game">Snake Game</a> - Here is my implementation of the Snake game in JS. This is part of my journey to learn JS by making games.</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/theyashwanthsai/CR7-Analysis">CR7 Analysis</a> - Exploring the Cristiano Ronaldo dataset from Kaggle and building a website using streamlit</p>
      <p className="p-3 text-lg"><a className= "underline font-semibold" href = "https://github.com/acmpesuecc/TwitterBotCryptocurrencyPrice">CryptoTwitterBOT</a> - A twitter bot which tweets cryptocurrency prices. Made using tweepy and uses coingecko api</p>
      
      
      
      </div>
      
    </div>
  );

  
  
}

export default Projects

import React from "react"
import blog from "./blogList"
import Typewriter from 'typewriter-effect';

function Blog() {
  return(
    <div className = "p-5 flex items-center justify-center flex-col text-center pt-20 pb-6">
      {/* <h1 className = "p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">Blogs</h1> */}
      <div className="p-5 flex items-center justify-center flex-col text-left pt-20 pb-6">
<div className="p-5 text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold">
<Typewriter 
  onInit={(typewriter) => {
    typewriter.typeString('Blogs')
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




      <div className="md:w-2/4 ">
      {blog.map((item, index) => (
        <p key={index} className="p-9 mt-2 text-lg border-4 rounded-2xl">
          <a className="underline font-semibold" href={item.link}>
            {item.title}
          </a>{' '}
          <p className="italic font-thin text-base p-3">{item.tags}</p>
        </p>
        
      ))}
      
      
      </div>
    </div>
  );

  
  
}

export default Blog

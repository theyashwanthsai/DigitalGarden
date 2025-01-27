## Which framework to choose to build AI Agents
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1873690100527399065

*Written on Dec 30, 2024*

Even though I mentioned that any framework works best for learning, there were still some questions on which one to choose. And which is the best to get started. I have used all of the listed frameworks to build agents. 

Which one do I like the most? 

crewAI
 
Why? The learning curve is very low, Its easy to get started and get good at building AI Agents. The community is good, and this framework is backed by many creators. So you will find a lot of "tutorials" on this, which helps in getting a good picture on how to use this framework to build AI agents. 

This (Image) is how I like to structure my crewai projects, Its clean, and helps when refactoring. I would also create a centralized prompts folder with all prompts in yaml file. But just starting out, Its not needed.

The most fundamental components in crewAIInc are:
- Agents: Profiling and personifying your llm into an expert using prompts.
- Tasks: Assigning specific work to these personified AI. I like to use this principle: Least Responsibility
- Tools: Most important, You have a persona, and a task, but without tools, agents wont be able to complete their jobs. Tools are like Arms and Legs for Agents. 

composiohq is very useful (I worked there in summer), I would still argue that it is good to build atleast some "not so complex" tools on your own.

Keep playing around with ideas, and you might build something cool. Check for my pinned tweet, where I built something really cool and really basic.

Keep in mind that this is for learning. 
What do I use for production grade projects? I will write something about this in a future post, Something I use in my daily job as AI Engineer at VuhosiAI
 
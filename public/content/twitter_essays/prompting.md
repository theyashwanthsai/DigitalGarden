# How I write prompts for my AI Agent

> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1885193969728184671

*Written on Feb 11, 2025*

![img](/articleimages/prompting.png)

Building AI Agents has become very easy with all the frameworks available. There are only two things which we as developers can do: 
- Design a pipeline for these agents to act upon and finish a task
- Tell the agent what to do (Prompts)


Lets look into how I write prompts for my agents. My experience building agents for vuhosi since last year. This saves cost, time of execution and more importantly the quality of output is insanely good.


Before writing prompts, It will be good if we let our agents give structured outputs. I really love pydantic.


So a prompt can be divided into few sections:
- Personality: Give the agent a persona. Name and details about it. Basically a role 
- Context: What tools and information it has.
- Task: Whats the goal? it has to be specific and should relate to the personality and context
- Instructions: How it should carry out the task. Step by Step, sort of like a plan.   
- Output format: How the output should look like (number of lines, markdown or not, etc etc)
-  Maybe, an example output. (this one i havent tested, but i think its good to have)

Make sure all of this is given to an agent/llm. This structure can be refined according to your usecase. A lot of iterations should happen and a lot of refinements are needed before you reach an optimal output. And its not something to be chased and perfected. While you test your agents, things might get sorted on its own.  


There are frameworks like dspy which are very good. But I havent tested them out in projects which are in production. Its better to manually iterate and improve prompts (atleast for now). And I have used dspy in few of my side projects and I love it! Insanely good.
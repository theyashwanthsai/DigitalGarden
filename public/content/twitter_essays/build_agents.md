Here's how I would be going about build AI Agents

1. Learn to build one very very simple AI Agent. Could be using crewAIInc, n8n_io, LangChainAI's langgraph or pydantic's new framework. Framework doesn't matter.

Build one very simple AI Agent which fetches data from internet using ExaAILabs, firecrawl_dev to scrape data.  

Build your own tool (very important) instead of using pre-written tools. Why? We are learning + It gives more control. 

Later, It is good to use a toolset library which also provide auth and other services. 
composiohq is a good choice. 

2. Now you have a working agent which:
takes in an input -> does some internal loops -> gives out an output .

Experiment. Try to get the output as an md file, txt file, html. Try giving the output a structure (pydantic). Make it very specific. Output must have references, in-text citations.

Basically try increasing the difficulty by adding various stuff. (Might seem very silly, but these tasks are difficult for AI, giving consistent results)

3. When you add complexity to the use case, this is where you realize the true potential (and headache) of using AI Agents. This is where you might want to think about orchestration. 

Basically Multi Agent System.
Try adding multiple agents in the workflow. Try adding multiple tools, Try playing around with different parameters.

4. Now that you have multiple AI Agents and tools, you might want to practice good principles and patterns. This is important as your codebase increases; this helps in future refactors.

I will write another post which talks about some good design patterns, and the ones which I use after building a lot of agents and deploying in production at my job at Vuhosi.  

This is how I truly learnt building AI Agents.
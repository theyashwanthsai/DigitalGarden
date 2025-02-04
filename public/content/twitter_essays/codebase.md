## How I structure my AI Agent codebase
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1878317724063220172

*Written on Jan 12, 2025*

Building AI Agents is simple, especially with frameworks like crewAI. 

But when your codebase starts to become large with multiple agents and hugeass prompts, It is good to follow some good practices. 

Keep in mind that these rules are framework agnostic.

Simple rules which I follow:
- Keep it simple and stupid.
- Easy for future changes
- Centralized, Structural, Atomic

An AI Agent System codebase contains some components (As discussed in the previous post, adding on to it):

- Agents
A folder named "agents" where I define all the AI Agents. I write each agent in one file, keeping it clean.

- Tools
All of my custom tools go here. Each tool is written in one file. I have already written a small post on tools. Please feel free to check them out.

- Centralized Prompts
I like to store all the prompts in a separate prompt folder.  This makes sure that I can come and change whenever needed. Also allowing my team to look into prompts and suggest changes when needed. 

I store prompts in a yaml file. There is no big reason behind it, its simply works for me so I play along.

- Structured Output
I like storing outputs in a folder dedicated to folder only for output schemas of agents. Each file would be a mirror of agents folder. Instead of code for defining agents and tasks, we would define pydantic model

- A driver code 
To bring all of this together - main.py which is where I define the structure of how multiple agents interact.

This is a neat and clean way of dividing the codebase into different components, each with a given responsibility. Like I said, this is my way of doing. 

Surely it might not be the best for you, but in general, this is a good starting point for you. 

As time may pass, you might figure out some issues, you might come up with a fix. Please do reach out to me and point it out. It would help me in learning.


![tweet](/articleimages/codebase.png)
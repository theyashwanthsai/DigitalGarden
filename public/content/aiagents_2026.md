# Jan 2026: AI Agent Landscape

*Written on Jan 25, 2026*


The current state of ai agent space is super interesting. I expected some sort of offline learning (RL or KD) of small language models to be the next big thing (I do believe this particular idea will still happen, hence I am building something to make it happen).

![](/articleimages/aiagents_jan2026.png.png)

But the current state of ai agents is pretty interesting. I must say, anthropic is actually carrying it hard. Not openai, or not a chineese startup, Its anthropic actually doing useful things in the space. They are thinking from first principles, and are currently shaping the space.

So this article is supposed to help you understand th shape of the current **AI Agent Market**. I will just be dumping all my thoughts from the last few weeks here, in a structured manner. 

Before you read a stranger’s words, I will give a very small introduction of myself, to set a stage. I work as an AI Engineer at a startup. I also founded [turilabs](turilabs.in), and I am currently (almost finished, with just 2 chapters left) writing a book on AI Agents with manning. I wrote an article last year which sort went viral: 300 agents.

Awesome, Lets start with a brief history of how AI Agents started shaping with the advent of llms. There are X stages from 2022 to 2026.

## Prompting Era
ChatGPT entered the world in 2022. Changed everything. Soon, people started building chatbots. Few people with the mentality of selling shovels, started realizing prompting with ai is gonna be a skill they can sell. Prompt Engineering began. Courses, cohorts, what not.

Here, most of the people were building chatapps. ”Wrappers” as they call it. Writing instructions to AI was the hot stuff. There was insane money for anyone who showed that they were a better prompt enginner.

This was 2022-2023.

## Function calling
I think it was openai that launched a very early version of tool calling in 2023. This thing would really change the way these llms were percieved. Imagine an llm which can look into your custom database (rag tool) or search internet (internet tool) or send an email (gmail tool).

Startups were built on this feature alone. I also interned at composio which was a toolkit for ai agents and auth. 

Later, in late 2024, Anthropic launched mcp. That changed everything. We will talk about it further.

## Reasoning
In 2023, researchers realized that you can actually get an llm to think before it gives answer, by simply giving it in the prompt. ”Think step by step”. This simple prompt allowed the same llm to perform much better at tasks than before.

In late 2024, big labs started playing around with the behaviour of llms, and we saw models that could reason out of the box. We called reasoning models. Openai O1 was one of them. I will talk about this further.

## The birth of AI Agents
This was by the end of 2023, when we had reasoning (via prompts) and tool calling in the equation. Frameworks wrapped an llm api around these 2 and thus, AI Agents was born.

I was somehow pulled into this space pretty early, and I am glad. 

Crewai, langchain, langgraph and a few others. Some used raw llm apis + tool calling + prompting

This phase was where we could turn an llm into something that could do multi step reasoning, tool calling and basic communication.

2024 was the prime for these. People could build workflows which would save so much time and cost. 

## MCP 
MCP is important, because it showed us (and Anthropic) something. MCP was launched in nov 2024. 
We had tool calling since 2023, but you still had to code it, and you would have had to use llm apis to get ur llm to have tool calling. What mcp did was, it made this whole process easy. You can connect an external tool to claude desktop or other compatible mcp clients. This tool would have to be wrapped around some rules. 

But this blew up. There were 100s of mcps, and an everyday ai enthusiast could connect his claude with mcps. People built insane workflows. But there were much better things ahead. 

## Claude Code
Since ai assisted coding was blowing up, cursor was leading the race here. They added ai functionalities to vs code. This was their early product, in one year, they evolved a lot. Now, cursor was basically vs code with an ai agent living inside of it.

Anthropic soon caught up with their own answer: Claude Code. Laucnhed may 2025.
Code was an ai agent which you could interact in your terminal, and it would write and read code for you. This was massive. Claude code currently is one of the best coding agent, along with cursor. You can add mcps, and you can write something called rules.md (this is gonna evolve into something, which we will discuss further). You could let these agents run and build stuff for you. Ofcourse these would cost a lot. But it was still interesting to see the market interest.

This was 2025. Between the launch and mass adoption of code to where we are currently, Anthropic noticed something interesting.

## Agent Skills
(end of 2025)
Anthropic realized something. Claude code, which is an ai agent built for coding, was actually more general than they thought. They could use it for research, financial stuff and non technical stuff. 

What this proved: You dont need to build ai agents anymore. Code is all you need. 

Lets understand how claude code works. It is basically an llm api which interacts with an interface, lets call it executor. This provides the llm with a lot of powers. Context management, reading and writing files, MCP integration, etc. 

Now, lets connect all the dots. We have llms like O1 and Sonnet 4.5 which can do extended thinking out of the box. We have 1000s of mcps available.

Anthropic realized that claude code can be used as an agent, and they have sort of built an ecosystem for claude code. They could instruct claude, give mcps and see it in action. 

There was one piece that was missing. Your claude code is generally strong. Much stronger than raw llm api call since the executor logic is well written. But there was no way for claude to have domain expertise. Normally when you are building ai agents, you give it instructions. Heavy instructions in the prompt. This wasnt possible with claude, as there was no way you could add a prompt to code. Rules was a temporary solution, but Anthropic came with a much better solution: **Skills**

I would recommend you to watch this talk, as it covers everything you need to know about skills.

Skills are following a similar pattern as mcp. MCP launched nov 2024, but became super popular by feb 2025. I think we already know that skills popularity is increasing.

Skills complete the stack (as of now). You can give claude domain specific instruction, mcp and watch it perform. 

Imagine, clade code with 1000s of MCPs and 1000s of Skills. Imagine an llm, forget about credits (or use a strong local llm) configure claude code with this llm, give all the mcps in the world, give all the skill. Give this agent its own gmail, browser, github. Infact this give this agent a permanent ”house” (Basically a device like man mini or raspberry pi). See what can happen.

![](/articleimages/clawdbot.png)

### Clawdbot
This is all over my timeline. Its an open source alternative to claude code, and it provides better flexibility.
People are doing it. Clawdbot lives on a mac mini, has everything configured (all sorts of accounts and stuff) and it has the freedom to do anything. With a local llm, its even better (and safer).



## Conclusion
So thats it. This was everything that matters in the ai agents space. There were a lot of other things like manus, claude co work. But I think claude code is the only thing that will matter in the long run.

What should you do if you are interested in this space?
I would say invest in understanding the ecosystem, build something that would be helpful to you or your agent setup, and keep building and learning.
Me personally, I am learning Deep learning, Gpu programming, and AI Agents (I need this for my job). Staying upto date is impotant. 
Ai Agent.md
Displaying Ai Agent.md.
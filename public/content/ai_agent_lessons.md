# I have built around 300 agents, worked at 5 startups. Here's what I learnt about AI Agent

**Written on 25 Aug**


There are decades where nothing happens, and weeks where decades happen. Currently, we are at this point where we literally have newer models, newer optimization techniques, new architecture which are completely going unnoticed by most of us in the ML/AI space.

I’ve gone deep into the world of AI agents. I’ve built around 300 agents, from small prototypes to production-level systems, and worked with 5 different startups experimenting with how agents can power products and usecases. 

Along the way, I’ve learned a lot about what works, what doesn’t, and where this space is headed. Although these are just my thoughts, they still might help you in giving a new perspective.

First let me explain what an agent is real quick. By agent, I mean llm agent, not the formal definition we see in RL.

```bash
Agent = LLM + Reasoning + Tools + Memory
```

Since nowadays, we have LLMs with inbuilt thinking, you can even simplify this further:

```bash
Agent = LLM + Tools + Memory
```

That's it. Terms like Agentic workflow, Agentic System, Team of Agents, etc are all just a tightly knit pipeline of few basic agents.

Over the last year, I have been working on building these pipelines and making them reliable. I have learnt a lot in this process.

### Frameworks are not that important
I have built agents in crewai, dspy, langgraph, autogen and even openai and google agent sdks. I have also built my own framework in the process (Writing a detailed study report on that, will be out soon)
After using all of them, Its quite clear that you dont need to be bound by a framework. All you gotta focus on is the pipeline of your application.
### Building Agents != AI/ML
I call myself an AI Engineer, but I am just a backend guy who uses llm apis and does some prompting. This clearly shows, having good software engineering fundamentals is important and non negotiable.
### Agents are only as good as their _context_
The biggest misconception is that you can just give an LLM a goal and expect magic. In reality, the quality of the agent depends heavily on the context you give it. Prompts, tools, memory, and (rarely) environment. A well-structured context is often more valuable than a bigger language model.
### Without tools, an agent is useless 
A standalone agent that “thinks” without tools gets stuck quickly. The moment you give it the ability to take actions (APIs, databases, workflows), it becomes useful. I worked at Composio during its early stages (May-July 2024), it was my first "real" internship and that changed the trajectory of my life for good.
### Simplicity wins
Some of my most effective agents were surprisingly simple: a clear prompt, one or two well-defined tools, and a single responsiblity. Complexity often leads to brittleness. The best agents are built for _one sharp use case_ and do it well.
### Evaluation is underrated
It’s easy to build a flashy demo, but much harder to measure how good an agent really is. I learned that setting up tests and real-world feedback loops is what separates toy projects from reliable production systems.
### DSPy is the future
I have been playing around with DSPy for the past few months, and the more I use it, the more it feels natural to build agents using it. Signatures, adapters, training set, optimizers.

`.compile()`feels like home. Exactly how it should have been.
### People matter more than tech
Working with 5 startups showed me that the technology is only part of the story. The culture around experimentation, speed of iteration, and clarity of vision matter even more. An average agent usecase in the right hands can create real value; a brilliant agent usecase in the wrong hands goes nowhere.

## Conclusion

AI agents are still early. The hype is real, but so are the challenges. What excites me most is that we’re moving from research toys to infrastructure-level systems. In the future, every product will likely have agents running behind the scenes, coordinating tasks, personalizing experiences, and handling complexity humans don’t want to deal with.

I’ve made mistakes, learned lessons, and seen both successes and failures. If there’s one takeaway, it’s this: **agents are not the product, they’re the enabler**. The magic comes when you embed them into workflows where they disappear into the background and just work.
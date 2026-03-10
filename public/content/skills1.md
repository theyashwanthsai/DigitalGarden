# Agent Skills 101

*Written on Mar 7, 2026*

Agent skills might be the most important invention/innovation of Anthropic. I would place even above MCP.

Back in around Nov 24, Anthropic launched MCP. It became widely popular around Feb of 25. Skills was launched around oct 25, but became insanely popular around jan/feb, thanks to the rise of Clawdbot (now called OpenClaw)

Ai agents are becoming super popular. But more than hype, I am seeing a mass adoption in many verticles. This is thanks to the innovation with LLMs and thei reasoning.

In my last post, I talked about how Claude Code (a ”coding” agent) was being adopted and used as a general agent. Creating PPTs, doing research, sorting knowledgebase. You ask it and it does for you. No framework, no external dependencies, nothing. The days of agentic framework is coming to an end (although they are still being heavily used in a lot of places). 

The new agentic stack is this:
- Claude Code
- Skills
- MCPs

Pure anthropic dominance. (In my next post, I will talk about this new agentic stack, and an alternative that I use which is much more cheaper in terms of token usage)

This post, I will talk about Agent Skills in detail, and the actual use case of skills (+how to monetize)

## The problem with Agent and LLM tasks.
LLMs are becoming powerful. More powerful than I thought they would be. But raw intelligence is often not enough. 

Agents still require:
- Guardrails
- Context
- Process instructions
- Business-specific knowledge
- Tool usage instructions

The solution to this was to inject all the instructions of a task in the system prompt. This would often result in a messy prompt. Anthropic realized that they needed a neater way to do the same thing. Something manageable both by the agent and the dev.

This is how they probably came up with Skills. A **skill** is:

> A modular capability that gives an AI agent the instructions, context, and tools required to perform a specific task.

Modular is an important word. Skills can be reused by **one or many agents**. At the end of the day, Skills are basically just a folder with markdown files. Its the same as system prompt, but it changes the way we look at agents. 

Before: Create a new agent for each task (crewai, langchain, etc), write system prompts, write tools, integrate this agent in the workflow.

Now: Spin up Claude Code, give skills (either you create or from skills.sh), give mcp, tell what you want. Thats it. Claude code will spawn subagents and do the work for you.

Now anyone can ship agents. The bar to entry is the lowest. 

Important note: Skills are not just instructions/context. It can also contain your workflow, so that the agent does it instead of you.

## What an AI Skill Actually Looks Like

A typical skill is structured like a **folder**.

skill/  
│  
├── skill.md  
├── reference_files/  
│   ├── style_guide.txt  
│   ├── icp_description.txt  
│   ├── output_examples.txt  
│  
├── assets/  
│   ├── example_infographic.png  
│  
├── scripts/  
│   ├── api_call.py

Each component plays a role.

## The Core of a Skill: `skill.md`

The skill.md file is the heart of a skill. Think of it as the Standard Operating Procedure (SOP) for the agent. This file tells the agent what the skill is supposed to do, when to use it, and how to execute it. A well written skill.md typically contains:

- goal
- trigger conditions
- execution process
- rules
- tool usage instructions

Example structure:

```
Skill Name: Infographic Generator

Goal:
Generate high-quality infographics aligned with brand guidelines.

Trigger Conditions:
When the user asks for visual explanations, charts, or social media infographics.

Execution Flow:
1. Parse the user request
2. Extract the key idea or insight
3. Propose 2–3 visualization concepts
4. Ask the user for approval
5. Generate infographic
6. Save output example
```

What you're really doing here is combining prompt engineering with workflow design. Instead of stuffing everything inside one huge system prompt, you modularize it into reusable skills. This is the real power.

### 1. Reference Files
Skills become significantly more powerful when you add reference files. These files provide extra context that the agent can use while executing the skill. The more relevant context you provide, the better the agent performs. 

Some of the most common reference files include:

#### a. Business Context
`company_description.txt`

This contains information such as:
- company overview
- product details
- industry
- positioning

This helps the agent understand what the company actually does.

#### b. ICP (Ideal Customer Profile)

`icp.txt`

This defines the target audience.

It may include:

- target customers
- pain points
- decision makers
- buying motivations

This ensures that the outputs are aligned with the actual audience.

#### c. Brand Voice

`voice_personality.txt`

This file defines the tone and personality of the brand.

It can include:

- writing tone
- messaging style
- vocabulary preferences
- brand language

Without this, most AI-generated content sounds generic.


#### d. Output Examples

`example_outputs.txt`

This is one of the most powerful files you can include. LLMs perform significantly better when they see examples of the desired output. Instead of telling the agent what to do, you show it. A few high quality examples can drastically improve output quality.


### 2. MCP Instructions (Tool Usage)

Skills can also include instructions on how the agent should interact with tools. This is where MCPs come into play.

#### Example:

`crm_usage.md`

This file might contain instructions such as:

- how to search for leads
- how to update CRM records
- which fields must always be populated
- what data format to use

This ensures the agent interacts with external tools correctly and consistently. Without this layer, agents often misuse tools.

Skills solve that.

### 3. Assets and Non-Text Files

Skills aren't limited to text.

You can also include non-text assets such as:

- images
- presentations
- videos
- diagrams
- templates

#### Example:

`presentation_layout.pptx`

The agent can use this as a design reference while generating slides.

This allows agents to follow specific visual structures or brand templates.

### 4. Code Scripts

Some skills require executing code or API calls. In these cases, the skill folder can include scripts.

#### Example:

`generate_infographic.py`

These scripts may handle things like:

- API calls
- data processing
- file generation
- external integrations

This effectively turns skills into hybrid systems combining AI + software. The LLM handles reasoning and orchestration. The scripts handle deterministic execution. This is where skills become extremely powerful. Because you're no longer just prompting an LLM.

You're building modular AI capabilities that can be reused across agents, products, and workflows.
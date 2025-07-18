# The 4-Part Playbook for Writing Efficient Prompts

> A small part from my upcoming book on AI Agents. I'm building in public and sharing it as we go. Stay tuned!


*Written on July 18, 2025*


Let's be honest. Most agent prompts start as a messy text file. A stream of consciousness. You tweak it, add a line, delete another, and when it finally works, you're afraid to touch it. When you need a new agent, you start from scratch. It's not scalable, and it's a nightmare to debug.

What if we stopped treating prompting like a dark art and started treating it like engineering? Here's a 4-part framework we've developed for the book that helps you build robust, reusable, and debuggable agents every time.

## 1. Core Identity: Who is this Agent? 
Early on, we'd write prompts like, "You are a research agent." What happened? The agent had no context. It was like a new hire with no job description. Eager, but clueless. It didn't know if it should be skeptical or creative, formal or informal.

The fix was to give every agent a Core Identity before it does anything. This section consists of two key components:
- Persona (Role & Context): This defines the agent's specific job title, specialty, and motivational context. It's the character it plays, which taps into the LLM's latent knowledge about that persona.
- Goal: This is a single, unambiguous statement of the desired outcome for the task at hand, leaving no room for interpretation.

> Takeaway: An agent with a specific identity and goal will outperform a generic one every time.

## 2. Operational Strategy: How Does the Agent Work? 
Our first agents would get lost. They'd fall down rabbit holes, performing endless web searches for a simple fact, or they'd give up too early on a complex problem. The "just figure it out" approach was failing.

The fix was to provide an Operational Strategy. A clear rulebook for how to think and act. It includes:
- Workflow Process: A step-by-step Standard Operating Procedure that scaffolds the agent's thinking and guides it from start to finish.
- Guiding Heuristics: Flexible rules of thumb that allow the agent to adapt and make smart decisions in dynamic situations.
- Constraints & Boundaries: Negative Prompts. Explicit negative instructions that tell the agent what not to do, building guardrails and ensuring precision.

> Takeaway: Guide your agent's thinking with a clear process and flexible rules of thumb to prevent it from getting lost.

## 3. Capabilities & Resources: What Can the Agent Use? 
We gave an agent a web_search tool and a read_internal_document tool. What did it do? It used the web search to look up internal company data. It was the classic "when you have a hammer, everything looks like a nail" problem.

The fix was to define its Capabilities & Resources with a crucial addition. This section should contain:
- Tools: A clear list of the functions or APIs the agent is allowed to call.
- Tool Selection Strategy: A critical instruction that teaches the agent how to choose the most appropriate tool from its list for a given situation.

> Takeaway: An agent's effectiveness depends not on how many tools it has, but on its prompted ability to choose the right one for the job.

## 4. Collaboration & Output: How Does the Agent Communicate? 
This was the final, most painful lesson. An agent would do brilliant work and return a beautiful, well-written paragraph… that was completely useless for automation. You can't pass a prose paragraph to another system. It's a dead end.

The fix was to be ruthlessly strict about Collaboration & Output. This final component ensures the work is usable and includes:
- Collaboration Protocol: The rules of engagement that define how the agent interacts with other agents or humans in a multi-agent system.
- Output Format: A non-negotiable, strictly enforced structure for the final output, such as JSON, to make it predictable and parsable for automation.
- Tone of Voice: A specification for the agent's communication style, adding a final layer of polish.

> Takeaway: An agent's work is only useful if it's parsable. Always enforce a strict, structured output format like JSON.

When you separate your prompt into these four logical parts, something clicks. Debugging becomes simple. Is the agent acting weird? Check the Identity. Is it getting stuck? Refine the Strategy. Is the output unusable? Fix the Output Format.

This is how you move from tinkering to engineering.

.
.
.

Hey, as you know, I am writing a book on AI Agents. I'm sharing these playbooks as I write my book on AI Agents because I believe in building in public. If you found this useful, there's a lot more where that came from.
The best way to get more frameworks like this, ask questions, and follow the journey is to connect with our community.
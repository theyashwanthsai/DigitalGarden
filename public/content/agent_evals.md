# Agent Evals are hard. What building 300+ AI Agents taught me

> *Written on Nov 18, 2025*

I was convinced the model I was using had gotten significantly worse after an update. 
Everything _felt_ off. Responses were messy, inconsistent, sometimes borderline useless.
Why? Because my eval framework told me everything was fine.

Pass rate: 94%

Same as before. Everything stable. Green checks everywhere. Yet, the model was clearly broken. 

After hours of debugging, I realized the root cause. My evals itself was wrong. It was testing the wrong thing.

Most of us mess up when it comes to agent evals. I mean, how would you measure your agents output. There's no metric to do that. I would naively run the system on 10 different outputs and manually check it. Human evaluation. The problem is, this is not scalable. 

I have brainstormed some of the ideas when it comes to agent evals. This blog will hopefully give you a pretty solid basic understanding on the topic.

## How I _Used_ to Evaluate Agents
I thought I was doing great with:
- 10 test cases in a JSON
- Run the system
- Look at the responses
- If vibes are good → move on
- If vibes are bad → tweak the prompt

Honestly, it was more vibe-driven than engineering-driven. At the time, it felt fine.  
In hindsight? It was embarrassing, borderline irresponsible if you're building anything meant for production.

No measurement.  
No consistency.  
No traceability.  

Just vibes and confidence. And that’s exactly why it failed.

## When “Looks Good” Stops Working
The whole illusion broke when the model update hit.

Suddenly:
- Outputs felt worse
- Behavior drifted
- Small tasks became unreliable

But my eval methodology still said: _Perfectly fine. Zero issues._ Production was messed up but locally things are fine. That’s when I realized something important:

**You can’t trust your intuition when your evaluation is built on vibes.**

An agent can look “okay” for 5 examples and still be fundamentally broken for the other 500 unseen scenarios. And because I had no structure around evaluating it, I had no way to detect silent failures.

That was the wake-up call. A huge lesson for me as an AI Engineer.

## The Core Problem: Binary Thinking
The biggest mistake people make (including me): We treat agent outputs as “right” or “wrong.”

But agent outputs are not binary.  
They fall on a spectrum:
- Completely wrong
- Wrong but partially useful
- Right but missing context
- Right with hallucinated explanations
- Mostly correct
- Perfect

A binary pass/fail system collapses all of that into one number. 

## What I Eventually Understood
When evaluating agents, you’re not judging _the output_, you’re judging _the capability_. Those two things are very different.

Here’s an example:

**Bad eval:**  
“Did the model return valid JSON?”

**Good eval:**  
“Did the model return the correct structured information?”

The moment you start measuring _capabilities_, everything changes:
- Small formatting tweaks stop breaking tests
- You detect regressions much earlier
- You can compare models on the same skill
- You stop getting fooled by surface-level improvements

Without capability-based scoring, you’re just measuring syntax.

## So How Should Agent Evals Actually Work?

Here’s the hard truth, A good eval system is as important as the agent itself. A proper eval framework has at least these components:
### 1. **Programmatic Test Case Generation**

Stop writing fixed cases in a JSON file. They get stale. Models memorize patterns. You get false confidence.
You need a generator that rotates:
- entities
- formats
- phrasings
- difficulty
- noise
- adversarial scenarios

This reduces overfitting and catches edge failures.
### 2. **LLM-as-Judge Scoring**
Instead of exact-match:
- Score on a scale (0–10)
- Use criteria: correctness, completeness, reasoning
- Extract a structured rubric
- Let a judge model grade the outputs

Yes, an LLM judging an LLM is imperfect. I had a lot of second thoughts. But it's still magnitudes better than binary checks or vibes.
### 3. **Capability-Based Metrics**
Don’t test “the answer.” Test what the answer _represents_.

Examples:
- Can it summarize correctly?
- Can it extract entities?
- Can it rewrite instructions?
- Can it reason through multi-step tasks?
- Can it maintain constraints?

This is where your eval transforms from “toy” to “tool.”
### 4. **Baseline Comparison**
A score of 78% means nothing when isolated.

But if:
- GPT-4 scores 84%
- Claude scores 80%
- Llama scores 61%
- Your model scores 78%

Suddenly, it tells a story. You need baselines to understand whether:

- Your model improved
- Your eval is too easy
- Your eval is too hard
- Or your task requires a stronger foundation model

Without baselines, your numbers are floating in space.
### 5. **Contamination Detection**
This one is underrated. If your test examples are stolen, memorized, or cribbed from publicly available datasets, your eval is automatically useless.

You need:
- randomization
- template variation
- unseen entities
- probabilistic masking

Models cheat without meaning to. It’s your job to prevent that.


## What I Do Now (And What You Should Too)
If I had to summarize everything, here’s the rule I now follow:

**Treat evals like you treat production code.**

Version them.  
Automate them.  
Regenerate them.  
Run them across baselines.  
Watch regressions.  
Track capabilities.  
Never trust a single number.

If I had built my evals this way earlier, I would’ve saved days of rewrites and confusion. But hey, mistake made == lesson learned.
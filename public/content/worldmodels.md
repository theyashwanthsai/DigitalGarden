# World Models: Machines That actually "Think"

*Written on 15th July 2025*

I feel this is going to be the next big thing in AI Research! So I went to Paras Chopra's Lossfunk residency graduation last month, and He himself presented what he was working on and it was super cool.

![img](/articleimages/wm.png)

That was my first introduction to world models, and I thought it was such a crazy idea. Turns out, research has been going on since years and I was just dumb enough to not know about this. So I began looking into it in my free time.

## What Are World Models?
At their core, world models are systems that allow AI to learn and simulate the structure of the world they're in. Think of it as the AI's "mental map." This internal model helps it answer questions like, "If I take action X, what might happen next?" It's a leap from being purely reactive to becoming reflective and strategic.

In humans, this kind of modeling happens naturally. Before stepping into a busy street, you instinctively imagine the speed and path of oncoming cars. World models aim to give machines that same predictive edge. Not by hardcoding rules, but by learning patterns from experience.

## The Learning Difference
You might be thinking, Okay Sai, but ain't this just another fancy expert system? Not exactly.

Traditional systems depend on human-crafted rules, while world models learn their own rules directly from data. No one sits down and tells the model rules like "when you see a wall, don't walk through it". 

Instead, it figures that out from interacting with environments.

State-of-the-art methods like DreamerV3 and PlaNet showcase how these models work. They use a combination of:
- VAEs (Variational Autoencoders) to compress observations into a lower-dimensional latent space.
- RNNs or Transformers to predict how those latent representations evolve over time.

This means the model doesn't try to simulate every pixel of the world, it simulates the cause-and-effect relationships behind the scenes.

## Latent Space
One fascinating aspect of world models is how they diverge from the token-by-token logic of language models. While LLMs like GPT process one word at a time in a linear stream of reasoning, world models operate in a latent space: a compact, abstract representation of reality.

This space is much closer to how humans intuitively grasp the world. It's not about chaining words together to form a thought like we saw in CoT, but rather about processing sensory input like vision, touch, or sound and understanding how these elements interact.

That's why world models are particularly promising for robotics, autonomous agents, and other systems that need to act in the physical world. They simulate the dynamics of that world, not just describe it in text.

## The Art of Mental Simulation
Take MuZero from DeepMind as an example. It plays games like Go, Chess, and Atari not by memorizing moves or being told the game rules, but by learning to simulate outcomes internally.

It builds a kind of internal "physics sandbox" to imagine the future, planning multiple steps ahead, much like a human chess player would. 

This ability to mentally simulate and evaluate future states is what makes world models so powerful and super cool.

## Why World Models? Why do I think they are Interesting?
World models are not about game-playing bots. They represent a shift toward reasoning agents, systems that understand the "world". They don't just try things randomly, they mentally simulate possible futures and choose wisely.

In short, world models bring us closer to general intelligence, where machines are not limited by predefined scripts or heuristics, but instead think with a kind of internal imagination like a real human.

It is an interesting concept, and I am gonna research about it and build models in my free time. Lets see how far I go!
# LLM Internals part 1
> This article is part of [this](./llm0) series. My goal is to Learn AI using [Fenyman's Technique](https://aliabdaal.com/the-feynman-technique/)

## What is an LLM?
LLM is basically an model which is trained on predicting the next word in a sequence. 
This is a deep neural network model which follows the famous transformers architecture.
These models dont typically "understand" our language but can give coherently relevant results (next word). This makes them 
very useful for tasks involving generation or manipulation of texts.

## Why build an LLM?
Why build an LLM to understand its fundamental? Its been around 3-4 years since GPT has come out, and now there are a lot of other LLMs which are considered 
SOTA (State of the Art). But the underlying architecture is almost same as the original GPT. 
Most of the newer LLMs are just minor tweaks here and there to the original architecture.
Hence learning this is crucial to understand the fundamentals.

## Transformers Architecture


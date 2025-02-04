## DeepSeek R1 training explained from their paper

So DeepSeek R1 was released last week, and there is a lot of buzz around, righfully so because it is an opensourced (MIT licenced) llm which is said to perform as good as o1. 

It is very cheap compared to o1 (usage and training both) and the whole training pipeline methodology is free for the public to read. 

I have been reading their paper and learning. And I decided to write a high level overview on how this model was trained, my understanding taken from their paper.

Generally, an LLM is trained this way: 
- Pre Training Phase
- Post Training Phase
 
pre train with huge data -> fine tune this pre trained model

Fine tuning - Supervised Fine Tuning (SFT) is a tedious task, with a lot of human work to annotate data and feed for fine tuning. The primary goal of DeepSeek was to push the post training methodology solely using RL.

The authors of the paper released two models: R1 and R1-Zero. DeepSeek tried to eliminate SFT from post training methodology. 
This is how R1-Zero came to be. Both R1 and R1-Zero were using the DeepSeek-V3-Base checkpoint as pre trained model.

Note: Reinforcement Learning technique mentioned - GRPO needs a separate post for me to explain (The math is heavy, I am still digesting😅)

R1-Zero pipeline:
- V3-Base + RL (GRPO)

No SFT. They were exploring potential of LLMs to develop reasoning capabilities without any supervised data, focusing on their self-evolution through a pure reinforcement learning process.

There was an "aha moment" noticed here by the researchers: 
"The model learns to rethink using an anthropomorphic tone. This is also an aha moment for us, allowing us to witness the power and beauty of reinforcement learning"

Drawbacks: R1-Zero struggled with challenges like poor readability, and language mixing

Inspired by the promising results of R1-Zero, Authors went on ahead to create a new training pipeline, with small but high quality data for SFT phase.

R1 4 stage pipeline:
- First SFT Phase: V3-Base + SFT (using cold start data) 
First Checkpoint - Establishing basic competencies and reasoning patterns.

- First RL Phase: Checkpoint 1 + RL (GRPO + Language Consistency)
Second Checkpoint - Enhanced language understanding and consistency.
This checkpoint is used to collect SFT data for the subsequent round.

- Second SFT Phase: Start fresh
V3-Base +  SFT  (Generated data in step 2 and other data, 800k samples). Done for 2 epochs
Third Checkpoint - Improved foundational capabilities

- Final RL Phase: **Checkpoint 3** + RL (a combination of reward signals and diverse prompt distributions) 
Final Checkpoint: DeepSeek R1

This is how the training pipeline of the best open source model (currently) looks like. 

Obviously this is a high level overview so I haven't explained in detail. Even covering even the first 10 pages without losing my mind is difficult with the amount of new stuff I am discovering (I love it)

![tweet](/articleimages/deepseek.png)


Soon I will be going deep into topics like GRPO and PPO, SFT, Cold Start Problem and many more. 
I use Feyman's technique to learn anything. So I will mostly be sharing a lot of my thoughts and learnings regularly.

# The DSPy Playbook: A Humble Introduction

*Written on 23rd July 2025*

Note: This is a small part from my upcoming book on AI Agents. These insights are well expanded in the chapter 3 of the book. I'm sharing a lot in public as we finish the book. Stay tuned because we have a lot of cool stuff to share!

## The Problem

Any engineer who has deployed language model systems knows the core challenge: manually crafted prompts are fundamentally brittle. A new model version can subtly change how it interprets instructions, causing a reliable agent to fail. An agent that once produced perfect JSON might suddenly add conversational filler, breaking downstream systems.

![](/articleimages/dspy.jpg)

This leads to a reactive, unscalable cycle of noticing a failure, manually tweaking the prompt, testing, and redeploying. This approach only treats the symptom. A more principled solution is to treat prompts not as static text, but as dynamic, programmable components that separate the intent of a task from the specific wording used to achieve it.

## Enter DSPy
DSPy (Declarative Self-improving Python) is a framework built to solve this exact problem. It provides a structured, Pythonic way to program LMs, not just prompt them.

Instead of writing complex, hard-coded prompts, you define your system's logic using reusable components like Signatures (which define your inputs and outputs) and Modules (which define reasoning steps). This separates your high-level intent from the low-level instructions sent to the LM.

DSPy feels super familiar if you have trained deep learning models with pytorch. 

## What Can DSPy Do?

The most direct benefit of this structured approach is programmatic prompt optimization. DSPy's optimizers can automatically test different instructions to find the most effective prompt for your specific model and task.

This is the core technique we focus on in this playbook, as it provides immediate and significant performance gains.

However, treating DSPy as just a prompt optimizer is limiting. Its true power lies in its broader optimization capabilities, which also include:
- Weight Optimization: Fine-tuning the language model's actual weights using reinforcement learning algorithms.
- Inference Scaling: Using advanced modules to make the system more efficient at runtime.
- Flexible Reasoning: Swapping out different reasoning strategies (e.g., from ChainOfThought to ReAct) without rewriting your core logic.

Lets look understand DSPy by building something. Before that, We need some theoretical understanding. After that, It will start making sense when we start coding.

## The Three Pillars of the DSPy Workflow

DSPy organizes the development process into three distinct stages. This is the fundamental paradigm you'll follow.

1. Programming: This initial stage is about defining what you want the LLM to do. Instead of writing low-level, specific prompts, you declare the desired data transformations using high-level abstractions like Signatures and Modules. It's about defining the flow, not the phrasing.

2. Evaluation: Once your system is built, this stage focuses on systematically measuring its performance. You define a Metric  to quantify how well your program's outputs align with your objectives. This creates a clear, objective benchmark for success.

3. Optimization: This is where DSPy's main power lies. With a programmed system and a metric to evaluate this program, Optimizers can automatically tune the underlying prompts. They discover the best way to ask the LLM to perform your task, turning prompt engineering into a reproducible, optimizer-guided process.

## Your DSPy Toolkit: Core Concepts
Let's learn about some concepts head on. Although applying them will give you the edge, but just learning about them before we get our hands dirty will be helpful.

- Signatures: A Signature is a declarative way to specify a task. It defines the InputFields and OutputFields you expect the model to handle. It's your way of telling DSPy your intent without writing the prompt yourself.
- Modules: These are the reasoning engines that handle the interaction with LLMs. We'll use powerful, pre-built modules like dspy.ReAct, which allows a model to reason, act, and observe.
- Metric: This is a custom function you write to score your program's performance. A good metric is crucial for optimization, as it guides the optimizer toward the desired outcome, much like a loss function in deep learning.
- Example Set: This is a small, high-quality dataset of input/output examples. It's not for training the model's weights but is used by the Optimizer to tune the prompts and serves as few-shot demonstrations for the LLM.
- Optimizer: This is an algorithm, like MIPROv2, that automatically tunes the prompts in your program. It works by generating instructions and selecting examples from your Example Set to maximize the score on your Metric.

## Talk is cheap, show me the Code

Now, let's apply these concepts in a practical, step-by-step guide to build and optimize our AI Diet Coach🍎.

### Step 1: Environment Setup

First, we prepare our environment. This involves importing the necessary libraries and configuring the language models that will power our agent and our evaluator.

We begin by importing dspy itself, along with a specific optimizer MIPROv2, and some standard utilities for handling file paths and environment variables.

```python
import dspy
from dspy.teleprompt import MIPROv2
import os
import json
from dotenv import load_dotenv
```

To keep API keys secure and out of our code, we use dotenv to load them from a local .env file in our project's root directory.

```python
# Load environment variables for API keys
load_dotenv()
```

Next, we configure the primary LLM for our agent. We choose a model like gpt-4o-mini. We then set this as the default model for all DSPy operations. For evaluation, we need an objective and nuanced "judge." For this role, we configure a more powerful and sophisticated model like gpt-4o. This model's only job will be to score the agent's performance, ensuring high-quality evaluation.

```python
# Configure the Agent LM
main_lm = dspy.LM(
    model="openai/gpt-4o-mini", 
    api_key=os.getenv('OPENAI_API_KEY')
)
# Set it as the default for all DSPy operations
dspy.settings.configure(lm=main_lm)
```

```python
# Configure the Judge LM
judge_lm = dspy.LM(
    model="openai/gpt-4o", 
    api_key=os.getenv('OPENAI_API_KEY')
)
```

### Step 2: Define Program Components (Programming)

Here, we define the agent's core: a Tool for external data access, a Signature to define its task, and a Module to bring it all together.

We start by creating a tool. The @dspy.Tool decorator registers a standard Python function as a resource the agent can decide to use. This foodDBtool allows the agent to look up nutritional information from a local JSON file. You can download the file from [here](https://gist.github.com/theyashwanthsai/e3c4fa358a7e2f7bd8bce98b33810330).

```python
# The Tool: A simple function to get data from a local JSON file
@dspy.Tool
def foodDBtool(food_item: str) -> str:
    """A tool to look up nutritional information for a given food item."""
    with open('foodDB.json', 'r') as f:
        nutrition_db = json.load(f)
    query = food_item.lower().strip()
    if query in nutrition_db:
        info = nutrition_db[query]
        return (
            f"Nutrition for {info['serving_size']} of {query.capitalize()}: "
            f"{info['calories']} calories, {info['protein_g']}g protein, "
            f"{info['carbs_g']}g carbs, {info['fat_g']}g fat, {info['fiber_g']}g fiber."
        )
    return f"Sorry, nutrition information for '{food_item}' was not found."
```

Next, we define the task's structure with a dspy.Signature. This class acts as a contract, telling DSPy that our agent will receive a meal string as input and is expected to produce an analysis string as output. The docstrings and field descriptions are crucial, as DSPy uses them to generate the initial prompt.

```python
# The Signature: Defines the input ('meal') and output ('analysis')
class DietAnalysis(dspy.Signature):
    """Analyze a meal and provide nutritional breakdown"""
    meal: str = dspy.InputField(desc="Description of the meal eaten")
    analysis: str = dspy.OutputField(
        desc="Nutritional breakdown with calories, protein, carbs, fat and health assessment"
    )
```
Finally, we assemble our agent using dspy.ReAct. This is a powerful module that takes our DietAnalysis signature and the list of available tools. It equips the LLM with a "Reasoning and Acting" loop, enabling it to break down the task, use the foodDBtool as needed, and generate the final analysis.

```python
# The Agent: A ReAct module that uses the signature and tool
diet_agent = dspy.ReAct(DietAnalysis, tools=[foodDBtool])
```

### Step 3: Create the Evaluation Framework (Evaluation)

Now we build the system to measure our agent's performance. This requires a signature for our judge, the metric function itself, and a set of example data.
First, we define a signature for our judge. This NutritionJudge signature tells the evaluation LLM its task: to assess the agent's analysis of a meal and return a quality_score between 0 and 1.

```python
# The Judge's Signature: Defines how our powerful LM will score the output
class NutritionJudge(dspy.Signature):
    """Judge the quality of nutritional analysis"""
    meal: str = dspy.InputField()
    analysis: str = dspy.InputField()
    quality_score: float = dspy.OutputField(
        desc="Score 0-1 based on accuracy, completeness, and helpfulness"
    )
```
We then instantiate a dspy.ChainOfThought module for our judge. This module is well-suited for evaluation tasks that require careful reasoning. Crucially, we assign our powerful judge_lm (gpt-4o) to this judge module.

```python
# The Metric Function: Uses the judge to return a score
judge = dspy.ChainOfThought(NutritionJudge)
judge.set_lm(judge_lm) # Assign the powerful model to the judge
```

With the judge configured, we define the nutrition_metric. This function orchestrates the evaluation by taking the agent's output (pred) and the correct example (gold), passing them to the judge, and returning the resulting numerical score. This metric is the cornerstone of our optimization process.

```python
def nutrition_metric(gold, pred, trace=None):
    result = judge(meal=gold.meal, analysis=pred.analysis)
    return float(result.quality_score)
```

Lastly, we create our trainset. This is a small list of high-quality dspy.Example objects. Each example provides an input (meal) and a target output (analysis). The .with_inputs("meal") method specifies which field serves as the input for the agent. This data guides the optimizer.

> Remember: Garbage in, Garbage Out. 

```python
# The Example Set: High-quality examples for optimization. Add more!
trainset = [
    dspy.Example(
        meal="Grilled chicken breast with steamed broccoli and brown rice",
        analysis="Meal Breakdown:\n- Chicken breast (100g): 165 calories..."
    ).with_inputs("meal"),
    dspy.Example(
        meal="Two scrambled eggs with two slices of toast",
        analysis="Meal Breakdown:\n- Egg (2 large): 140 calories..."
    ).with_inputs("meal"),
]
```

### Step 4: Compile and Optimize (Optimization)

This is the final and most powerful step. We initialize the MIPROv2 optimizer and immediately use it to compile our agent. 
We pass our nutrition_metric to the optimizer to define the criteria for success. The .compile() method then triggers the entire optimization process: it runs multiple trials on our diet_agent using the trainset, automatically generating and testing different prompts to find the one that scores highest on our metric. The final output is a new, highly tuned optimized_agent.

```python
# Initialize the optimizer
optimizer = MIPROv2(metric=nutrition_metric, auto='light')
# Compile the agent to get an optimized version
optimized_agent = optimizer.compile(diet_agent, trainset=trainset)
# The 'optimized_agent' is now ready to be used and will outperform the original.
```

The unoptimized agent started with a baseline score of **86.0%**. After 20 trials, MIPRO discovered a revised prompt and few-shot configuration that pushes the score to **98.0%**, all without manual intervention.

It's a mistake to see DSPy as just a "prompt optimizer." That's like calling Python a "for-loop optimizer." Optimizing is just one powerful feature within a much larger, more complete programming system.
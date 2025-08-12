# The CrewAI Playbok

> A small part (modified) from my upcoming book on AI Agents. I’m building in public and sharing it as we go. Stay tuned!

*Written on August 8, 2025*

This playbook demonstrates how to build a multi-agent AI system using CrewAI. We’ll first cover the core concepts, then walk through the steps to build and run an AI crew that automates financial analysis.

![s](/articleimages/crew.png)

## What is CrewAI
CrewAI is a beautiful abstraction which helps you design, build and manage autonomous AI agents. The framework is built on a few key components. I will briefly discuss them here, but you will get a full picture once you go through the code and play with it.

### Components:
- Agents: These are the individual AI workers. You define their role, goal, and backstory, and equip them with specific tools and an underlying language model.
- Tools: These are the skills you give to your agents. A tool is a simple Python function that allows an agent to interact with the outside world (e.g., search the web or access an financial data). Basically you can consider these as limbs for your AI workers.
- Tasks: These are the specific assignments you give to agents. Each task has a description of the work to be done and a defined expected output.
- Crew: Basically a collaborative team of agents working together. The crew defines and manages the workflow of agents and tasks. (More on it later)

## What we will build
Our objective is to build a “toy” financial analyst crew. This AI team will take a company’s name/stock ticker, perform research and analysis, and generate a concise investment report with a final recommendation.

### Step 1: Environment Setup
First, we need to set up our project by securing API keys and installing the necessary Python libraries.

**API Credentials**: Create a file named `.env` in your project's main directory to store your secret keys.

```bash
# .env file
OPENAI_API_KEY=YOUR_OPENAI_KEY
EXA_API_KEY=YOUR_EXA_KEY
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY
```

**Library Installation**: Open your terminal and run the following command to install all the required packages.

```bash
pip install crewai langchain-openai exa-py alpha-vantage requests python-decouple
```

**Python Imports**: Now, in your Python script, import all the necessary components.

```python

import os
from crewai import Agent, Crew, Process, Task, LLM
from dotenv import load_dotenv
from crewai.tools import tool
from exa_py import Exa
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
```

**LLM Configuration**: Before our agents can think, we need to configure their core reasoning engine: Large Language Model (LLM).

In CrewAI, we can set up a central LLM configuration that all agents in the crew will share. This ensures consistency in their behavior, tone, and performance.

```python

# Load environment variables from .env file
load_dotenv()

llm = LLM(
    model="openai/o3-mini",
    temperature=0.4,
    top_p=0.9,
    frequency_penalty=0.5,
    presence_penalty=0.5,
    stop=["END"],
)
```

### Step 2: Defining Agent Capabilities (Tools)
Before creating our agents, we must first define their skills or Tools. These are the specific functions our agents can call to perform actions, like gathering data.

**Tool 1: Financial Data Retrieval**

This tool is designed for our Financial Analyst agent. Its job is to connect to a financial data API and retrieve quantitative data like revenue and income.

```python

# Tool for fetching fundamental financial data
@tool("Get company fundamental data")
def get_fundamental_data(ticker: str) -> str:
    """Tool to get fundamental data for a given company stock ticker, including income statement and company overview."""
    key = os.getenv("ALPHA_VANTAGE_API_KEY")
    fd = FundamentalData(key, output_format='json')
    try:
        income_statement = fd.get_income_statement_annual(ticker)[0]
        overview = fd.get_company_overview(ticker)
        annual_report = income_statement['annualReports'][0]
        net_income = annual_report.get('netIncome', 'N/A')
        total_revenue = annual_report.get('totalRevenue', 'N/A')
        return f"Company Overview: {overview['Description']}\n\nRecent Annual Report:\nNet Income: {net_income}\nTotal Revenue: {total_revenue}"
    except Exception as e:
        return f"Error fetching fundamental data: {e}"
```

**Tool 2: News Search**

Our second tool equips the News Analyst agent with the ability to scan the web for qualitative information, like recent news and market sentiment.

```python

@tool("Search for company news")
def search_company_news(company_name: str) -> str:
    """Tool to search for the latest news articles about a specific company."""
    exa = Exa(os.getenv("EXA_API_KEY"))
    query = f"latest news and market sentiment for {company_name}"
    
    response = exa.search_and_contents(
        query,
        type="neural",
        num_results=5,
        highlights=True
    )
    
    # Format the results for the agent
    highlights = [f"- {res.highlights[0]}" for res in response.results if res.highlights]
    return f"Recent news highlights for {company_name}:\n" + "\n".join(highlights)
```

A tool is just a python function which is given to an AI Agent. The AI Agent can run this function whenever it wants and use the output to better understand perform its actions. Note these:

- Decorator (@tool): This line officially registers the function as a capability that our agents can recognize and use.
- Docstring ("""..."""): This is the most critical part for the agent. The AI reads this description to understand what the tool does (gets fundamental data) and when to use it (when it needs financial info for a ticker). A clear docstring is essential for the agent to make smart decisions.

### Step 3: Assembling the Project Team (Agents)
Now we define our three specialist Agents. We’ll provide the code for all three at once, then explain their individual roles.

```python

financial_analyst = Agent(
    role="Financial Analyst",
    goal="Analyze a company's financial statements and stock performance to assess its financial health.",
    tools=[get_fundamental_data],
    backstory="You are a seasoned Financial Analyst with a strong focus on quantitative analysis and data-driven insights.",
    verbose=True
)

news_analyst = Agent(
    role="News Analyst",
    goal="Find and summarize the latest news and market sentiment for a given company.",
    tools=[search_company_news],
    backstory="You are a market intelligence expert who tracks news and media to understand public perception and market trends.",
    llm=llm,
    verbose=True
)

investment_advisor = Agent(
    role="Investment Advisor",
    goal="Create a comprehensive investment report by synthesizing financial data and news analysis, providing a final recommendation.",
    backstory="You are a Senior Investment Advisor, respected for providing clear, balanced, and actionable investment advice.",
    llm=llm,
    verbose=True
)
```

Let’s break down each parameter to understand how it contributes to building the agent:

- role: This sets the agent's job title. By assigning the role of "Financial Analyst," we instruct the LLM to adopt the persona, vocabulary, and logical approach of a professional in that field. It's the primary instruction for the agent's identity.
- goal: This defines the agent's specific mission. It's a clear, actionable instruction that tells the agent what a successful outcome looks like.
- tools: This is the agent's toolbox. The list [tool_name] explicitly gives the agent permission to use these tools.
- backstory: This adds personality, experience, and depth. The backstory provides rich context that influences the agent's tone, style, and method of approach. Describing it as a "seasoned" professional encourages the model to produce more formal and data-driven responses.

#### Agent Roles Explained
- Financial Analyst: This agent is the number-cruncher. Its sole purpose is to use the get_fundamental_data tool to fetch and present key financial metrics.
- News Analyst: This agent is the market watcher. It uses the search_company_news tool to gauge public sentiment and find recent, relevant news.
- Investment Advisor: This is the senior agent. It doesn’t need a tool because its job is to synthesize the information provided by the other two agents into a final, coherent report with a clear recommendation.

### Step 4: Developing the Action Plan (Tasks)
If an Agent is the "who" in our project, a Task is the "what." A Task is a specific, actionable assignment given to an agent, representing a single step in the overall workflow. It defines the work to be done, the expected outcome, and which agent is responsible.

```python

# Code for all three tasks
financial_analysis_task = Task(
    description="Analyze the financial health of the company with the ticker {company_ticker}.",
    expected_output="A summary of the company's financial health, including key metrics like net income and total revenue.",
    agent=financial_analyst
)

news_analysis_task = Task(
    description="Summarize the latest news and market sentiment for the company: {company_ticker}.",
    expected_output="A paragraph summarizing the top 5 recent news headlines and the overall market sentiment.",
    agent=news_analyst
)

investment_report_task = Task(
    description="""Create a final investment report for {company_ticker}.
    Combine the financial analysis and news summary into a single, easy-to-read report.
    Conclude with a clear investment recommendation: BUY, HOLD, or SELL.""",
    expected_output="""A full investment report in Markdown format, with sections for:
    1. Company Overview
    2. Financial Analysis
    3. News & Sentiment Analysis
    4. Final Verdict (BUY/HOLD/SELL)""",
    agent=investment_advisor,
    context=[financial_analysis_task, news_analysis_task] # Defines task dependencies
)
```

Let’s break down the general parameters used to configure a Task:

- description: This is the core instruction for the agent. It's a clear and detailed explanation of what the agent needs to accomplish. Notice the {company_ticker} placeholder; this allows us to pass dynamic information into the task when we start the crew.
- expected_output: This is the "definition of done." It provides a precise template for what the final deliverable should look like. This is incredibly powerful because it forces the agent to structure its response, ensuring the output is clean, predictable, and easy for other agents (or humans) to use. For example, the investment_report_task demands a specific Markdown format.
- agent: This parameter explicitly assigns the task to a specific agent. The financial_analysis_task is given to the financial_analyst, ensuring the right specialist performs the right job.
- context: This is the key to collaboration and creating a workflow. The context parameter defines a task's dependencies and provides with their values. For the investment_report_task, context=[financial_analysis_task, news_analysis_task] automatically pass the results (the expected_output) from the completed context tasks to the investment_report_task. This gives the investment_advisor agent all the information it needs.

#### Tasks Explained
- The financial_analysis_task is assigned to the Financial Analyst to generate the quantitative summary.
- The news_analysis_task is assigned to the News Analyst for the qualitative summary.
- The investment_report_task is assigned to the Investment Advisor. Crucially, it includes context=[financial_analysis_task, news_analysis_task]. This tells the crew that this task depends on the outputs of the first two tasks, ensuring a logical flow of information.

### Step 5: Launching the Crew
Finally, we instantiate the Crew with our agents and tasks, and then kickoff() the process. This single command starts the entire automated workflow.

```python

# Instantiate the crew with a sequential process
financial_crew = Crew(
    agents=[financial_analyst, news_analyst, investment_advisor],
    tasks=[financial_analysis_task, news_analysis_task, investment_report_task],
    process=Process.sequential
)

# Kick off the workflow with initial inputs
print("## Kicking off Financial Analysis Crew...")
inputs = {"company_ticker": "TSLA"} # Example: Tesla
result = financial_crew.kickoff(inputs=inputs)
print("\n\n########################")
print("## Crew Execution Finished!")
print("########################\n")
print("Final Investment Report:")
print(result)
```

The Crew object is initialized with all the components needed for the project:

- agents=[...]: This parameter takes a list of all the Agent objects we created. This officially registers our specialists as members of the team.
- tasks=[...]: This takes a list of all the Task objects we defined. This serves as the crew's official to-do list or action plan.
- process=Process.sequential: This is a crucial instruction that defines the workflow's structure. By setting the process to sequential, we are telling the Crew to execute the tasks one after another, in the order they appear in the tasks list. This is perfect for a linear workflow where the output of one step is the input for the next.
- kickoff(): This is the "start button" for the entire operation. You can grab the results, and write it in a file or pass it to another process/system.
The Crew object is initialized with all the components needed for the project:

This is a bare bones agentic workflow which we built. I highly suggest you to change a lot, and make it much more advanced and better.

Thank you for reading!
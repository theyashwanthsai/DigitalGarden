## How to Write tools for AI agent
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1876497451898831352

*Written on Jan 7, 2025*


Tools are like the most important concept when dealing with AI Agents. If AI Agents are like humans, then tools are like arms and legs for them. Tools allow agents to perform actions, and allow them to interact with the real world. This makes tools very powerful. 

This mini essay will be like a guide on how to build custom tools for AI Agents. 

Why to build custom tools? Why not use pre-made tools from langchain, crewai or even composio (check it out, awesome library)

The answer is simple, It gives more control. If you have the knowledge of what is going on with the tools, you can modify according to your use case. Hence, starting with building your own tools is like the first step. You might also notice that there might not be a tool available for your application/use-case. In any way, learning will always be useful according to me.

How to build tools:
I usually like to keep all my tool related files in a folder named tools. Each file is ideally one tool. Tools are basically python functions, which expose an API as a module. 

AI Agents don't necessarily execute these so called modules, but instead they "tell" us which tool to use and what parameters to pass to this tool. This is an essence of what people call "Tool/Function Calling".

In langchain, You can use the "@ tool" decorator to define your tools.
An example might be something like this:
```python
from langchain.pydantic_v1 import BaseModel, Field  
from langchain.tools import BaseTool, StructuredTool, tool

# decorator tool and below it the python function 
@ tool
def template_tool(parameter1, parameter2):
"""Docstring here. Define what the tool does so llm can understand"""
# Logic here
return res
```

In crewai, a similar way is followed
```python
from crewai.tools import tool 

@ tool("Tool Name")
def template_tool(parameter1, parameter2):
"""Docstring here. Define what the tool does so llm can understand"""
# Logic here
return res
```

The tool decorator is powerful, and saves us time by setting up the function for tool calling. 
In my own AI Agent framework which we built at Vuhosi, there is no decorator, instead, the function name is taken as tool name. Same thing happens in the above frameworks as well. The function name is the tool name (Unless u mention in the decorator), function's docstring is the tool's description (a docstring MUST be provided, it helps the llm understand better so good to have)

This is how I build tools. At Vuhosi, I build all the tools myself to make sure there is no issues when deployed in production.

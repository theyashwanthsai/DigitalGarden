### Building an MCP Server from Scratch: A Step-by-Step Guide

If you’re curious about how an MCP (Modular Command Protocol) server works under the hood, this guide will walk you through building a simple MCP server using the Python MCP SDK. We’ll focus on understanding the core mechanics, not just copy-pasting a template.

---
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1923266242892169670

*Written on May 16, 2025*

#### What is MCP?

MCP (Modular Command Protocol) is a protocol for building modular, tool-driven AI systems. It allows you to define “tools” (functions) that can be called by clients, agents, or other systems, making it easy to build extensible, interactive AI backends.

---

#### 1. Setting Up a Simple MCP Server

Let’s start by creating a minimal MCP server using the `fastmcp` module from the MCP SDK.

from mcp.server.fastmcp import FastMCP

# Create an MCP server instance
mcp = FastMCP("Our First MCP Server")

# Define a tool
@mcp.tool()
def black_box(a: int) -> int:
    """Takes an input, does something, and returns an output."""
    # In a real scenario, you might call an external API or perform some logic here.
    return a

if __name__ == "__main__":
    mcp.run()

This code sets up a basic MCP server with a single tool called `black_box`. The tool simply returns the input it receives, but you can expand it to do anything you want.

---

#### 2. Development Mode: Using MCP Inspector

During development, the **MCP Inspector** is your best friend. It provides a web interface to test your server’s tools and resources.

- Start your server in development mode:
  ```
  mcp dev server.py
  ```
- Open your browser and go to [http://localhost:8050](http://localhost:8050) to access the Inspector.

---

#### 3. Integrating with Cursor

To connect your MCP server with [Cursor](https://www.cursor.so/):

- Open **Cursor Settings** > **Features** > **MCP**.
- Click **+ Add New MCP Server**.
    - **Name:** e.g., "My MCP Server"
    - **Type:** `stdio` (for local) or `sse` (for HTTP)
    - **Command/URL:**
        - For `stdio`: `python /path/to/server.py`
        - For `sse`: `http://127.0.0.1:8050/sse`
- Save and refresh the tool list.
- Test your server in Composer or Agent chat.

**Note:**  
Update your server’s run command for different transports:

if __name__ == "__main__":
    mcp.run(transport="sse")  # or mcp.run(transport="stdio")

---

#### 4. Exposing Your Server Over HTTP

By default, MCP servers use `stdio` transport, which is great for local development and tools like Claude Desktop. But if you want your server accessible over HTTP (for remote clients or web integration), use the SSE (Server-Sent Events) transport.

Update your server initialization:

mcp = FastMCP("MyServer", host="127.0.0.1", port=8050)

if __name__ == "__main__":
    # Run with SSE transport on port 8050
    mcp.run(transport="sse")

Start your server:
```
python server.py
```

Your MCP server will now be accessible at [http://127.0.0.1:8050](http://127.0.0.1:8050).

---

#### What Happens Inside the Server?

- The server initializes with the tools and resources you’ve defined.
- It listens for connections on the specified transport (`stdio` or `sse`).
- When a client calls a tool, the server executes the corresponding Python function and returns the result.

---

In the next blog, we’ll build a local client to interact with this MCP server. Stay tuned!

---

*If you found this guide helpful, follow me for more hands-on tutorials on building AI systems and tools!*
```
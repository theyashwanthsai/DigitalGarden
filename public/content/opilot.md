# Building a Copilot using Open Source LLMs for neovim.

*Written on Apr 10, 2024*


# Introduction
So I have been looking into AI and how it has been changing the way we do things. 
From basic tasks like email writing to even coding. 
Recently I was looking at Devin. It amazes me how far we have reached to this point where we can let AI write complex codebases for us. 

It has been bugging me, I wanted to do something similar. I wanted to build a coding assistant which lives inside my code editor and helps me whenever I need help.
__Here's a Demo__:
![gifdemo](/articleimages/sumcpp.gif)

### Why build this?
Why? Just for fun. 

I just wanted to learn (read: get into) GenAI and felt this would be a cool project to build. Not gonna lie it actually was fun building it. 
Took a lot of time and effort but it works fine. It made me happy and I love it. I love building stuff. It gives me joy, that's my style of learning.

### How are we doing it?
![Architecture](/articleimages/arch.png)
This is how we are building our system. We will be using hugging face open source LLMs. After testing/experimenting, I have realised that codellama works best. Their serverless api (max 13B) works well for small snippets. That is enough for now I feel. 

We send the code present in the current buffer (read: file) as an input to our LLM. This LLM will be giving us code completions which we can add to the current buffer and that is how code completions work. 

Want to extend it? You can get unit tests and code explanations as well. I will leave that part to you so you can work and learn instead of copying me.

### Why run a middleware server?
1. I don't have experience with lua. 
2. Middleware server can be used to track number of users, Can be used for a lot of stuff if I ever plan on shipping it as a SaaS.

# Basic overview
Let's divide the project into two parts. One would be our client side (sort of) and our server. 

* __Client side__: 
Get the code from the current buffer and send it to our server.
Paste whatever the server sends to te current buffer
* __Server__:
Receive code from the client
Send it to huggingface serverless api and get output
We can perform “stuff” on this output.
Send this output back to the client side.
So we will need to code these components. I believe in developing independent components and integrating them in the end. This is a practice which most of the developers in the market follow. It's easy, clean and can help us change or add stuff in the future without breaking our system.

# Code it part by part
Let's work on the server. This is a crucial part of our project. We will be writing the server in typescript. I have been learning typescript and wanted to move from js to ts. 

Our server will be very simple.

server.ts
```typescript
async function query(data: { inputs: string }): Promise<any> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/codellama/CodeLlama-13b-hf",
    {
      headers: {
        Authorization: `Bearer ${process.env.API}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
```
This function is taken from huggingface docs. I have modified it a bit to work for my needs. Make sure to use environment variables to protect your tokens.


Receive code from client side:
```typescript
// recieve code from nvim plugin, use this code, send it to huggingface
// get the output. 
// Use this output and perform operations (todo) and send back to nvim

let reqcode: string = "";
app.post('/getcode', async (req: Request, res: Response) => {
  const code: { code: string } = req.body;
  console.log(code)
  try{
    console.log("/getcode endpoint hit!");
    reqcode = code.code;
    res.send(reqcode);
  } catch(error: any){
    res.send(error.message);
  }
})
```


Now to send the response from LLM back to client:
```typescript
// Todo - Figure out a way to send this response to my plugin, 
// ans variable contains the code (proper format) i need to send this to lua plugin. 
// And from there i need to append to the current buffer.

let rescode: string;
app.get('/apires', async (req: Request, res: Response) => {
  try{
    if(reqcode){
      console.log("/apires endpoint hit!");
      const response = await query({ "inputs": reqcode });
      let ans: string = response[0].generated_text;
      //console.log(ans);
      rescode = ans;
      if (rescode.startsWith(reqcode)) {
        rescode = rescode.slice(reqcode.length).trim();
      }
      console.log(rescode)

      res.send(rescode);
    }
    else{
      res.send("No code provided, Please press undo (U)")
    }
  } catch(error: any){
    res.send(error.code)
  }
})

```
We are doing string manipulation here. We are only sending the part of response which starts after the input ends. 

Now let's look into our client side of things. We are basically sort of building a neovim plugin which sends POST and GET requests to our server and receives output. You can take a look at a basic neovim plugin __[boilerplate](https://github.com/theyashwanthsai/BoilerplatePlugin)__ (lazy package syntax). 
Let's look at the core of our plugin:

opilot.lua
```lua
function CodeComplete()
                -- Logic    
                -- Copy code from current buffer
                -- send a post req to nodejs server
                -- get output back from the nodejs server
                -- write the output back to buffer
                -- Backend server has two major API
                -- Send to /getcode and then get from /apires
                local bufnr = vim.api.nvim_get_current_buf()
                local lines = vim.api.nvim_buf_get_lines(bufnr, 0, -1, false)
                local code = table.concat(lines, '\n')
                -- print(code)
                local url = "http://localhost:3000/getcode"
                local json_code = '{"code":"' .. code:gsub("\n", "\\n") .. '"}'
                local curl_cmd = "curl -X POST -H 'Content-type: application/json' -d '" .. json_code .. "' " .. url .. " 2>/dev/null"
                -- print(curl_cmd)
                local response = vim.fn.system(curl_cmd)
                -- print(response)

                local url1 = "http://localhost:3000/apires"
                local curl_cmd1 = "curl -X GET " .. url1 .. " 2>/dev/null"
                local response1 = vim.fn.system(curl_cmd1)

                local lines = {}
                for line in response1:gmatch("[^\r\n]+") do
                    table.insert(lines, line)
                end
                vim.fn.setreg('*', table.concat(lines, '\n'))
            end
            vim.cmd([[command! AI lua CodeComplete()]])
        end

```
This is a very basic but functional code assistant which lives in your text editor. You get the response from the server which is copied to your clipboard. You can paste (P) or undo (U). 


# Further changes
What else can we do? 
* We can add a feature which can explain the code present in my file. What if my file contains 5000 lines of code? We can set an upper limit of 500 lines. 
* We can add a feature to add unit tests for our code.

# Conclusion
Here's the source code __[repo](https://github.com/theyashwanthsai/opilot.nvim)__. This was an experimental project. Real implementation of github copilot is way too different. This is my own implementation which I did for fun with no real business intent. 






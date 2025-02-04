## AI Agents will kill traditional SaaS

This is what a lot of people are talking about. Satya Nadella even talked about it in few interviews. After building AI Agents close to one full year now, I think I can understand how this might happen.  
So to understand how that might happen, we need to understand what a traditional SaaS is, and then what a simple definition of an agent which might act on top of SaaS look like.

So SaaS is basically a layer (website/mobile app) on top of a huge database. This layer is an interaction layer between users and database. This layer has two aspects: 
- UI which the user interacts with, 
- A business logic which is what the interaction is meant for. This business logic is reflected on the database (CRUD operations). 

Look into google sheets, 
It is a SaaS which has a layer (website or app) and users can interact, click buttons and this interaction can change the database at their servers (This is obviously a very high level overview, when u dig deeper u will know how there are distributed algorithms at play) 

Now look into an agent. 
An agent when provided with the ability to do anything (basically tools, I have written in detail about them, check it out), they can make things easy for us. 

We can give a natural language command and they might do it for us. Or perhaps, we can speak to them in real time and get our work done (ahh the future looks good, I really want to build towards a future like that)

Essentially, an agent might interact with the layer and help perform business logic. This interaction (manually clicking buttons and keyboard keys) is taken care by agents (might use tools developed by the SaaS provider)

Or, There could be one more layer of interaction built by the SaaS provider. This layer is basically an agent which can interact with the database and do CRUD. We humans as users could interact with this layer and get our work done, or maybe build systems (This is where I want to build) which would interact with this layer and get work done.

But main question, Why?
This reduces learning curve for users. Most important thing in business is to make the lives of your users easy.

If you are a service provider, It would be good to get started with building another layer of interaction. I am seeing few doing it. Stripe has also released an agent toolkit. 

Some have entirely skipped the first layer (UI and backend logic) and are natively using agents. Perhaps Agents as a Service


![tweet](/articleimages/saas.png)
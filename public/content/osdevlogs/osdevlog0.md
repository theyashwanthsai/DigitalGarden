# I built my first operating system.

> Written on Jun 17, 2025

![os0](/articleimages/osdev0.png)

Two years ago, I thought I could build an operating system by following a book. I was naive. Convinced that watching video courses and reading tutorials would magically make me understand everything. 

**Spoiler alert**: it didn't work. I was wrong. It took me the next 2 years to learn about learning itself. I finally have my `os.img` (feels so good) file booting up with a simple "Hello World". Yup it is silly but hey its honest work!

What was the difference? I discovered what works for me and I call it **Dirty Learning**.

### Why?
I am tired of writing python, playing at the application level. Sure it pays me a lot, but I need some sort of control r. Also I realized how bad my fundamentals are xd.

Most important reason? I just felt like doing it. It kept on bugging me and I finally gave into the urge to do it. 

### Rabbit Hole is too deep.
The moment I started implementing a basic bootloader, I realized how shaky my fundamentals were:
- How does memory actually look?
- What's happening inside a register?
- Why does assembly language work the way it does?

Instead of getting discouraged, I leaned into it. Each "I don't understand this" moment became a mini research project. I'd spend hours understanding one concept before moving to the next.

### What does building an OS mean?
Here's what I built till now:
Simple bootloader that boots, prints a welcome message, and loads the kernel  
Basic kernel (written in assembly) that prints "Hello World"  

**Current state:** OS running in 16-bit real mode

**Next goals:**
- Modify bootloader to switch to protected mode
- Rewrite kernel in C
- Add keyboard input (still debating whether to build this directly into the kernel or create a separate driver)

### The Bigger Picture
My goal with this project is simple. Build till I have a basic GUI. Cause it looks so cool. But the most important thing is this - Having FUN. 

(+ also be able to run doom on it)

Its useless if I don't enjoy what I build. Especially for a side project which is not gonna pay my bills.

### Dirty?
This approach has changed how I tackle any complex "subject" I want to learn. Whether it's a new framework, a new field like RL, Game dev; Sometimes you need to get your hands dirty (Hence why I call it dirty learning) before the theory makes sense.

My `os.img` file might just print "Hello World", but for me this is the coolest thing I have done in a while. It makes me happy. That's the whole point right.

...

I will be talking about Dirty Learning in my future posts. And ofcourse I will be documenting, creating mini os devlog videos/posts.
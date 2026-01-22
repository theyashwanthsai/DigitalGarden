I have had this feeling from a long time, but I finally gave in to the urge of learning cuda, and I wanted to write my thoughts on it.

Why am I learning gpu programming, and why should you?

I usually want to learn things super fast. Get the absolute basics in as soon as possible, and then build and break stuff. This has helped me a lot in my career. But for the first time, when I tried approaching gpu programming the same way, I felt that I should probably take time, build my foundations, and do it slowly.

I realized that, if I wanted to break into gpu programming, I should have the instincts and intuition of a low level programmer. Its super hard. And that is why, this skill is super rare. 

I made sure that I will take this thing as slow as possible, and really take my time and become an absolute beast.

I am reading the popular book pmpp. While doing so, I am also building some projects where I write some kernels and benchmark them against cpu functions and pytorch functions.

### Let’s understand more about this stuff now.
Parallelism became inevitable as applications and use cases grew. GPUs were in for gaming at first, but deep learning was the one thing that changed the whole econmics of the market. The famous paper of 2012 (Alexnet) led the whole deep learning innovation, and the market understood importantance of gpus. 

CPUs are latency oriented, while GPUs are throughput oriented. Throughput == Amount of work per unit time. So if you were given a box with 1000 apples, and lets say it takes 5 secs to check whether an apple is defective or not. If you are a cpu, which runs sequentially, it would take 5000 secs. If you were a gpu, assuming you have 1000 or more *threads*, it would take 5 secs for the whole task to be completed (5 + some overhead, but you get the idea).

Understanding what and where to use the knowledge of gpu programming is important. 

What we basically happens in a cuda program is, first we write a normal program which generally runs on cpu. Here, for the parts that need parallelization we wrap the logic in a separate function called kernels. We allocate memory on the parallel device (our gpu), and launch the kernel. 
Cpu == host, gpu == device
All programs normally run on cpu, and for programs that we want on gpu, we call a kernel from the host (cpu), and this kernel runs on the device (gpu), and returns the output back to host.

This kernel generally does some calculation and return the result back to the cpu. Examples: matmul, vector addition etc.
### Grids, Blocks and Threads
Since the book talks more about cuda, I am not sure how the organizational structure differs for other models, but I like to visualize that the program I write using the structure defined in the book and the cuda documentation.

CUDA is about running a (same) program using many workers. This allows the program to run faster (much faster) than your average sequential one. 

But if you dont organize these workers before anything, you might face a lot of ugly problems later. This is why CUDA has a standard organization.

Threads are the ones sitting lowest in this organization. They are the ”workers”. They organized into blocks. A block has a specific number of threads that have shared memory.
Multiple blocks are organized into something we call a grid.

Blocks and threads are important for us. When you launch a kernel, you define the number of blocks and the number of threads per block.

In the next edition of GPUmaxxing, I will go through some codes I have written in cuda, and understand a bit more as to how calulations happen in cuda.

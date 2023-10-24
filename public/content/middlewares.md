# Middleware in Web Development

Middleware is a software component or service that acts as an intermediary layer between different software applications or components. It can be used to apply a particular functionality to an endpoint. Authentication can be taken as an example. In the previous article, We defined an authentication function, which checks if the user is authorized using the headers. We can apply this to any endpoint which we want to protect, so only the authorized users i.e. the ones who have registered on the website can access the route.


Below is a very high-level overview of middleware.

![Local Image](/articleimages/middlewares.png)



Let's understand with a coding example

```javascript
const loggerMiddleware = (req, res, next) => {
  console.log("Hello from middleware!");
  next();
};
```

This is a simple javascript function. It logs  `Hello from middleware!`

`next()` is a function that is passed as an argument to middleware functions. It is used to pass control to the next middleware function in the chain or to the route handler.

Now let us understand how a middleware function works.

```javascript
const express = require('express');
const app = express();

// Custom middleware function
const loggerMiddleware = (req, res, next) => {
  console.log("Hello from middleware!");
  next();
};

// Define routes
app.use('/special', middlewareFunction);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

```

Here, `app.use('/special', middlewareFunction);` when I hit /special endpoint, The middleware function should be triggered. This is one way of working with middleware. `app.use()` can be used to apply middleware globally to all routes. To apply to a specific route, you can mention the route as shown above.

Let's look at another way to work with middlewares

```javascript
const express = require('express');
const app = express();

// Custom middleware function
const loggerMiddleware = (req, res, next) => {
  console.log("Hello from middleware!");
  next();
};

// Define routes
app.get('/special', loggerMiddleware, (req, res) => {
// Your logic for this endpoint
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Here, The middleware is added using `app.get('/special', middlewareFunction, ...)`, where `middlewareFunction` is passed as an argument between the route path and the route handler function. When a request is made to the `'/special'` route, the `middlewareFunction` will be invoked before the route handler function `(req, res) => {...}`. Inside the middleware function, you can include any logic you need, such as authentication, authorization, or data manipulation specific to that route.

Developers can then add their middleware function to the application's request handling pipeline. The middleware will be executed in the order it's added, allowing for modular and reusable code.

## Why use it?
Think of a middleware as a security guard at the entrance of a building. The guard checks your identification, ensures you have the necessary permissions, and then allows you to enter the building. Similarly, a middleware intercepts incoming requests from users, performs certain checks or modifications, and then passes the request along to the appropriate part of the application.

One of the best use cases of middlewares is authentication. In the next article where we continue building the blog app, we will use the authentication function as a middleware to "protect" routes. So that only registered users can access them.

There are many more use cases of middlewares. Like error handling, logging important information about requests and responses, etc.

## Conclusion
Middlewares are a powerful tool in a developer's arsenal, offering numerous advantages for application development. Middlewares may sound intimidating, but they're actually quite helpful and essential in web development. They handle important tasks like authorization, request processing, response handling, error management, and logging. By understanding and utilizing middlewares effectively, developers can enhance their applications, improve security, and provide a smoother experience for users.

So, the next time you encounter the term "middleware," think of it as a helpful assistant, simplifying the complex behind-the-scenes work of web development.
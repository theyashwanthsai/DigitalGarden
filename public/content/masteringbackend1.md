## Mastering Backend Development: Part-1

*Written on Jul 9, 2023*


Building a backend server for your blog app is a crucial step towards creating a reliable and high-performing platform for your users. In this comprehensive guide, we will walk through the process of building a dynamic Node.js backend server that will empower your blog app with robust functionality, scalability, and optimal performance. Whether you're a seasoned backend developer or just starting your journey, this step-by-step tutorial will equip you with the knowledge and skills to create a backend server that meets the unique requirements of your blog app.

**Table of Contents:**

1.  **Setting up the Development Environment**
    *   Installing Node.js and npm
    *   Choosing a Code Editor
2.  **Designing the Backend Architecture**
    *   Understanding the MVC (Model-View-Controller) Pattern
    *   Planning the Database Structure
    *   Defining API Endpoints
3.  **Implementing the Server Foundation**
    *   Creating the Express.js Application
    *   Handling Routing and Middleware
    *   Connecting to the Database (e.g., MongoDB)
4.  **User Authentication and Authorization**
    *   Implementing User Registration and Login Functionality
    *   Securing API Endpoints with JWT (JSON Web Tokens)
5.  **Blog Post Management**
    *   Creating, Reading, Updating, and Deleting Blog Posts
6.  **Commenting System**
    *   Allowing Users to Add, Update and Delete Comments to Blog Posts
7.  **Like and Bookmark Functionalities**
    *   Allowing Users to Like and Bookmark Blog Posts
8.  **Trending Posts and User Profile**
9.  **Authentication using JWT (JSON Web Tokens)**
    *   Authentication Routes for Signup and Login

**The File Structure:**



```graphql
- app.js (or index.js)                # Entry point of your application
- models/                             # Directory for MongoDB models
  - User.js                              # User model definition
  - Post.js                              # Post model definition
- routes/                             # Directory for route handlers
  - authRoutes.js                        # Authentication routes
  - postsRoutes.js                       # Post-related routes
  - profileRoutes.js                      # Profile, like, bookmarks routes           
- controllers/                        # Directory for controllers
  - authController.js                    # Authentication controller
  - postController.js                    # Post controller
  - commentContoller.js                  # Comment controller
  - profileController.js                 # Profile, like, bookmarks
- middlewares/                        # Directory for middleware functions
  - authentication.js                 # Authentication middleware
```

**What is JWT?**

JSON Web Tokens (JWT) provide a secure and efficient way to handle user authentication. We are gonna secure our routes, so that only authorized users can access them. This can be done by using the concept of middleware.

![local](/articleimages/backend1.png)

We will be using a secret key to generate a token. This token will be used to verify the user and allow the server to send a response to any requests made.

This is the code snippet for a function which will verify whether the token is authorized or not. This can be used to secure our API routes so that only verified users (The one who is logged in) can access them.



```javascript
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
```

In `authentication.js` file:


```javascript
const jwt = require('jsonwebtoken');
const SECRET = 'Your-Secret-Code-Here'; 
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt
};
```

**Signup and Login Routes**

We now need to create endpoints for signup and login. Signup is when a user creates an account. We take username and password from the user and store it in the database. We check whether the username already exists in the database. We store the username and password in the database. Token is created when the user registers.

To login, we take the username and password from the user and check if it matches with any of the usernames in our database. We then check if the password matches or not. Whenever a user logs in, a token is created. This token will be used to verify the user. These tokens can be invalidated after some time.

Code snippet for the signup function:



```javascript
const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, customId });
    await newUser.save();

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully, token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while signing up' });
  }
};
```

Code snippet for the login function:



```javascript
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
```

`authController.js`:



```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = 'Your-Secret-Code-Here'; 

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const lastUser = await User.findOne({}, {}, { sort: { customId: -1 } });
    const lastCustomId = lastUser ? lastUser.customId : 0;
    const customId = lastCustomId + 1;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, customId });
    await newUser.save();

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while signing up' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

module.exports = {
  signup,
  login
};
```

These are the needed functions. Now we need to use these functions to perform on a specific route. This can be done using Express.

Let's say for my website - `random/hellouser`, I want to send a simple "hello, world." To achieve this:



```javascript
app.get('/hellouser', (req, res) => { 
  res.send('Hello World!');
})
```

We are specifying a route and then a function which will send "Hello, World!"

Now in `authRoutes.js` file:



```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
```

Now in `app.js`:



```javascript
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('MONGODB_URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Routes
app.use('', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
```

**MongoDB**

MongoDB is the M in MERN stack. It is a database, which is easy to understand and learn. There are two things we need to know - Schemas and Models.

Models are like tables. Let's say I want to create two tables:

User - where we store username, password, an array of blog posts written by the user, etc

Posts - Where we store title, content, tags, author, etc.

Schema can be defined as columns for these tables. For User - username, passwords are the columns. Similarly for Posts - title, content, etc are the columns.

Now let's take a look at `userSchema` and `postSchema`.

In `User.js`:

javascript

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  customId: { type: Number },
  posts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

In `Post.js`:


```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [{
    type: String
  }],
  author: String,
  comments: [{
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
```

We have successfully defined the user and post Schema. Notice that in `app.js` we had:


```javascript
// MongoDB connection
mongoose.connect('MONGODB_URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```

This line will connect the database and our code. I use MongoDB Atlas, easy to use. If you want to know how to set it up, follow this tutorial.

**Conclusion**

We have implemented signup and login routes and created user and post Schemas. In our next article, we will look into posts, comments, likes, and bookmarks.   
```
## Mastering Backend Development: Part-1

Building a backend server for your blog app is a crucial step towards creating a reliable and high-performing platform for your users. In this comprehensive guide, we will walk through the process of building a dynamic Node.js backend server that will empower your blog app with robust functionality, scalability, and optimal performance. Whether you're a seasoned backend developer or just starting your journey, this step-by-step tutorial will equip you with the knowledge and skills to create a backend server that meets the unique requirements of your blog app.

In this blogpost we will cover Authentication using jwt (jsonwebtoken). We will also cover endpoints for signup and login.

```
- app.js (or index.js)                
- models/                             
  - User.js                              
  - Post.js                             
- routes/                            
  - authRoutes.js                        
  - postsRoutes.js                       
  -profileRoutes.js                              
- controllers/                       
  - authController.js                    
  - postController.js                    
  - commentContoller.js                  
  - profileController.js                 
- middlewares/                        
  - authentication.js                 
```
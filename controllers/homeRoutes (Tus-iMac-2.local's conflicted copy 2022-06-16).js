const routes = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path=require('path')
//homepage display routes
routes.get('/',async (req,res)=>{
  try {
    
    // Get all alerts and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
          // order: 'id desc'
        },
      ],
    });
    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // Pass serialized data and session flag into template
    // console.log('alerts', alerts);
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
      userID: req.session.user_id,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//get the login page from handlebars
routes.get('/login',async (req,res)=>{
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
})

//get the signup page from handlebars
routes.get('/signup',async (req,res)=>{
  res.render('signup')
})
routes.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});
//view alert by id routes
routes.get('/blog/:id',withAuth, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      // {
      //   model: Comment,
      //   include: {
      //     model: User,
      //     attributes: ['username'],
      //   },
      // },
    ],
  });
// console.log( blogData)
  const blog = blogData.get({ plain: true });
  res.render('viewblog', {
    ...blog,
    canDelete: blog.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});

//get the profile page from handlebars
routes.get('/profile',withAuth, async (req,res)=>{
  res.render('profile')
})
//get profile information by id 
routes.get('/profile/:id',withAuth, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },

  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No username exit!.`,
        });
        return;
      }
      // else respond with results
      // res.json(results);
      // console.log(results);
      const ids = results.map((id) => id.get({ plain: true }));
      
      res.render('profile' , {
        ids,
        loggedIn: req.session.loggedIn,
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = routes;

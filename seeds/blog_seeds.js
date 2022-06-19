const Blog = require('../models/Blog');

const blogSeeds = [
	{
		"title": "Why MVC is so important",
		"content": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data. the View layer for design , and the Controller layer for application logic",
		"user_id": 3,
	  },
	  {
		"title": "The Ultimate Tech Quiz",
		"content": "There is a difference between authentication and authorization. Authentication means confirming your own identity,whereas authorization means being allowed access to the system",
		"user_id": 3,

	  },
	  {
		"title": "Object-Relational Mapping",
		"content": "Have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
		"user_id": 3,
	  }
  
];

const blogAlerts = () => Blog.bulkCreate(blogSeeds);

module.exports = blogAlerts;
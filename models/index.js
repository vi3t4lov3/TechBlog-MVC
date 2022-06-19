const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});




module.exports = { 
  User,
  Blog,
  Comment };
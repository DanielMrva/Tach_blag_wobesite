const User = require('./User');
const Post = require('./Post');
const Reply = require('./Reply');

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Reply);
Reply.belongsTo(Post);

User.hasMany(Reply);
Reply.belongsTo(User);

module.exports = {User, Post, Reply};
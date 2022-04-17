const User = require('./User');
const Post = require('./Post');
const Reply = require('./Reply');

User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: 'user_id'});

Post.hasMany(Reply, {foreignKey: 'post_id', onDelete: 'CASCADE'});
Reply.belongsTo(Post, {foreignKey: 'post_id'});

User.hasMany(Reply, {foreignKey: 'user_id'});
Reply.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {User, Post, Reply};
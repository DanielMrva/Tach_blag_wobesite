const sequelize = require('../config/connection');
const {User, Post, Reply} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const replyData =require('./replyData.json');

const seedDatabase = async () => {
    await sequelize.sync({force:true});

    const user = await User.bulkCreate(userData);

    const post = await Post.bulkCreate(postData);

    const reply = await Reply.bulkCreate(replyData);

    process.exit(0);
};

seedDatabase();
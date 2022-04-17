const router = require('express').Router();
const {User, Post, Reply} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_ID,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },

            ],
        });
        

        const replyData = await Reply.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Post,
                    attributes: ['post_title']
                }
            ],
        });
        const post = postData.get({plain: true});
        const replies = replyData.map((reply) => reply.get({plain: true}));

       
        res.render('onepost', {...post, replies});
        // res.status(200).json({post, replies});
        
    } catch (err) {
        res.status(404).json({message:'No post found by that ID'});
    }
});

router.get('/profile', withAuth, async (req, res) => {

    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}],
        });
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_ID
            }

        });
        const posts = postData.map((post) => post.get({plain: true}));
        const user = userData.get({plain: true});

        res.render('profile', {
            ...user, ...posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
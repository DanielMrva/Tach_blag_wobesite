const router = require('express').Router();
const {User, Post, Reply} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {posts, logged_in: req.session.logged_in});
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
                    attributes: ['id', 'name'],
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
                    attributes: ['id','name'],
                },
                {
                    model: Post,
                    attributes: ['post_title']
                }
            ],
        });
        const post = postData.get({plain: true});
        const replies = replyData.map((reply) => reply.get({plain: true}));
        
       
        res.render('onepost', {...post, replies, logged_in: req.session.logged_in});
    
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/replyto/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
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
                    attributes: ['id', 'name'],
                },
                {
                    model: Post,
                    attributes: ['post_title']
                }
            ],
        });
        const post = postData.get({plain: true});
        const replies = replyData.map((reply) => reply.get({plain: true}));

       
        res.render('replyto', {...post, replies, logged_in: req.session.logged_in});
        
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/upreply/:id', async (req, res) => {
    try {


        thisReplyData = await Reply.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Post,
                    attributes: ['id', 'post_title', 'post_content', 'date_posted'],
                    include: [
                        {
                            model: Reply,
                        },
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                },
            ]
        })
        const thisReply = thisReplyData.get({plain: true});

       
        res.render('upreply', {...thisReply, logged_in: req.session.logged_in});
        
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/uppost/:id', async (req, res) => {
    try {


        postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Reply,
                    attributes: ['id', 'reply_content', 'date_replied'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                },
            ]
        })
        const thisPost = postData.get({plain: true});

       
        res.render('uppost', {...thisPost, logged_in: req.session.logged_in});
        
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {

    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [
                {model: Post},
                {model: Reply,
                include: [
                    {
                        model: Post,
                        attributes: ['post_title']
                    }
                ]
                }
            ],
        });
        const user = userData.get({plain: true});
        res.render('profile', {
            ...user,
            logged_in: true,
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
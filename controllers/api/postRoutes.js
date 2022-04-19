const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({message: `I'm sorry, I'm afraid I couldn't find that...`});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {

    let edits = {};

    if (req.body.post_title) {
        edits.post_title = req.body.post_title;
    }
    if (req.body.post_content) {
        edits.post_content = req.body.post_content;
    }

    try {
        const postData = await Post.update(
            edits, {where: {id: req.params.id}}
        );
        if (!postData) {
            res.status(404).json({message: 'Could not find that post'});
            return; 
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
const router = require('express').Router();
const { Reply } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newReply = await Reply.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newReply);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const replyData = await Reply.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!replyData) {
            res.status(404).json({message: `I'm sorry, I'm afraid I couldn't find that...`});
            return;
        }

        res.status(200).json(replyData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id', withAuth, async (req, res) => {
    try {
        const replyData = await Reply.update(
            {reply_content: req.body.update_reply_content}, 
            {where: {id: req.params.id}}
        );
        if (!replyData) {
            res.status(404).json({message: 'Could not find that reply'});
            return; 
        }
        res.status(200).json(replyData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
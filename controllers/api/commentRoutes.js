const router = require('express').Router();
const  Comment  = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({

    })
      .then((results) => {
        res.json(results);
  
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.post('/', async (req, res) => {
try {
    const newComment = await Comment.create({
    ...req.body,
    user_id: req.session.user_id,
    blog_id: req.session.blog_id
    });

    res.status(200).json(newComment);
} catch (err) {
    res.status(400).json(err);
}
});

router.put('/:id', withAuth, async (req, res) => {
try {
    const updatedComment = await Comment.update(
    {
        ...req.body,
    },
    { where: { id: req.params.id } }
    );

    res.status(200).json(updatedComment);
} catch (err) {
    console.log(err);
    res.status(400).json(err);
}
});

router.delete('/:id', withAuth, async (req, res) => {
try {
    const comment = await Comment.destroy({
    where: {
        id: req.params.id,
        user_id: req.session.user_id,
    },
    });

    if (!comment) {
    res.status(404).json({ message: 'No comment found with this id!' });
    return;
    }

    res.status(200).json(comment);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
// implement your posts router here
const express = require('express')

const Posts = require('./posts-model')

const router = express.Router()


router.get('/api/posts', (req, res) => {
    Posts.find(req.query)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
})

router.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

router.post('/api/posts', (req, res) => {
    const newPost = req.body;
    if(!newPost.title || !newPost.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert(newPost)
        .then((post) => {
            res.status(201).json(post)
            return post
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})

module.exports = router
const express = require('express')
const postDB = require('./helpers/postDb')
const router = express.Router()

router.use(express.json())

router.get('/posts', async (req, res) => {
    try {   
        const posts = await postDB.get(req.query)
        res.status(200).json(posts)      
    } catch(error) {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }  
})

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await postDB.getById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch(error) {
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
})

router.post('/posts', async (req, res) => {
    try {
        const post = await postDB.insert(req.body)
        if (post) {
            res.status(201).json(post)
        } else {
            res.status(400).json({ errorMessage: "Please provide user_id and text for the post." })
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await postDB.remove(req.params.id)
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch(error) {
        res.status(500).json({ error: "The post could not be removed" })
    }
})

router.put('/posts/:id', async (req, res) => {
    try {
        const { text, user_id } = req.body
        if (text, user_id) {
            const post = await postDB.update(req.params.id, req.body)
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide text and user_id for the post." })
        }
    } catch(error) {
        res.status(500).json({ error: "The post information could not be modified." })
    }
})

module.exports = router
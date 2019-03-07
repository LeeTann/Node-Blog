const express = require('express')
const userDB = require('./helpers/userDb')
const postDB = require('./helpers/postDb')
const router = express.Router()
const upperCaseMW = require('../middleware/uppercaseUser')

router.use(express.json())
router.use(upperCaseMW)

router.get('/users', async (req, res) => {
    try {   
        const users = await userDB.get(req.query)
        console.log(users)
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }  
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await userDB.getById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The user with the specific ID does not exist."})
        }
    }catch(error) {
        res.status(500).json({ message: "The user information could not be retrieved"})
    }
})

router.post('/users', upperCaseMW, async (req, res) => {
    try {
        const user = await userDB.insert(req.body)
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(400).json({ message: "Please provide the right name for user"})
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the user to the database"})
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await userDB.remove(req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: "The user could not be removed"})
    }
})

router.put('/users/:id', upperCaseMW, async (req, res) => {
    try {
        const { name } = req.body
        if (name) {
            const user = await userDB.update(req.params.id, req.body)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist "})
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide the correct name for user" })
        }
    } catch(error) {
        res.status(500).json({ error: "The user information could not be updated" })
    }
})

// Get posts by user
router.get('/users/:id/posts', async (req, res) => {
    try {
        const user = await userDB.getById(req.params.id)
        if (user) {
            const posts = await userDB.getUserPosts(req.params.id)
            if (user && posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide the correct name for user" })   
        } 
    } catch(error) {
        res.status(500).json({ error: "Could not retrieve the users post" })
    }
})

module.exports = router
const express = require('express')
const userDB = require('./helpers/userDb')
const router = express.Router()

router.use(express.json())

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

router.post('/users', async (req, res) => {
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

router.put('/users/:id', async (req, res) => {
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

module.exports = router
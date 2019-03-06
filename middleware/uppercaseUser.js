const upperCaseName = (req, res, next) => {
    const name = req.body.name
    if (name) {
        req.body.name = name.toUpperCase()
    }
    next()
}

module.exports = upperCaseName
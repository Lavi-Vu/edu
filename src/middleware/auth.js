const jwt = require('jsonwebtoken')
const User =  require("../app/models/User")

const auth = async(req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send({ error: 'Not authorized to access this resource' })
      return
    }
  
    const token = authHeader.replace('Bearer ', '')
    const data = jwt.verify(token, 'mk')
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth

import jwt from 'jsonwebtoken'
export const auth = (req, res, next) => {
    try {
    if(!req.cookies.token) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        const token = req.cookies.token
        const userVerify = jwt.verify(token, 'secret')
        req.user = userVerify
    } catch (error) {
        return res.status(401).send({status: 'error', error: 'Unauthorized'})
    }
    next()
}
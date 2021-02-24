const jwt = require('jsonwebtoken')

// APP_SECRET is used to sign the JWTs which you’re issuing for your users.
const APP_SECRET = 'GraphQL-is-aw3some'  

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET)
}


// The getUserId function is a helper function that will be called in resolvers which require authentication
// It first retrieves the Authorization header (which contains the User’s JWT) from the context
// It then verifies the JWT and retrieves the User’s ID from it
function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.replace('Bearer', '')
            if (!token) {
                throw new Error('No token found')
            }
            const { userId } = getTokenPayload(authToken)
            return userId
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(token)
        return userId
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
}
const redis = require('./redis-client.js')

function rateLimiter({ secondsWindow, allowedHits}) {

    return async (req, res, next) => {

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        const requests = await redis.incr(ip)

        let ttl
        if(requests === 1) {
            await redis.expire(ip, secondsWindow)
            ttl = secondsWindow
        } else {
            ttl = await redis.ttl(ip)
        }
        
        if(requests > allowedHits) {
            return res.status(503).json({
                response: 'error',
                callsInAMinute: requests,
                ttl
            })
        } else {
            req.requests = requests
            req.ttl = ttl
            next()
        }
    }
}

module.exports = rateLimiter
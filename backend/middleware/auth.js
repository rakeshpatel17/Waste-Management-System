const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const head = req.headers;
    if ('authorization' in head) {
        const token = req.headers["authorization"].split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);
            if (decoded) {
                req.id = decoded;
                next();
            } else {
                return res.status(401).send("Unauthorized");
            }
        } catch (error) {
            return res.status(401).send("Unauthorized");
        }
    } else {
        return res.status(400).json({ message: "No headers" });
    }
}

module.exports = { verifyToken };

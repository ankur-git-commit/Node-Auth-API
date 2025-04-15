import express from "express"
import jwt from "jsonwebtoken"

const PORT = 5000 || 3000

const app = express()

app.get("/", (req, res) => {
    res.status(200).send("<h2>Route to /api to get started</h2>")
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
const verifyToken = (req, res, next) => {
    // console.log(req.headers)
    //Get auth header value
    const bearerHeader = req.headers["authorization"]
    //Check if bearer exits
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")
        // console.log(bearer)
        const bearerToken = bearer[1]
        console.log(bearerToken)
        req.token = bearerToken

        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API",
    })
})

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post Created...",
                authData,
            })
        }
    })
})

app.post("/api/login", (req, res) => {
    // Test User
    const user = {
        id: 1,
        username: "ankur",
        email: "test@email.com",
    }

    jwt.sign({ user: user }, "secretkey",(err, token) => {
        res.json({
            token: token,
        })
    })
})

app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`)
})

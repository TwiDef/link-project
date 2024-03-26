const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors') // <--- important

const app = express()
const PORT = config.get('port') || 5000

app.use(cors()) // <--- important
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))


const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'))
        app.listen(PORT, () => {
            console.log(`app started on port: ${PORT}`)
        })
    } catch (error) {
        console.log('Server error', error.message)
        process.exit(1)
    }
}

start()


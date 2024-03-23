const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))


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


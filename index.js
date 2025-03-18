import express from 'express'
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('hello word')
})

app.listen(PORT, () => {
    console.log(`Server is run on port ${PORT}`);
})
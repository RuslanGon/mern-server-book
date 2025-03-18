import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello word')
})

async function startServer() {
    try {
      await mongoose.connect('mongodb+srv://book:book@cluster0.9yeu1fb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      app.listen(PORT, () => {
        console.log(`DB is ok, Server start port on ${PORT}`);
      });
    } catch (error) {
      console.log("DB is error");
    }
  }
  startServer();
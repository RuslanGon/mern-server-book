import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Book from './models/Book.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/upload-book', async (req, res) => {
    try {
        const data = req.body;
        const result = await Book.create(data); 
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при добавлении книги' });
    }
});

// app.get('/all-books', async (req, res) => {
//     try {
//         const books = await Book.find(); 
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ error: 'Ошибка при получении всех книг' });
//     }
// });

app.patch("/book/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updateBook = req.body;
      const filter = { _id: new ObjectId(id) }; 
      const updateDoc = {
        $set: updateBook, 
      };
  
      const result = await Book.updateOne(filter, updateDoc);
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Книга не найдена' });
      }
  
      res.status(200).json({ message: 'Книга обновлена', result });
    } catch (error) {
      console.error("Ошибка при обновлении книги:", error);
      res.status(500).json({ error: "Ошибка при обновлении книги" });
    }
  });

app.delete("/book/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }; 
        const result = await Book.deleteOne(filter)
        res.send(result)

    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удолении книги' });
    }
}); 

app.get("/all-books", async (req, res) => {
    try {
      let query = {}; 
      if (req.query.category) {
        query.category = req.query.category; 
      }
      const result = await Book.find(query); 
      res.send(result); 
    } catch (error) {
      res.status(500).json({ error: "Ошибка при получении книг по категориям" });
    }
  });


async function startServer() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("DB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

startServer();

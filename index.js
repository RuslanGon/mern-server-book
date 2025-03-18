import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Book from './models/Book.js';

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

async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://book:book@cluster0.9yeu1fb.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0');
        console.log("DB is connected");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

startServer();

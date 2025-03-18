import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    imageURL: { type: String, required: true },
    category: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookDescription: { type: String, required: true },
    bookPDFUrl: { type: String, required: true }
});

export default mongoose.model('Book', bookSchema);
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/books", async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Data is missing" });
            return;
        }

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });


        const createdBook = await book.save();

        res.send(createdBook);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }

}
);


router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();

        res.send({
            count: books.length,
            data: books,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
);

router.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
);

router.put("/books/:id", async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Data is missing" });
            return;
        }

        const result = await Book.findByIdAndUpdate(req.params.id, req.body);

        if (!result) {
            res.status(404).send({ message: "Book not found" });
            return;
        }
        res.send({ message: "Book updated successfully" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
);


router.delete("/books/:id", async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);

        if (!result) {
            res.status(404).send({ message: "Book not found" });
            return;
        }
        res.send({ message: "Book deleted successfully" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
);

export default router;
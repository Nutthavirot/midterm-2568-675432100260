// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {

    // GET /api/books
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // GET /api/books/:id
    async getBookById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const book = await bookService.getBookById(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // POST /api/books
    async createBook(req, res, next) {
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/books/:id
    async updateBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const updatedBook = await bookService.updateBook(id, req.body);
            res.json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/books/:id/borrow
    async borrowBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const book = await bookService.borrowBook(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/books/:id/return
    async returnBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const book = await bookService.returnBook(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/books/:id
    async deleteBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await bookService.deleteBook(id);
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();

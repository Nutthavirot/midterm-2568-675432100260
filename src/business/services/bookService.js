// src/business/services/bookService.js
const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {

    // GET ALL BOOKS
    async getAllBooks(status = null) {
        // 1. Validate status (ถ้ามี)
        if (status && !['available', 'borrowed'].includes(status)) {
            throw { status: 400, message: 'Invalid status value' };
        }

        // 2. Get data from repository
        const books = await bookRepository.findAll(status);

        // 3. Calculate statistics
        const statistics = {
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length,
            total: books.length
        };

        // 4. Return formatted result
        return { books, statistics };
    }

    // GET BOOK BY ID
    async getBookById(id) {
        // 1. Validate ID
        if (isNaN(id)) {
            throw { status: 400, message: 'Invalid book ID' };
        }

        // 2. Get book
        const book = await bookRepository.findById(id);

        // 3. Not found
        if (!book) {
            throw { status: 404, message: 'Book not found' };
        }

        // 4. Return book
        return book;
    }

    // CREATE BOOK
    async createBook(bookData) {
        bookValidator.validateBook(bookData);

        try {
            // repository คืน book object อยู่แล้ว
            return await bookRepository.create(bookData);

        } catch (err) {
            if (err.message && err.message.includes('UNIQUE')) {
                throw { status: 409, message: 'ISBN already exists' };
            }
            throw err;
        }
    }


    // UPDATE BOOK
    async updateBook(id, bookData) {
        // 1. Validate ID
        if (isNaN(id)) {
            throw { status: 400, message: 'Invalid book ID' };
        }

        // 2. Validate book data
        bookValidator.validateBook(bookData);

        // 3. Check if book exists
        const existingBook = await bookRepository.findById(id);
        if (!existingBook) {
            throw { status: 404, message: 'Book not found' };
        }

        try {
            // 4. Update book
            await bookRepository.update(id, bookData);

            // 5. Return updated book
            return await bookRepository.findById(id);

        } catch (err) {
            if (err.message && err.message.includes('UNIQUE')) {
                throw { status: 409, message: 'ISBN already exists' };
            }
            throw err;
        }
    }

    // BORROW BOOK
    async borrowBook(id) {
        if (isNaN(id)) {
            throw { status: 400, message: 'Invalid book ID' };
        }

        const book = await bookRepository.findById(id);

        if (!book) {
            throw { status: 404, message: 'Book not found' };
        }

        if (book.status === 'borrowed') {
            throw { status: 400, message: 'Book is already borrowed' };
        }

        await bookRepository.updateStatus(id, 'borrowed');
        return await bookRepository.findById(id);
    }

    // RETURN BOOK
    async returnBook(id) {
        if (isNaN(id)) {
            throw { status: 400, message: 'Invalid book ID' };
        }

        const book = await bookRepository.findById(id);

        if (!book) {
            throw { status: 404, message: 'Book not found' };
        }

        if (book.status !== 'borrowed') {
            throw { status: 400, message: 'Book is not borrowed' };
        }

        await bookRepository.updateStatus(id, 'available');
        return await bookRepository.findById(id);
    }

    // DELETE BOOK
    async deleteBook(id) {
        if (isNaN(id)) {
            throw { status: 400, message: 'Invalid book ID' };
        }

        const book = await bookRepository.findById(id);

        if (!book) {
            throw { status: 404, message: 'Book not found' };
        }

        if (book.status === 'borrowed') {
            throw { status: 400, message: 'Cannot delete borrowed book' };
        }

        await bookRepository.delete(id);

    }
}

module.exports = new BookService();

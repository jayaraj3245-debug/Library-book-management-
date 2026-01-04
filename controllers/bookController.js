const Book = require("../models/Book");

// Create Book
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All Books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Read by Category
exports.getByCategory = async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
};

// Books after 2015
exports.getAfter2015 = async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
};

// Update Copies
exports.updateCopies = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  const updatedCopies = book.availableCopies + req.body.change;
  if (updatedCopies < 0)
    return res.status(400).json({ error: "Negative stock not allowed" });

  book.availableCopies = updatedCopies;
  await book.save();
  res.json(book);
};

// Update Category
exports.updateCategory = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

// Delete Book if copies = 0
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({ error: "Cannot delete book with copies" });

  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
};

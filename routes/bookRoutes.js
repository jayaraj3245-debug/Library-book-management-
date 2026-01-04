const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.post("/books", controller.createBook);
router.get("/books", controller.getAllBooks);
router.get("/books/category/:category", controller.getByCategory);
router.get("/books/year/2015", controller.getAfter2015);
router.put("/books/copies/:id", controller.updateCopies);
router.put("/books/category/:id", controller.updateCategory);
router.delete("/books/:id", controller.deleteBook);

module.exports = router;

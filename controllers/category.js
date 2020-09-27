const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    console.log("Received a GET CATEGORY BY ID request");
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    })
}

exports.createCategory = (req, res) => {
    console.log("Received a CREATE CATEGORY Request");
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({ category });
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    console.log("Received a GET ALL CATEGORIES request");
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    console.log("Received a UPDATE CATEGORY Request");
    const category = req.category;
    category.name = req.body.name;

    category.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(cate);
    })
}

exports.removeCategory = (req, res) => {
    console.log("Received a DELETE CATEGORY Request");
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            })
        }
        res.json({
            message: `successfully deleted "${category.name}"`
        });
    })
}
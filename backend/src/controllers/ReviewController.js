const Review = require("../models/Review");

const ReviewController = {
    addReview: async (req, res) => {
        try {
            const { user, product, rating, comment } = req.body;
            const newReview = new Review({ user, product, rating, comment });
            await newReview.save();
            res.status(201).json({ message: "Reseña agregada", review: newReview });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductReviews: async (req, res) => {
        try {
            const reviews = await Review.find({ product: req.params.productId }).populate("user", "name");
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteReview: async (req, res) => {
        try {
            await Review.findByIdAndDelete(req.params.id);
            res.json({ message: "Reseña eliminada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ReviewController;

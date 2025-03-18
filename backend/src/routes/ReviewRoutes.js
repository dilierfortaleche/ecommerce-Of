const express = require('express');
const router = express.Router();
const controllerReview = require('../controllers/ReviewController');

router.post('/', controllerReview.addReview);
router.get('/', controllerReview.getProductReviews);
router.delete('/:id', controllerReview.deleteReview);

module.exports = router;
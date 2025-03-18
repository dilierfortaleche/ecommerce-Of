const express = require('express');
const router = express.Router();
const controllerReview = require('../controllers/ReviewController');
const auth = require('../middlewares/Auth');
const roleCheck = require('../middlewares/roleCheck');


router.post('/', [auth, roleCheck(['user'])], controllerReview.addReview);
router.get('/', [auth, roleCheck(['user'])], controllerReview.getProductReviews);
router.delete('/:id', [auth, roleCheck(['user'])],controllerReview.deleteReview);

module.exports = router;
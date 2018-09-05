var express = require('express');
var router = express.Router();
var sliderController = require('../controllers/slider');
var upload = require('../functions/movieUpload')


router.post('/add', upload.any(), sliderController.addSlider);
//GET all the movies listing
router.get('/', sliderController.getAllSliders);

router.get('/get/:id', sliderController.getById);

router.get('/delete/:id', sliderController.deleteSlider)

module.exports = router;
var Slider = require('../models/slider');
var cloud = require('../functions/cloudinaryUpload');

exports.addSlider = function(req, res, next){
    try {
    Slider.find({title: req.body.title}, function(err, slider){
        if (slider.length){
            res.status(409).json({message: 'slider has been uploaded before'})
        } else if (req.files.length != 2){
            return res.json({mesage: 'Please upload both image and video files'})
        }
         else {
            var slider= {
                title: req.body.title,
                description: req.body.description,
                releaseYear: req.body.releaseYear,
                producer: req.body.producer,
                price: req.body.price,
                sliderImage: req.files[0].path,
                sliderImageID: '',
                video: req.files[1].path,
                videoID: ''
            }
            cloud.upload(slider.sliderImage).then((result) => {
                slider.sliderImage = result.url;
                slider.sliderImageID = result.Id;
                cloud.upload(slider.video).then((result) => {
                    slider.video = result.url;
                    slider.videoID = result.Id;
                    Slider.create(slider, function(err){
                        if(err){
                                res.status(500).json({err: err, message: 'Something went wrong'});
                        }else{
                            console.log(slider);
                            res.status(201).json({message: 'Slider was added successfully'});
                        }
                     });
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error);
            })
           
        }
    })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getAllSliders = function(req, res, next){
    try {
    Slider.find(function(err, sliders){
            if(err) {
                res.status(500).json({err: err, message:'Something went wrong'})
            }else if(sliders.length == 0){
                res.status(200).json({message: 'List of sliders is empty'})
            }else{
                res.status(200).json({
                    count: sliders.length,
                    sliders
                })
            }    
    })
    .populate({path: 'comments', populate: {
        path: 'user', select: 'name -_id'
    }, select: '-__v'})
    .select('-__v')
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.getById = function(req, res, next){
    try {
    var id = ({_id:req.params.id});
     Slider.findById(id, '-__v', function(err, slider){
        if(err) {
               res.status(404).json({message: 'Resource not found'});
        } else if(slider){
               res.status(200).json({message: slider});
        } else {
               res.status(401).json({message: 'No valid entry for required Id'});
        }
    })
    .populate({path: 'comments', populate: {
        path: 'user', select: 'name -_id'
    }, select: '-__v'})
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.deleteSlider = function(req, res, next){
    try {
    var id = ({_id:req.params.id});
    Slider.findById(id, function(err, slider){
            if (slider !== null){
                if (err){
                    res.status(404).json({message: 'The required slider does not exist'});
                }else{
                    cloud.deleteVideoFile(slider.videoID).then(() => {
                        cloud.delete(slider.imageID).then(() => {
                            Slider.remove(id, function(err){
                                if(err) {
                                    res.status(500).json({err: err, message: 'The resource could not be deleted'})
                                }else{
                                    res.status(200).json({message: 'The slider was deleted'});
                                }
                            })
                        })
                    })
                }
            }else{
                res.status(404).json({message: 'The slider with required Id not found'});
            }
        }) 
    }catch (exception) {
        console.log('Error: ' + exception);
    } 
}
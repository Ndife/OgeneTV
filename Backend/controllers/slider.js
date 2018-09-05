var Slider = require('../models/slider');
var cloud = require('../functions/cloudinaryUpload');

exports.addSlider = function(req, res, next){
    try {
    Slider.find({title: req.body.title}, function(err, slider){
        if (slider.length){
            res.status(409).json({message: 'slider has been uploaded before'})
        } else {
            var slider= {
                title: req.body.title,
                image: req.files[0].path,
                imageID: ''
            }
            cloud.upload(slider.image).then((result) => {
                slider.image = result.url;
                slider.imageID = result.Id;
                    Slider.create(slider, function(err){
                        if(err){
                                res.status(500).json({err: err, message: 'Something went wrong'});
                        }else{
                            console.log(slider);
                            res.status(201).json({message: 'Slider was added successfully'});
                        }
                     });
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
                        cloud.delete(slider.imageID).then(() => {
                            Slider.remove(id, function(err){
                                if(err) {
                                    res.status(500).json({err: err, message: 'The resource could not be deleted'})
                                }else{
                                    res.status(200).json({message: 'The slider was deleted'});
                                }
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
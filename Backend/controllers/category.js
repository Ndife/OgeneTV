var Category = require('../models/category');

exports.addCategory = function(req, res){
    try {
        Category.find({name: req.body.name.toLowerCase()}, function(err, category){
            if(category.length){
                res.status(409).json({message: 'Category already exists!'})
            } else {
                var category = {
                    name: req.body.name.toLowerCase()
                }
                Category.create(category, function(err){
                    if(err){
                        res.status(500).json({err: err, message: 'Error occured while creating Category'})
                    } else {
                        console.log(category);
                        res.status(201).json({message: 'Category was created successfully'})
                    }
                })
            }
        })
    } catch (exception) {
        console.log(exception)
    }
}

exports.getCategories = function(req, res){
    try {
       Category.find(function(err, categories){
            if(err) {
                res.status(500).json({err: err, message:'Something went wrong'})
            }else if(categories.length == 0){
                res.status(200).json({message: 'List of categories is empty'})
            }else{
                res.status(200).json({
                    count: categories.length,
                    categories: categories
                })
            }    
        })
        .select('-__v')
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}

exports.deleteCategory = function(req, res){
    try {
       var id = {_id: req.params.id};
       Category.remove(id, function(err){
           if(err){
               res.status(500).json({err: err, message:'Something went wrong'})
           }else{
               res.status(200).json({message: 'Category deleted successfully'});
           }
       })
    } catch (exception) {
        console.log('Error: ' + exception);
    }
}
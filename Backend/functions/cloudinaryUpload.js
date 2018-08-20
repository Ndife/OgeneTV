var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'ogenetv', 
    api_key: '379334756145365', 
    api_secret: 'KDNbVDKcu7VctfxkDgZiWX04My8' 
})

exports.upload = function(file){
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, function(result){
            resolve({url: result.url, Id: result.public_id});
        }, {resource_type: "auto"})
   })
}

exports.delete = function(publicId){
    return new Promise(resolve => {
        cloudinary.uploader.destroy(publicId, function(result){
            resolve(result);
        })
    })
}
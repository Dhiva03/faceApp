const mongoose = require('mongoose');

var inTimePictureSchema = mongoose.Schema({
         file:{type:String},
    	 filePath:{type: String},
    	 status:{type:String,default:'pending'},
    	 
      }
);
module.exports = mongoose.model('InTimePicture',inTimePictureSchema);
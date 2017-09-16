const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
         employeeId:{type:String},
    	 firstName: { type: String},
    	 lastName:{type:String},
    	 salary:{type:String},
    	 image:{ data: Buffer, contentType: String },
    	 face_id:{type:String },
    	 picture:{type:String},
    	 enterStatus:{type:Boolean,default:false},
    	 outStatus:{type:Boolean,default:false}
      }
);
module.exports = mongoose.model('Employee',employeeSchema);
const mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	 employeeId:{type:String},
	 firstName: { type: String},
	 lastName:{type:String},
	 timeInDate:{type:String},
	 timeIn:{type:String},
	 timeOut:{type:String},
	 timeOutDate:{type:String}
      }
);
module.exports = mongoose.model('Report',reportSchema);
const express = require('express');
const Employee= require('../model/employee'); 
const multer  = require('multer')
const router = require('express').Router();
const path=require('path');
const fs=require('fs');
const Kairos = require('kairos-api');
const client = new Kairos('40179d2b', 'f5fcbd2e3e5673bdd1cc0d03eaaabfa5');
const chokidar = require('chokidar');
const moment =require('moment');
const InTimePicture =require('../model/inTimePicture');
const Report =require('../model/report');
const getClosest = require("get-closest");
const mkdirp = require('mkdirp');

const watcher = chokidar.watch('./in').on('add', (path) => {
   const Path =path;
   const split =Path.split("\\")[1];
   const time =split.split(".")[0];
   const final=parseInt(time);
   const t = new Date(final);  
   const m = moment(t);
   const date = m.format("DD.MM.YYYY");
   const Time =m.format("h:mm:ss a");
   
   InTimePicture.findOne({'file':split}).exec((err,user)=>{
	if(user){
		if(user.status=="pending"){
			var params = {
					image:'https://murmuring-plains-24395.herokuapp.com/in/'+split,
				    gallery_name:'RET'	
			};
		     			 
			client.recognize(params).then(function(result) {
				
				           if(result.body.images){
				           for(var i=0;i<result.body.images.length;i++){
				        	   if(result.body.images[i].transaction.status=="success"){
				        	if(result.body.images[i].candidates[i]){
				        		Employee.findOne({'face_id':result.body.images[i].candidates[0].face_id}).exec((err,user)=>{
				        			if(!user.enterStatus){
			        	     			var report = new Report();
			        	     		   report.employeeId = user.employeeId;
			        	     		   report.firstName = user.firstName;
			        	     		   report.LastName =user.lastName;
			        	     		   report.timeInDate=date;
			        	     		   report.timeIn=Time;
			        	     		   if (user.employeeId== null || user.employeeId == "" || user.firstName == "" || user.firstName == null|| user.lastName == "" || user.lastName == null || date == "" || date == null || Time == "" || Time == null) {
			        	     		       
			        	     		   } else {
			        	     		       report.save((err, data) =>{
			        	     		    	  if(data){
				        	     		    	   InTimePicture.findOne({'file':split}).exec((err,file)=>{
				        	     		    		 file.status="success";
				        	     		    		 file.save((err,save)=>{
				        	     		    		 console.log(save);
				        	     		    			 
				        	     		    		 })
				        	     		    	   })
			        	     		    	  }
			        	     		}) 		
			        	     		   }
				        			}
				        		 user.enterStatus=true;
				        		 user.outStatus=false;
				        		 user.save((err,save)=>{
				        		  	 console.log(save);
				        		 })
			        	     		   
				        		})
				        	
				        		
				        	}
				        	   }
				           }
				           }
		   
		}).catch((err)=> {		
				console.log(err);
			});	
		}
	}
	else if(!user){
		var inTimePicture = new InTimePicture();
		   inTimePicture.file = split;
		   inTimePicture.filePath = Path;
		   if (split== null || split == "" || Path == "" || Path == null ) {
		      
		   } else {
		       inTimePicture.save((err, data) =>{
		    	   console.log(data);
		    	   if(data.status=="pending"){
		    		   var params = {
		    					image:'https://murmuring-plains-24395.herokuapp.com/in/'+split,
		    				    gallery_name:'RET'	
		    			};
		    		     		 
		    			client.recognize(params).then(function(result) {
		    				           if(result.body.images){
		    				           for(var i=0;i<result.body.images.length;i++){
		    				        	if(result.body.images[i].transaction.status=="success"){
		    				        	if(result.body.images[i].candidates){
		    				        		Employee.findOne({'face_id':result.body.images[i].candidates[0].face_id}).exec((err,user)=>{
		    				        			 console.log(user);
		    				        			if(!user.enterStatus){
	    				        	     		   var report = new Report();
	    				        	     		   report.employeeId = user.employeeId;
	    				        	     		   report.firstName = user.firstName;
	    				        	     		   report.LastName =user.lastName;
	    				        	     		   report.timeInDate=date;
	    				        	     		   report.timeIn=Time;
	    				        	     		   if (user.employeeId== null || user.employeeId == "" || user.firstName == "" || user.firstName == null|| user.lastName == "" || user.lastName == null || date == "" || date == null || Time == "" || Time == null) {
	    				        	     		       
	    				        	     		   } else {
	    				        	     		       report.save((err, data) =>{
	    				        	     		       if(data){
	    				        	     		    	   InTimePicture.findOne({'file':split}).exec((err,user)=>{
	    				        	     		    		 user.status="success";
	    				        	     		    		 user.save((err,save)=>{
	    				        	     		    		 console.log(save);
	    				        	     		    			 
	    				        	     		    		 })
	    				        	     		    	   })
	    				        	     		       }
	    				        	     		}) 		
	    				        	     		   }
		    				        			}
		    				        			 user.enterStatus=true;
		    				        			 user.outStatus=false;
		    					        		 user.save((err,save)=>{
		    					        		  	 console.log(save);
		    					        		 })
		    				        		})
		    				        	
		    				        		
		    				        	}
		    				        	}
		    				        	  
		    				           }
		    				           }
		    		   
		    		}).catch((err)=> {
	      				
	      				console.log(err);
	      			});
		    	   }
		       })
		   }
	} 
	
 })
})
const watcher1 = chokidar.watch('./out').on('add', (path) => {
   const Path =path;
   const split =Path.split("\\")[1];
   const time =split.split(".")[0];
   const final=parseInt(time);
   const t = new Date(final);  
   const m = moment(t);
   const date = m.format("DD.MM.YYYY");
   const Time =m.format("h:mm:ss a");
   
   InTimePicture.findOne({'file':split}).exec((err,user)=>{
	if(user){
		if(user.status=="pending"){
			var params = {
					image:'https://murmuring-plains-24395.herokuapp.com/out/'+split,
				    gallery_name:'RET'	
			};
		     			 
			client.recognize(params).then(function(result) {
				           if(result.body.images){
				           for(var i=0;i<result.body.images.length;i++){
				        	   if(result.body.images[i].transaction.status=="success"){
				        	if(result.body.images[i].candidates){
				        		Employee.findOne({'face_id':result.body.images[i].candidates[0].face_id}).exec((err,user)=>{	
				        			console.log(user);
				        			if(!user.outStatus){
				        				Report.findOne({'employeeId':user.employeeId ,'timeOut': null}).exec((err,rep)=>{
				        					rep.timeOutDate=date;
				        					rep.timeOut=Time;
				        					rep.save((err,data)=>{
			        	     		    	  if(data){
				        	     		    	   InTimePicture.findOne({'file':split}).exec((err,file)=>{
				        	     		    		 file.status="success";
				        	     		    		 file.save((err,save)=>{
				        	     		    		 console.log(save);
				        	     		    			 
				        	     		    		 })
				        	     		    	   })
			        	     		    	  }
			        	     		}) 		
			        	     		   })
				        			
				        		 
				        		 user.outStatus=true;
				        	     user.enterStatus=false;
				        		 user.save((err,save)=>{
				        		  	 console.log(save);
				        		 })
				        			}		   
				        		})
				        	
				        		
				        	}
				        	   }
	
				           }
				           }
		   
		}).catch((err)=> {		
				console.log(err);
			});	
		}
	}
	else if(!user){
		var inTimePicture = new InTimePicture();
		    inTimePicture.file = split;
		    inTimePicture.filePath = Path;
		   if (split== null || split == "" || Path == "" || Path == null ) {
		      
		   } else {
		       inTimePicture.save((err, data) =>{
		    	   console.log(data);
		    	   if(data.status=="pending"){
		    		   var params = {
		    					image:'https://murmuring-plains-24395.herokuapp.com/out/'+split,
		    				    gallery_name:'RET'	
		    			};
		0    		     			 
		    			client.recognize(params).then(function(result) {
		    				           if(result.body.images){
		    				           for(var i=0;i<result.body.images.length;i++){
		    				        	   if(result.body.images[i].transaction.status=="success"){
		    				        	if(result.body.images[i].candidates){
		    				        		Employee.findOne({'face_id':result.body.images[i].candidates[0].face_id}).exec((err,user)=>{
		    				        			if(!user.outStatus){
		    				        				Report.findOne({'employeeId':user.employeeId ,'timeOut':null}).exec((err,rep)=>{
		    				        					rep.timeOutDate=date;
		    				        					rep.timeOut=Time;
		    				        					rep.save((err,data)=>{
		    			        	     		    	  if(data){
		    				        	     		    	   InTimePicture.findOne({'file':split}).exec((err,file)=>{
		    				        	     		    		 file.status="success";
		    				        	     		    		 file.save((err,save)=>{
		    				        	     		    		 console.log(save);
		    				        	     		    			 
		    				        	     		    		 })
		    				        	     		    	   })
		    			        	     		    	  }
		    			        	     		}) 		
		    			        	     		   })
		    				        			
		    				        		 
		    				        		 user.outStatus=true;
		    				        		 user.enterStatus=false;		
		    				        		 user.save((err,save)=>{
		    				        		  	 console.log(save);
		    				        		 })
		    				        			}	   
		    				        		})
		    				        	
		    				        	}	
		    				        	}
		    				        	  
		    				          }
		    				           }
		    		   
		    		}).catch((err)=> {
	      				
	      				console.log(err);
	      			});
		    	   }
		       })
		   }
	} 
	
 })
})

var storageIn = multer.diskStorage({
	destination: function(req, file, callback) {
		var In = 'in/';
        mkdirp.sync(In);
		callback(null, In)	
		},
	filename: function(req, file, callback) {
	var destName=Date.now()+ path.extname(file.originalname);
    callback(null, destName )
	}	
});

var storageUpload = multer.diskStorage({
	destination: function(req, file, callback) {
		var upload = 'upload/';
        mkdirp.sync(upload);
		callback(null, upload)	
		},
	filename: function(req, file, callback) {
	var destName=Date.now()+ path.extname(file.originalname);
    callback(null, destName )
	}	
});

router.post('/api/reg',function(req, res) {
	var upload = multer({
		storage: storageUpload,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
		}
			callback(null, true)
		}
	}).any('userFile');

	upload(req, res, function(error) {
	
		if(error)	
		{ 
		res.json({success:false,message:"only image format"});
			}else{				
			res.json({success:true,message:"file uploaded successfully",path:req.files[0].filename});
		}
	})
});
router.post('/api/in',function(req, res) {
	var upload = multer({
		storage: storageIn,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
		}
			callback(null, true)
		}
	}).any('userFile');

	upload(req, res, function(error) {
	
		if(error)	
		{ 
		res.json({success:false,message:"only image format"});
			}else{				
			res.json({success:true,message:"file uploaded successfully",path:req.files[0].filename});
		}
	})
});
var storageOut = multer.diskStorage({
	destination: function(req, file, callback) {
		var out ='out/';
        mkdirp.sync(out);
		callback(null, out)	
		},
	filename: function(req, file, callback) {
	var destName=Date.now()+ path.extname(file.originalname);
    callback(null, destName )
	}	
});
router.post('/api/out',function(req, res) {
	var upload = multer({
		storage: storageOut,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname);
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
		}
			callback(null, true)
		}
	}).any('userFile');

	upload(req, res, function(error) {
	
		if(error)	
		{ 
		res.json({success:false,message:"only image format"});
			}else{				
			res.json({success:true,message:"file uploaded successfully",path:req.files[0].filename});
		}
	})
});

router.post('/registerEmployee',function(req, res){	

var emp = new Employee();
emp.firstName = req.body.firstName;
emp.lastName = req.body.lastName;
emp.salary = req.body.salary;
//emp.image.data= fs.readFileSync(req.body.path);
//emp.image.contentType ='image/png';
emp.picture =req.body.path;
emp.employeeId = req.body.employeeId;
if (req.body.firstName == null || req.body.firstName == "" || req.body.lastName == "" || req.body.lastName == null ||req.body.employeeId == null || req.body.employeeId == "") {
    res.json({success: false, message: 'Ensure that all information were provided'});
} else {
    emp.save((err, data) =>{
        if (err) {
            res.json({success: false, message: 'employeeId already exists!!'});
        } else if(data){
        	var params = {
        			  image:req.body.path,
        			  subject_id: req.body.employeeId,
        			  gallery_name: 'RET'
        			};		 
           client.enroll(params).then(function(result) {
        				 Employee.findOne({'_id': data._id }).exec((err, user) => {
        				 user.face_id =result.body.face_id;
        				 user.save((err) => {
        					if(err) {
        					Employee.findByIdAndRemove(user._id).exec((err, del) => { 
        						if(del){
        						res.json({success: true, message: 'please try again'});	
        						}
        					})
        					}
        					else{
        						 res.json({success: true, message: 'successfully registered'});					
        					}
        				 })
        				 })
        					 
        			}).catch(function(err) {
        				console.log(err);
        			});
        }
    });
}
});

router.get('/checkEmployeeId/:employeeid', (req, res) => {	   
    if (!req.params.employeeid) {
      res.json({ success: false, message: 'EmployeeId was not provided' }); 
    } else {
      Employee.findOne({'employeeId': req.params.employeeid }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {     
          if (user) {
            res.json({ success: false, message: 'EmployeeId is already taken' }); 
          } else {
            res.json({ success: true, message: 'EmployeeId is Available' }); 
          }
        }
      });
    }
  });

router.get('/Employee', (req, res) => {	   
      Report.find({}, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {     
          if (user) {
            res.json(user); 
          }
        }
      });
    
  });



router.post('/createImage',function(req,res){
	var params = {
			 image:'http://media.new.mensxp.com/media/content/2016/Apr/best-mens-sunglasses-for-summer-980x457-1460545901_980x457.jpg',
			  subject_id: 'guru',
			  gallery_name: 'test',
			};
      			 
	client.enroll(params).then(function(result) {
		      res.json({result:result});
      			}).catch(function(err) {
      			res.json({err:err});
      			});
});
router.post('/removeImage',function(req, res){	
	var params = {
		    gallery_name:'RET'	
	};    			 
	client.galleryRemove(params).then(function(result) {
      				res.json({result:result});
      			}).catch(function(err) {
      				res.json({err:err});
      			});     
});
module.exports=router;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan=require('morgan');
const router = express.Router();
const mongoose=require('mongoose');
const config =require('./config/db');
const path=require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const register =require('./routes/register');
const multer = require('multer');
const port =process.env.PORT || 8080;
mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
	if(err){
		console.log('cannot connect to database');
		
	}else{
		console.log('database sucessfully connected');
	}
});
app.use(cors({
	origin:'*',
	  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	  allowedHeaders:'X-Requested-With,content-type',
	  optionsSuccessStatus: 204,
	  preflightContinue: false,
	  credentials:true

}));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload',express.static(__dirname+'/upload'));
app.use('/in',express.static(__dirname+'/in'));
app.use('/out',express.static(__dirname+'/out'));
app.use(express.static(__dirname+'/public'));

app.use('/register',register);

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port,()=> {
	console.log('Listening on port 8080');
});
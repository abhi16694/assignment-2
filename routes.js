var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// calling mongoose module 
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//Configuration of database 

var dbPath  = "mongodb://localhost/mybloggapp";

// command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

	console.log("database connection open success");

});
// application level middleware

app.use(function (req, res, next) {

  console.log("This is a application level middleware for Bloggers.com");
  console.log('Time of request:', Date.now());
  console.log("request url is ",req.originalUrl);
  console.log("request ip address is",req.ip)
  
  // Some global variable objects for application level usage
  
  req.blog = {blogName:'Bloggers',Url:'www.bloggers.com'};

  next();
});


 //error handling middleware 

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Not Right!');
});


// end error handling middleware

// including the model file 

var Blogg = require('./bloggModel.js');

var bloggModel = mongoose.model('Blogg');

// end include

// First General Route 
app.get('/', function (req, res) {

	//res.send(blog), //uncomment this to check the errorHandling middleware.
  	res.send("This is a blogg application")

});

////////////Codes for different routes //////////


// Route to GET all bloggs
app.get('/bloggs',function(req, res) {

	bloggModel.find(function(err,result){
		if(err){
			console.log("Error in Fetching")
			res.send(err)
		}
		else{
			console.log(result);
			res.send(result)
		}


	});
  
});

// end of route to GET all bloggs

// route to get a particular blogg

app.get('/bloggs/:id',function(req, res) {

	bloggModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log("some error in the id recognition!!! Try Again");
			res.send(err);
		}
		else{
			console.log(result);
			console.log(req.blog.blogName + " is the site from which this data is taken"),
			res.send(result)
		}


	});
  
});
// end route to get a particular blogg

// Route to Create a blogg

	app.post('/blogg/create',function(req, res) {

	

		var newBlogg = new bloggModel({

			title 		: req.body.title,
			content 	: req.body.content,
			url 	 	: req.originalUrl,
			Ip			: req.ip

		}); // end newBlogg 

		//lets set the date of creation
		var today = Date.now();
		newBlogg.published = today;

		//setting author information array
		var authorInfo = {Id: req.body.authorId,Name:req.body.authorFullName,url:req.body.authorUrl,imageUrl:req.body.image};
		newBlogg.authorInfo = authorInfo;

		// setting replies information array
		var replies = {totalItems: req.body.items,selfLink:req.body.link};
		newBlogg.replies = replies;

		//Saving the file 
		newBlogg.save(function(error){
			if(error){
				console.log(error);
				res.send(error);

			}
			else{
				console.log(newBlogg);
				console.log(req.blog.blogName + " is the site which takes this data with url-"+ req.blog.Url),
				res.send(newBlogg);
			}

		});

	  
	});

// end of route to Create a BLOG


// Route to edit a blog using _id 

app.put('/bloggs/:id/edit',function(req, res) {

	var update = req.body;

	bloggModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("Do it correctly");
			res.send(err)
		}
		else{
			res.send(result)
		}


	});
  
});
// end of route to edit a blog using _id


// Route to delete a blogg 

app.post('/bloggs/:id/delete',function(req, res) {


	

	bloggModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log("The particular blog doesn't exists or already being deleted");
			res.send(err)
		}
		else{
			console.log(req.blog.blogName + " is the site from which this data is deleted"),
			res.send(result)
		}


	});
  
});

// end of delete Route 

///////////////////////////// End of Blogg api's //////////////////////////////

app.listen(1600, function () {
  console.log('Example app listening on port 1600!');
});
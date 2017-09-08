
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var bloggSchema = new Schema({

	url			: {type:String},  //the original link at which the post resides.
	title	 	: {type:String,default:'',required:true}, //information about the title of the post.
	content		: {type:String,default:''}, //information about the main body of the post.
	Ip			: {type:String},
	published	: {type:Date},//tells the time blog was created.
	updated		: {type:Date},// tells time if their is any updation in the blog.
	authorInfo	:  {}, // information of author in form of object.
	replies		:  {} // information about the post reactions and links.
	

});


mongoose.model('Blogg',bloggSchema);
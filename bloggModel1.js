
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var bloggSchema = new Schema(
	
		{

			url				: {type:String},  //the original link at which the post resides.
			title	 		: {type:String,default:'',required:true}, //information about the title of the post.
			content			: {type:String,default:''}, //information about the main body of the post.
			Ip				: {type:String},//information about the ip address.
			published		: {type:Date},//tells the time blog was created.
			updated			: {type:Date},// tells time if their is any updation in the blog.
			authorId		: {type:String},//tells us about the author id.
			authorFullName	: {type:String},//tells us about the author full name.
			authorUrl 		: {type:String},//tells us about Url author using.
			imageUrl		: {type:String},//give info of the image used.
			totalReplyItems	: {type: Number},//give info about the replies.
			selfReplyLink	: {type :String}//give info about the lonks of the replies.
		}
	

	);


mongoose.model('Blogg',bloggSchema);
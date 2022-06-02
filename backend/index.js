var express =require('express');
var app=express();
var multer=require("multer");
var mongoose=require('mongoose');
var Cors=require('cors')
var bodyParser=require('body-parser')
const path = require('path');

app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname+'/upload'))
// app.use(express.static(path.resolve(__dirname, "./client/build")));
var dbURI='mongodb+srv://padduquiz:abcd@cluster0.emgr6.mongodb.net/fbdb?retryWrites=true&w=majority';
mongoose.connect(dbURI);



var usersSchema = new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        email:String,
        password:String,
    }
)

var postsSchema=new mongoose.Schema(
    {
        tittle:String,
        postdisc:String,
        likes:Number,
        dislikes:Number,
        Comments:Array,
        user:String,
        postpic:String,
        date:String
    }
)
var advsSchema=new mongoose.Schema(
    {
        productname:String,
        productdisc:String,
        price:Number
    }
)
var usersModel=mongoose.model('User',usersSchema);
var postsModel=mongoose.model('Post',postsSchema);
var advsModel=mongoose.model('Adv',advsSchema);

 app.get("/data",function(req,res){
     usersModel.find({},function(err,data){
      
         res.send(data)
     })
 })
app.get("/postdata",function(req,res){
    postsModel.find({},function(err,data){
       
        res.send(data)
    })
})


app.post("/addposts",function(req,res){
    console.log("req.body",req.body)
    
    var post=new postsModel(
        {
            tittle:req.body.title,
        postdisc:req.body.postdisc,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        Comments:req.body.Comments,
        user:req.body.myuser,
       postpic:req.body.imgurl,
       date:req.body.date

        }
    ) 
   post.save(function(err,data)
    {
        if(!err)
        { console.log("doc created",data);
          res.send({msg:"success"})}
           
        
    })
})

app.delete("/postdelete/:key",function(req,res){
    console.log(req.params.key)
   postsModel.deleteOne({_id:req.params.key },function(err,data){
       if(!err)
       {
           //no action
           res.send({msg:"deletion successfull"})
       }
     
 })
})

app.put("/postupdate/:key",function(req,res){
  

    postsModel.findByIdAndUpdate(req.params.key,{tittle:req.body.tittle,likes:req.body.likes,dislikes:req.body.dislikes,Comments:req.body.Comments,postisc:req.body.postdisc,user:req.body.user},function(err,data){

        if(!err)
        {
          //noaction
          res.send({msg:"update successful"})
        }
        
    })
   
})

app.get("/advsdata",function(req,res){
    advsModel.find({},function(err,data){
        res.send(data)
    })
})




app.post("/addadvs",function(req,res){
    console.log("req.body",req.body)
    var advs=new advsModel(
        {
            productname:req.body.productname,
        productdisc:req.body.productdisc,
        price:req.body.price,
        
        }
    ) 
   advs.save(function(err,data)
    {
        if(!err)
        { console.log("doc created",data);
          res.send({msg:"success"})}
           
        
    })
})


 app.post("/register", async (req, res) => {
     console.log(req.body)
    var user=new usersModel(
        {
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        }
    ) 
   user.save(function(err,data)
    {
        if(!err)
        { console.log("doc created",data);}
        
        
    })
})


 app.listen(process.env.PORT||3000)
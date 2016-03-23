var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var seedDB     = require("./seeds");



 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelpcamp");
seedDB();

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
        
    });

});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image , description:description};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });

});
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          console.log(foundCampground);
          res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});
// =========================================
//COMMENTS
//==========================================

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground})
        }
    });

});

app.post("/campgrounds/:id/comments" , function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       }else{

          Comment.create(req.body.comment,function(err,comment){
             if(err){
                 console.log(err);
             } else {
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campgrounds/" + campground._id);
             }
          });
       }
   }) ;
});






app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started !!!");
});
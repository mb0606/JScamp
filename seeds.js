var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var data = [
    {
        name: "Clouds rust", 
        image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5115588.jpg",
        description: "Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus."
    },
    {
        name: "Otta", 
        image: "http://www.carabs.com/images/album/picts_05_09_on/051030_dscn1314.jpg",
        description: "Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus."
    },
    {
        name: "Canyon Floor", 
        image: "http://www.ozarktrailsrvpark.com/Campground/ozark_trails_campground.jpg",
        description: "Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus."
    },    
];

function seedDB(){
    // Remove all Campgrouds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds")
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   }else{
                       console.log(campground);
                       //create comment
                       Comment.create(
                           {
                               text: "This place is great I wish I was there",
                               author: "Homer"
                           },function(err,comment){
                               if(err){
                                   console.log(err);
                               }else{
                                   console.log(comment);
                                   campground.comments.push(comment);
                                   campground.save();
                               }
                           });
                   }
                }) ;
            });
        }
    });
    //add a few Campgrounds

}

module.exports = seedDB;
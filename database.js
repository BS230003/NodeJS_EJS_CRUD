// Interface to MongoDB

var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once ('open', function (){
    console.log ("mongoose db model opened ");
    /* define Schema
    var MarksSchema = mongoose.Schema({
        name: String,
        marks: Number,
        imgData :Buffer, // binary data
        imagePath: String,
        contentType:String,
        imgDataStr:String
    });        
    console.log("MongoDB module with Mongoose started.. "); */
    
});

module.exports = conn;


    //// IMAGE SAVE and RETRIEVE

    // var NewModel = mongoose.model('AddMarksImg', MarksSchema, 'students');
    // var tData = fs.readFileSync('./uploads/cat1.png' );
    // var tDataBuf = Buffer.from(tData).toString ('base64');

    // var objData = new NewModel ({
    //     name : 'Cat PNG3',
    //     marks : '12',
    //     imgData: tData, //fs.readFileSync('./uploads/cat2.png' ),
    //     imagePath: "./cat2.png",
    //     contentType: 'image/png',
    //     imgDataStr: tDataBuf
    // });

    //Image Created and Saved to Database mydb->students
    // NewModel.create(objData, async (err, item) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         await item.save();    
    //         console.log ("image saved... ", item);
    //     }
    // });

    // Make Image from data
    // Find the stored image in MongoDB, then save it in a folder
    // NewModel.findOne({name:'Cat PNG2'},  async (err, result) => {
    //     if (err) throw err;
    //     try{
    //         console.log ("Image is read ", result ); // result is array of object, use findOne for single object
    //         var buf = await result.imgData;
    //         fs.writeFileSync('./uploads/NewCat2.png', buf );
    //         console.log ("Image written to file " );
    //     }catch(e){
    //         console.log(e);
    //     }
    // });
    //         console.log ("Image is read" );

    ///////// ========== IMAGE SAVE AND RETRIVE WORKS !!! =====



    //objData.save (function (err, add) {
    //    if (err) return console.error(err);
    //    console.log(add.name + " saved to student collection with IMAGE WORKS !!!.");
    //}); 




    // compile schema to model
    //var NewObject = mongoose.model('AddMarks', MarksSchema, 'students');
    // a document instance
    //var book1 = new NewObject({ name: 'BSB', marks: 48});
 
    // save model to database
    // book1.save(function (err, added) {
    //   if (err) return console.error(err);
    //   console.log(added.name + " saved to student collection WORKS !!!.");
    // });

    //Delete from Model
    // NewObject.deleteOne({ name: 'BSB' }).then(function(data){
    //     console.log(" one deleted WORKS.. ", data.deletedCount ); // Success
    //  }).catch(function(error){
    //     console.log("failed to deleteOne", error); // Failure
    //  });


    //  NewObject.find ({},  function (err, posts) {
    //     posts.forEach(row => {
    //         console.log (" list of data ", row.name, row.marks);
    //     });
 
    // });
    //console.log("deleteOne over"); 

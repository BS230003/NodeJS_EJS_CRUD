
var mongoose = require('mongoose');
var fs = require('fs');
const { compile } = require('ejs');


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
    //console.log ("mongoose db model opened ");
    console.log("MongoDB module with Mongoose started.. "); 
    
});

//addNewRecord ('cat.png');
//updateRecord ('B Singh', 'bahadur.png');
readAllRecords ();

// Library Functons

  // Schema is needed for the definition of the collection in the data (Table Structure)
  var MarksSchema = mongoose.Schema({
    name: String,
    position: String,
    level : String,
    imgPath: String,
    contentType:String,
    imgDataStr:String
   });

function readAllRecords ()
{
    // Model is needed for the query of the database.
    var NewModel = mongoose.model('AddMarksImg', MarksSchema, 'records');

    NewModel.find ({},  async function (err, posts) {
        await posts.forEach(row => {
            console.log (" Record Read:  ", row.name, row.position, row.level);
        });
      conn.close (); 
      console.log ("Database closed after reading..");
    });
}

function addNewRecord (fname)
{
    console.log ("addNewRecird started..with  imageName " + fname);
   
    var NewModel = mongoose.model('AddMarksImg', MarksSchema, 'records');
    var tData =  fs.readFileSync('./uploads/' + fname );
    var tDataBuf =  Buffer.from(tData).toString ('base64');
    var objData = new NewModel ({
        name : 'Cat Image 2',
        position : 'Checking',
        level: "Cute",
        imgPath: "../" + fname,
        contentType: 'image/png',
        imgDataStr: tDataBuf
    });
    
    NewModel.create(objData, async (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            await item.save();    
            console.log ("image saved in DB... ", item.name);
        }
    });
}


function updateRecord (iName, fname)
{
    console.log ("updateRecord started.. of " + iName + " imageName=" + fname);
   
    var NewModel = mongoose.model('AddMarksImg', MarksSchema, 'records');
    var tData =  fs.readFileSync('./uploads/' + fname );
    var tDataBuf =  Buffer.from(tData).toString ('base64');
    // For update, model is needed, not the objct.
    // For saving object is needed of Model.
    NewModel.updateOne ({"name":iName}, {"imgDataStr": tDataBuf}).then ( result => 
        {
            console.log ("update is successful ", result);
        }
    );
    //conn.close ();
}

module.exports = conn;


    // // define Schema
    // var MarksSchema = mongoose.Schema({
    //     name: String,
    //     position: String,
    //     level : String,
    //     imgPath: String,
    //     contentType:String,
    //     imgDataStr:String
    // });
   
    //// IMAGE SAVE and RETRIEVE

    // var NewModel = mongoose.model('AddMarksImg', MarksSchema, 'records');
    // var tData = fs.readFileSync('./uploads/cat1.png' );
    // var tDataBuf = Buffer.from(tData).toString ('base64');
    // var objData = new NewModel ({
    //     name : 'Cat Image',
    //     position : 'Checking',
    //     level: "Entry",
    //     imgPath: "../cat1.png",
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
    //         console.log ("image saved in DB... ", item.name, db.connection);
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

    // Display in React embedded
    // <td><img src={`data:image/png;base64,${props.record.imgDataStr}`}></img> </td> 
    // Django
    // <td><img width = 100 height=80 src="data:image/png;base64,{{ stud['imgDataStr'] }}"/></td>
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

    //Delete from Model also UpdateOne need Model direct..
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
        
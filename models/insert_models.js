


var mongoose=require('mongoose');
var fs=require('fs');

var db = require('../database');
const { readAll } = require('../controllers/insert_controller');
// create an schema
var userSchema = new mongoose.Schema({
            name: String,
            marks: Number,
            imgData: Buffer,
            imagePath : String, 
            contentType:String,
            imgDataStr:String
        });

userTable=mongoose.model('users',userSchema, 'students');
        
module.exports={

      // small images less than 16 MB works OK.

     createData: async function(inputData, callback) {
           console.log ("create data in model ", inputData.name);        
           userData = new userTable(inputData);
           userData.contentType = "image/png"; // only PNG data
           userData.imagePath = inputData.imagePath; // get the filename
         
         //   try {
         //       var tData =  fs.readFileSync('./uploads/'+ userData.imagePath); // source directory
         //       var tDataBuf = Buffer.from(tData).toString ('base64');
         //       userData.imgData = tData; // small images less than 16 MB works OK.
         //       userData.imgDataStr = tDataBuf; // small images less than 16 MB works OK.
         //   } catch (error)
         //   {
         //    console.log ("file data read / write failed ? used update ");
         //   }

           userData.save(function(err, data){
           if (err) throw err;
           console.log ("create data in model written ?? ", data.name);     
           return callback(data);
        });
     },

     deleteData:function(inputData, callback) {
        console.log ("deleteData  in model ", inputData.name);          
        userData= new userTable(inputData);
        // model can delete data
        userTable.deleteOne({ name: userData.name }).then(function( data){
              console.log("one  deleteOne WORKS ?? .. ", data  ); // Success
              //return callback();
              return readAll;
           }).catch(function(error){
              console.log("failed to deleteOne", error); // Failure
           });
     },

     updateData:function(inputData, callback) {
      console.log ("models: updateData  in model name=", inputData.name);      // name of file read     
      userData = new userTable(inputData);
      userData.imagePath = inputData.imagePath;
      userData.imgDataStr = inputData.fileData;
      // model can delete data
      //userTable.updateOne({ name: userData.name }, {imgDataStr:userData.fileData}).then(function( data){
         
         userTable.updateOne ({ "name": userData.name }, 
                {'imgDataStr':userData.imgDataStr}).then(function( data){
            console.log("models: one updateOne imageData WORKED ? .. ", data.modifiedCount > 0 ? " YES " : " NO "  ); // Success
         
            return readAll;
         }).catch(function(error){
            console.log("failed to updateOne", error); // Failure
         });

         userTable.updateOne ({ "name": userData.name }, 
                {'imagePath':userData.imagePath}).then(function( data){
            console.log("models: one updateOne imagePATH WORKED ? .. ", data.modifiedCount > 0 ? " YES " : " NO "  ); // Success
         
            return readAll;
         }).catch(function(error){
            console.log("failed to updateOne", error); // Failure
         });
   },

     readAll:function(inputData, callback) {

      console.log ("read  from model now");       
      // model can delete data
      userTable.find ({},  function (err, list) {
         list.forEach(row => {
             //row.imgData = Buffer.from(row.imgData ).toString('base64') ; 
             //console.log (" => read  list of MongoDB ", row.name, row.marks, row.imagePath);
         });
         console.log (" => model read list of items from MongoDB ", list.length);
         
         return callback(list);
      });

   }

}

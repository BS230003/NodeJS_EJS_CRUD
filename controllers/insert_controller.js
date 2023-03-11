
const fs = require ("fs");
const formidable = require ("formidable"); // file upload component
const path = require("path");

var insertModel= require('../models/insert_models');
module.exports={
    userForm:function(req,res){
         res.render('user-form')
    },

    createData: function(req, res) {
         var inputData = req.body;
         console.log (" new controller create data ", inputData.name);
         
         const form = new formidable.IncomingForm ();
         form.parse (req, async function (err, fields, files) {
            // got the file from brower form and now available in temp dir. will be written to new dir
            var oldPath = files.readfile.filepath;
            var newPath = path.join(__dirname, '../uploads') + '/' + files.readfile.originalFilename;
            var rawData =  fs.readFileSync(oldPath);
            fs.writeFile (newPath, rawData, async function (err) {
               if (err) console.log ("error writing file ", err.message);
               else 
                   console.log ("new file written successfully.. ", newPath, fields);
            });
            //console.log (newPath);
            //console.log ("old => " + oldPath);
            
            // take raw data and put into MongoDB using base64 encoding
            var tDataBuf = await Buffer.from(rawData).toString ('base64');
            inputData.imgDataStr = tDataBuf;
            inputData.name = fields.name; // name in the text box
            inputData.imagePath = files.readfile.originalFilename; // file name
         
 
            // now insert to DB
            insertModel.createData(inputData,  async function(data){
               await res.render('user-form')
               console.log(" record was created in controller ", data.name);
            });

         });
    },

    deleteData:function(req, res){
        var inputData= req.body;
        console.log(" record was deleted in controller ", inputData);
        
        insertModel.deleteData(inputData, function(data){
           res.render('user-form')          
        });
    },

   // Get image from client and saves to uploads folder.
   updateData:function(req, res){
      var inputData= req.body;
      console.log ("controller : input data=" , inputData.name);

      const form = new formidable.IncomingForm ();
      form.parse (req, async function (err, fields, files) {
         // got the file from brower form and now available in temp dir. will be written to new dir
         //console.log (form);
         var oldPath = files.readfile.filepath;
         var newPath = path.join(__dirname, '../uploads') + '/' + files.readfile.originalFilename;
         var rawData = await fs.readFileSync(oldPath);
         fs.writeFile (newPath, rawData, function (err) {
            if (err) console.log ("error writing file ", err.message);
            else console.log ("file written successfully.. ", newPath, fields);
         });
         //console.log (newPath);
         //console.log ("old => " + oldPath);
         
         // take raw data and put into MongoDB using base64 encoding
         var tDataBuf = Buffer.from(rawData).toString ('base64');
         inputData.fileData = tDataBuf;
         inputData.name = fields.name; // name in the text box
         inputData.imagePath = files.readfile.originalFilename; // file name
         insertModel.updateData(inputData, function(data) {
            res.render('user-form')
            console.log(" record was updated in controller ", data);
         });

      });
   },

      // Get image from client and saves to uploads folder.
   uploadFile:function(req, res){
         var inputData= req.body;
         console.log ("controller : uploadFile input data=" , inputData);
   
         const form = new formidable.IncomingForm ();
         form.parse (req, async function (err, fields, files) {
            // got the file from brower form and now available in temp dir. will be written to new dir
            console.log (files);

            let oldPath = files.readfile.filepath; // this is native raw file
            console.log (" old Path " , oldPath);
            let newPath = path.join(__dirname, '../uploads') + '/' + files.readfile.originalFilename;
            var rawData = await fs.readFileSync(oldPath);

            fs.writeFile (newPath, rawData, function (err) {
               if (err) console.log ("error writing file ", err.message);
               else console.log ("file written successfully.. ", newPath, fields);
            });
            console.log ("newpath" , newPath);
            
            return res.status (200).json ({state: 'uploaded ' + newPath});   

            // take raw data and put into MongoDB using base64 encoding
            // var tDataBuf = Buffer.from(rawData).toString ('base64');
            // inputData.fileData = tDataBuf;
            // inputData.name = fields.name; // name in the text box
            // inputData.imagePath = files.readfile.originalFilename; // file name
            // insertModel.updateData(inputData, function(data) {
            //    res.render('user-form')
            //    console.log(" record was updated in controller ", data);
            // });
   
         });
   },
      

   readAll:function(req, res){
      var inputData= req.body;
      insertModel.readAll(inputData, function(list){
         res.render('user-form', {listItems:list})
         console.log(" records read in controller and passed to express ejs ");
      });
   }

}

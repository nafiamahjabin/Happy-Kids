var multer = require('multer');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

const initUploadImage = (app) => {
    app.post('/upload-image', (req, res) => {
        console.log(req.body);
        upload(req,res,function(err){
            if(err){
                return res.status(501).json({error:err});
            }
            //do all database record saving activity
            return res.json({originalname:req.file.originalname, uploadname:req.file.filename, message:"uploaded"});
        });
    
    });
};

module.exports = initUploadImage;
import multer from "multer";
import path from "path";
import fs from 'fs'
const uploadDir = path.join(__dirname,'../uploads')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`);
}
})

const upload = multer({
    storage,
    limits:{fileSize: 5 * 1024 * 1024 } , //5MB
    fileFilter:(req,file,cb)=>{
        const fileTypes =  /jpeg|jpg|png/i;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype =  fileTypes.test(file.mimetype)
        if (extname && mimetype) {
        return cb(null, true);
    }
        cb(new Error('Only JPEG and PNG images are allowed'));
    }
}).fields([
  { name: 'frontImage', maxCount: 1 },
  { name: 'backImage', maxCount: 1 },
]);

export default upload
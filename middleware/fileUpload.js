const multer = require("multer");
const uuid = require("uuid/v1");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}

const fileUpload = multer({
    limits: 500000, // the unit is kb
    storage: multer.diskStorage({
        destination: (req,file,callback)=>{
            callback(null,"uploads/images")
        },
        filename: (req,file,callback)=>{
            const extension = MIME_TYPE_MAP[file.mimetype];
            callback(null,uuid() + "." + extension);
        }
    }),
    fileFilter: (req,file,callback)=>{
        const isValid = !!MIME_TYPE_MAP[file.mimetype] // "!!" the sign converts isValid to true or false if its recognize the mime type.
        let error = isValid ? null : new Error("Invalid MIME_TYPE")
        callback(error,isValid)
    }
})


module.exports = fileUpload
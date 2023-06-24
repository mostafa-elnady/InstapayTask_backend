const multer = require("multer");
const aws = require("aws-sdk"),
      {
        S3
      } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

// const { Settings } = require("../models/settings");

aws.config.update({
  secretAccessKey: "IiZBROeWeAzQ6TurDgX8O+/CxaUfKKSBcvmTqVQK",
  accessKeyId: "AKIA2ZRVPCLBPM2TVFPO",
  region: "eu-west-1",
});

let s3 = new S3();


const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const uploadbasicMulter = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error("invalid image type");
      if (isValid) uploadError = null;

      cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
});

const uploadS3Multer = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "mega-store/shelly",
    key: function (req, file, cb) {
      // console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

//console.log(process.env.uploadS3)


const postImageLocatianSpecify = (req) => {
  const fileName = req.file ? req.file.filename : '';
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  if (type == 's3') {
    return req.file.location
  } else {
    return `${basePath}${fileName}`
  }
}



const postMultiImagesLocatianSpecify = (req) => {


  const files = req.files;
  let imagesPaths = [];
  const basePathes = `${req.protocol}://${req.get("host")}/public/uploads/`;

  if (files) {
    if (type == 's3') {
      files.map((file) => {
        // console.log(file);
        imagesPaths.push(file.location);
      });
      return imagesPaths

    } else {
      files.map((file) => {
        // console.log(file);
        imagesPaths.push(`${basePathes}${file.filename}`);
      });
      return imagesPaths
    }

  }
}





let whichUpload = process.env.uploadS3 == 'true' ? uploadS3Multer : uploadbasicMulter;
let type = process.env.uploadS3 == 'true' ? 's3' : 'basic';


module.exports.type = type
module.exports.whichUpload = whichUpload
module.exports.postImageLocatianSpecify = postImageLocatianSpecify
module.exports.postMultiImagesLocatianSpecify = postMultiImagesLocatianSpecify



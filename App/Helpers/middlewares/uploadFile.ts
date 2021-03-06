import config from "config";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = config.get("storage.path");
    const folderName = config.get("storage.folderName");
    const albumFolder = req.body.folder ? req.body.folder : "";
    const uploadPath = `${path}/${folderName}/${albumFolder}`;

    if(uploadPath) {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().getTime();
    const extension = path.extname(file.originalname);
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}_${timestamp}${extension}`;

    cb(null, fileName);
  },
});

const uploadFile = multer({ storage: storage });

export default uploadFile;

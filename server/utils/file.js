const fs = require("fs");

exports.deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      console.log("delete file error", err);
    }
  });
};

const imageMaxSize = 100000000; // bytes
export const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

export const verifyFile = file => {
  if (file) {
    const currentFile = file;
    const currentFileType = currentFile.type;
    const currentFileSize = currentFile.size;
    if (currentFileSize > imageMaxSize) {
      return {
        result: false,
        message: "The filesize is too large!"
      };
    }
    if (!acceptedFileTypesArray.includes(currentFileType)) {
      return {
        result: false,
        message: "This file is not allowed only images are allowed!"
      };
    }
    return {
      result: true,
      message: ""
    };
  }
};

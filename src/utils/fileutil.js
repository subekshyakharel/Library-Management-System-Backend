import { unlink } from "fs";
import { resolve } from "path";

// actually delets the file
export const deleteFile = (filePath) => {
  try {
    unlink(resolve(filePath), () => {
      console.log(filePath, "has been deleted");
    });
  } catch (error) {
    console.log(error);
  }
};

// is is single file or array of files to be deleted
export const deleteUploadedFiles = (req) => {
  //single file
  if (req.file) {
    deleteFile(req.file.path);
    return;
  }

  if (req.files) {
    req.files.map((f) => deleteFile(f.path));
  }
};

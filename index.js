const fs = require("fs");
const path = require("path");
const express = require("express");

const folderName = "./timeStampFiles";

// creates specified folder if does not exist
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.log(err);
}

// the function writes a .txt file in the specified path
const writeFile = () => {
  const now = Date.now();
  const today = new Date(now);
  const timeStamp = today.toTimeString();
  const dateTime = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}-${timeStamp.split(" ")[0]}`;

  const path = `${folderName}/${dateTime}.txt`;

  fs.writeFile(path, timeStamp, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
    }
  });

  return path;
};

// initialize the webserver
const app = express();
const PORT = 4000;

// root
app.get("/", (req, res) => {
  const msg = {
    message: "welcome to timestamped file creation",
  };

  res.send(msg);
});

// routes for writing file
app.get("/filecreate", (req, res) => {
  const filePath = writeFile();
  const fileName = path.basename(filePath);
  res.statusCode = 201;
  res.send({ message: `${fileName} file created successfully!` });
});

// routes for read directory where all files stored
app.get("/readfiledir", (req, res) => {
  const fileArry = fs.readdirSync(folderName);

  const newAray = [];

  fileArry.forEach((file) => {
    newAray.push({ id: newAray.length + 1, fname: file });
  });

  res.send({ files: newAray });
});

// web server listens at the given port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

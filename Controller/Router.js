const express = require("express");
const router = express.Router();
const studentModel = require("../Model/Model");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

cloudinary.config({
  cloud_name: "dwrv91969",
  api_key: "871341554644239",
  api_secret: "Mt_S1riHhh5g9plWHVdpiHyyv58",
});

const upload = multer({ storage: storage }).single("imageAvatar");

router.post("/", upload, async (req, res) => {
  try {
    const cloudImage = await cloudinary.uploader.upload(req.file.path);
    console.log(cloudImage);
    const postData = await studentModel.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      imageAvatar: cloudImage.secure_url,
      date: Date.now(),
    });

    res.status(200).json({
      message: "Data uploaded sucessfully",
      data: postData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to post data",
      data: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const getAllData = await studentModel.find();
    res.status(200).json({
      message: "Hear are your Data",
      data: getAllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to get Data",
      data: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteData = await studentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Sucessfully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to delete",
      data: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getDataByID = await studentModel.findById(req.params.id);
    res.status(200).json({
      message: `${req.params.id} Gotten Sucessfully`,
      data: getDataByID,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to geta ID",
      data: error.message,
    });
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const editData = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Update Sucessfull",
      data: editData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Update Unsucessfull",
      data: error.message,
    });
  }
});

module.exports = router;

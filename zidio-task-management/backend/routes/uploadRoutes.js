const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", 
        format: async () => "jpg", 
        public_id: (req, file) => file.originalname.split(".")[0],
    },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
    res.json({ imageUrl: req.file.path }); 
});

module.exports = router;

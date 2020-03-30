const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isHost = require("../middlewares/isHost");
const upload = require("../utils/multerConfig");
const rentalController = require("../controllers/rentals");

router.get("/", [auth, isHost], rentalController.getRentals);

router.get("/me", auth, async (req, res) => {
  res.send("Hi there!");
});

router.post(
  "/",
  [auth, isHost],
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1
    },
    {
      name: "subImages",
      maxCount: 3
    }
  ]),
  rentalController.createRental
);

router.put(
  "/:id",
  [auth, isHost],
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1
    },
    {
      name: "subImages",
      maxCount: 3
    }
  ]),
  rentalController.updateRental
);

router.delete("/:id", [auth, isHost], rentalController.deleteRental);

router.post("/search", rentalController.searchRentals);

module.exports = router;

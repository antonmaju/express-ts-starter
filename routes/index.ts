import * as express from "express";
let router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About Us" });
});

export = router;
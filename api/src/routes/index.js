const { Router } = require("express");
const { Games } = require("./games/games");

const VGRouter = Router();

VGRouter.use("/videogames", Games);

module.exports = VGRouter;

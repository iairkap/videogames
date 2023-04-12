const { Router } = require("express");
const videoGamesRoutes = require("./VideoGamesRoutes.js");
const genreRoutes = require("./genresRoutes.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.get;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRoutes);
router.use("/genres", genreRoutes);

module.exports = router;

require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); // esta parte de codigo sirve para que se conecte a la base de datos
const basename = path.basename(__filename);

const modelDefiners = []; // esta parte de codigo me sirve para que guarde los modelos en un arreglo

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  ) // esta parte de codigo sirve para que solo se lea los archivos .js
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  }); // esta pare de codigo sirve para que se lea el archivo y se guarde en el arreglo modelDefiners

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame } = sequelize.models;
const { Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op, // para importart la conexión { conn } = require('./db.js');
}; // esta parte de codigo me sirve para que se exporte el modelo y la conexion

require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const databaseHelper = require("./helpers/database");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    databaseHelper.connect();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(authRoutes);
    this.express.use(userRoutes);
  }
}

module.exports = new App().express;

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dbConfig = require("./app/config/db.config");

// const db = require("./app/models");
// const Role = db.role;

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// const uri = `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@rentalrooms.bfidj.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`;

// // TODO : Connection Database <MongoDB>
// db.mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });

// // TODO : create role in database
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       const role = ["master", "admin", "user"];

//       role.map((role, index) => {
//         new Role({
//           name: role,
//         }).save((err) => {
//           if (err) {
//             console.log("error", err);
//           }

//           console.log(`added ${role} to roles collection`);
//         });
//       });
//     }
//   });
// }

// // TODO : connect route
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

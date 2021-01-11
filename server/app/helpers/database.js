const mongoose = require("mongoose");
const db = require("../models/index");

const dbConfig = require("../config/db.config");

const Role = db.role;
const listRole = db.ROLES;
//mongodb+srv://TungAo:<password>@rentalrooms.bfidj.mongodb.net/test
const uri = `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@rentalrooms.bfidj.mongodb.net/${dbConfig.DB}`;

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
      })
      .catch((err) => {
        console.error("Connection error", err);
        process.exit();
      });
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

// TODO : create role in database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      listRole.map((role, index) => {
        new Role({
          role_no: index,
          name: role,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log(`added ${role} to roles collection`);
        });
      });
    }
  });
}

module.exports = {
  connect,
  truncate,
  disconnect,
};

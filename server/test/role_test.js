// // import mongoose from mongoose package assign to variable mongoose
// const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
// const dbConfig = require("../app/config/db.config");
// const Role = require("../app/models/role.model.js");
// // const db = require("../app/models");

// describe("insert", () => {
//   let db;
//   const uri = `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@rentalrooms.bfidj.mongodb.net/`;
//   const options = { useNewUrlParser: true, useUnifiedTopology: true };

//   beforeAll(async () => {
//     const client = new MongoClient(uri, options);
//     await client.connect();
//     db = await client.db(dbConfig.DB);
//   });

//   afterAll(async () => {
//     db.collection("roles").drop(async () => {
//       await connection.close();
//       await db.close();
//     });
//   });

//   it("should insert a doc into collection", async () => {
//     const roles = db.collection("roles");
//     const mockUser = { _id: "some-user-id", username: "John" };
//     await roles.insertOne(mockUser);

//     const insertedUser = await roles.findOne({ _id: "some-user-id" });
//     expect(insertedUser).toEqual(mockUser);
//   });

//   it("should update a doc into collection", async () => {
//     const roles = db.collection("roles");
//     const mockUser = { _id: "some-user-id", username: "TungAo" };
//     await roles.updateOne({ _id: "some-user-id" }, { $set: mockUser });

//     const insertedUser = await roles.findOne({ _id: "some-user-id" });
//     expect(insertedUser).toEqual(mockUser);
//   });

//   it("should delete a doc into collection", async () => {
//     const roles = db.collection("roles");
//     const mockUser = { _id: "some-user-id" };
//     await roles.deleteOne(mockUser);

//     const insertedUser = await roles.findOne({ _id: "some-user-id" });
//     expect(insertedUser).not.toEqual(mockUser);
//   });
// });

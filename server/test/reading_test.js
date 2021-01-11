const assert = require("assert");
const User = require("../app/models/user.model.js");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      username: "Joe",
    });
    joe.save().then(() => {
      done();
    });
  });

  test("finds all users with a name of joe", (done) => {
    User.find({ username: "Joe" }).then((users) => {
      // users[0]._id not just string it's a object id
      assert(users[0]._id.toString() === joe.id.toString());
      done();
    });
  });

  test("find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.username === "Joe");
      done();
    });
  });
});

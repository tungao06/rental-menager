const assert = require("assert");
const User = require("../app/models/user.model.js");

describe("Deleting a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ username: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("model instance remove", (done) => {
    joe
      .remove()
      .then(() => {
        return User.findOne({ username: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  test("class method remove", (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteOne({ username: "Joe" })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  test("class method findOneAndRemove", (done) => {
    User.findOneAndDelete({ username: "Joe" })
      .then(() => {
        return User.findOne({ username: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  test("class method findByIdAndRemove", (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => {
        return User.findOne({ username: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});

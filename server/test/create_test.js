const assert = require("assert");
const User = require("../app/models/user.model.js");

describe("Creating records", () => {
  it("should insert a doc into collection", async () => {
    const users = User;

    const mockUser = { _id: "some-user-id", username: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });

  test("saves a user", (done) => {
    // create new instant
    const joe = new User({
      username: "Joe",
    });
    joe.save().then((result) => {
      console.log("result :>> ", result);
      // Have joe been save successfully?
      expect(!joe.isNew);
      done();
    });
  });
});

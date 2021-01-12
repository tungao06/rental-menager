const supertest = require("supertest");
const app = require("../../app");

const UserModel = require("../../app/models/user.model");

const request = supertest(app);

describe("User", () => {
  it("should be able to create user", async () => {
    const response = await request.post("/signup").send({
      username: "userName",
      email: "useremail@email.com",
      password: "123123",
      phone: "0123456789",
      roles: "user",
    });

    expect(response.status).toBe(200);
  });

  it("should be able to delete user", async () => {
    const user = new UserModel({
      username: "existsUserName",
      email: "existsUseremail@email.com",
      password: "123123",
      phone: "0123456789",
    });

    await user.save();

    const response = await request.delete("/users").send({
      id: user._id,
    });

    expect(response.status).toBe(200);
  });
});

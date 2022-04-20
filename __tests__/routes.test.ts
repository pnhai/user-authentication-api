import request from "supertest";

import app from "../src/app";

describe("Test app", () => {
  test("home route", async () => {
    const res: any = await request(app).get("/");

    expect(res.text).toEqual("API server is running");
  });

  test("login success", async () => {
    const body = {
      username: "123456",
      password: "123456",
    };

    const res: any = await request(app)
      .post("/auth/login")
      .set("Content-type", "application/json")
      .send(body);
    expect(res.status).toEqual(200);
  });

  test("login fail", async () => {
    const body = {
      username: "",
      password: "",
    };

    const res: any = await request(app)
      .post("/auth/login")
      .set("Content-type", "application/json")
      .send(body);
    expect(res.status).toEqual(400);
  });
});

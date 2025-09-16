import request from "supertest";
import app from "../src/app";
import { expect, describe, it, beforeAll } from "@jest/globals";

let accessToken: string;
let refreshToken: string;
let testUserId: string;

const BASE_PATH = "/api/v1";

describe("App routes", () => {
  it("GET /health returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Auth API", () => {
  const userData = {
    name: "Test User",
    email: "testuser@gmail.com",
    password: "password123",
  };

  it("POST /api/v1/auth/register should register a new user", async () => {
    const res = await request(app)
      .post(`${BASE_PATH}/auth/register`)
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("user");
    testUserId = res.body.user._id;
  });

  it("POST /api/v1/auth/login should login user and set cookies", async () => {
    const res = await request(app)
      .post(`${BASE_PATH}/auth/login`)
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User login successfully");
    expect(res.headers["set-cookie"]).toBeDefined();

    // Save cookies (tokens)
    const cookies = res.headers["set-cookie"];
    accessToken = cookies ? cookies[0] : "";
    refreshToken = cookies ? cookies[1] : "";
  });

  it("GET /api/v1/auth/refresh should refresh access token", async () => {
    const res = await request(app)
      .get(`${BASE_PATH}/auth/refresh`)
      .set("Cookie", refreshToken);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Refresh access token successfully"
    );
  });

  it("POST /api/v1/auth/password/forgot should send reset email", async () => {
    const res = await request(app)
      .post(`${BASE_PATH}/auth/password/forgot`)
      .send({ email: userData.email });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Password reset email sent");
  });

  it("POST /api/v1/auth/logout should logout user", async () => {
    const res = await request(app)
      .post(`${BASE_PATH}/auth/logout`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User logout successfully");
  });
});

describe("User API", () => {
  beforeAll(async () => {
    // login again to get fresh token for protected routes
    const res = await request(app).post(`${BASE_PATH}/auth/login`).send({
      email: "testuser@gmail.com",
      password: "password123",
    });
    const cookies = res.headers["set-cookie"];
    accessToken = cookies ? cookies[0] : "";
  });

  it("GET /api/v1/users/me should return current user", async () => {
    const res = await request(app)
      .get(`${BASE_PATH}/users/me`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("testuser@gmail.com");
  });

  it("GET /api/v1/users/:id should return user profile", async () => {
    const res = await request(app)
      .get(`${BASE_PATH}/users/${testUserId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user._id).toBe(testUserId);
  });

  it("PUT /api/v1/users/profile should update user profile", async () => {
    const res = await request(app)
      .put(`${BASE_PATH}/users/profile`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ name: "Updated Name" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "User profile updated successfully"
    );
    expect(res.body.user.name).toBe("Updated Name");
  });
});

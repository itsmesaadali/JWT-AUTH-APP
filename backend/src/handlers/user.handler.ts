import { Request, Response } from "express";
import { pool } from "../mysql/connection";
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from "../mysql/queries";
import { INSERT_USER_STATEMENT } from "../mysql/mutations";
import bcrypt from "bcrypt";
import { generateToken, saveRefreshToken } from "../token/token.manager";
import { encryptData } from "../encryption";

const getUserBy = async (by: "email" | "id", value: string) => {
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      by === "email" ? GET_USER_BY_EMAIL : GET_USER_BY_ID,
      [value]
    );
    console.log("User retrieved", result[0]);
    // @ts-ignore

    const user = result[0][0];
    return user;
  } catch (error) {
    console.log("Get user error", error);
    throw error;
  }
};

const setCookies = (
  accessToken: string,
  refreshToken: string,
  res: Response
) => {
  res.clearCookie("access_token", {
    domain: "localhost",
    httpOnly: true,
    path: "/",
  });

  res.clearCookie("refresh_token", {
    domain: "localhost",
    httpOnly: true,
    path: "/",
  });

  const expiryAccessToken = new Date(new Date().getTime() + 60 * 60 * 1000);
  const expiryRefreshToken = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  res.cookie('access_token', accessToken, {
    domain:'localhost',
    httpOnly:true,
    path:'/',
    expires:expiryAccessToken,
    sameSite:'lax'
  })

  res.cookie('refresh_token', refreshToken, {
    domain:'localhost',
    httpOnly:true,
    path:'/',
    expires:expiryRefreshToken,
    sameSite:'lax'
  })

  return;
};

const setAuthTokens = async (id: string, email: string, res: Response) => {
  try {
    const accessToken = generateToken(id, email, "access");
    const refreshToken = generateToken(id, email, "refresh");
    const encryptedToken = encryptData(refreshToken);
    await saveRefreshToken(refreshToken, encryptedToken);
    setCookies(accessToken, encryptedToken, res)
  } catch (error) {
    console.log('Error while seting auth token ');
    throw error;
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid user id " });
    }

    const user = await getUserBy("id", id);
    if (!user) {
      console.log("User not found");

      return res.status(401).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user retrieved", user: user });
  } catch (error) {
    console.log("Get user error", error);
    return res.status(500).json({ message: "Unexpected error" });
    throw error;
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ message: "Data missing" });
    }

    const user = await getUserBy("email", email);
    if (user) {
      console.log("User alredy exsists", user);

      return res
        .status(401)
        .json({ message: `user already exists with id :${user.id}` });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    const result = await conn.query(INSERT_USER_STATEMENT, [
      name,
      email,
      hashPassword,
    ]);
    console.log("User inserted", result[0]);
    // await setAuthTokens(String(result.insertId),email, res )
    return res.status(200).json({ message: "user inserted", user: result[0] });
  } catch (error) {
    console.log("Get user error", error);
    return res.status(500).json({ message: "Unexpected error" });
    throw error;
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Data missing" });
    }

    const user = await getUserBy("email", email);
    if (!user) {
      console.log("User not found");

      return res.status(401).json({ message: "user not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // set token
    await setAuthTokens(String(user.id),email, res )

    return res.status(200).json({ message: "user detailed", user: user });
  } catch (error) {
    console.log("Get user error", error);
    return res.status(500).json({ message: "Unexpected error" });
    throw error;
  }
};

export { getUser, registerUser, loginUser };

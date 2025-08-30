import { Request, Response } from "express";
import { pool } from "../mysql/connection";
import { GET_USER_BY_ID } from "../mysql/queries";
import { INSERT_USER_STATEMENT } from "../mysql/mutations";

const getUser = async(req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid user id " });
    }
    

    const conn = await pool.getConnection();
    const result = await conn.query(GET_USER_BY_ID, [id]);
    console.log('User retrieved', result[0])
    return res.status(200).json({ message: "user retrieved", user:result[0] });
    
  } catch (error) {
    console.log('Get user error', error)
    return res.status(500).json({ message: "Unexpected error" });
    throw error;
  }
};


const createUser = async(req: Request, res: Response) => {
  try {

    const {name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(422).json({ message: "Data missing" });

    }
    
    const conn = await pool.getConnection();
    const result = await conn.query(INSERT_USER_STATEMENT, [name, email, password]);
    console.log('User inserted', result[0])
    return res.status(200).json({ message: "user inserted", user:result[0] });
    
  } catch (error) {
    console.log('Get user error', error)
    return res.status(500).json({ message: "Unexpected error" });
    throw error;
  }
};

export { getUser, createUser };

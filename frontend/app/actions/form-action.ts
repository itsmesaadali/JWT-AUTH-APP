"use server";

import axios from "axios";

import { LoginFromSchema, SignUpFromSchema } from "../lib/definitions";
import setCookieParser from 'set-cookie-parser'
import { cookies } from "next/headers";

export const loginAction = async(prevState:unknown, formData:FormData) => {
  console.log(prevState)

  const validateFileds = LoginFromSchema.safeParse({
    email:formData.get('email'),
    password:formData.get('password'),

  })  

  console.log('Fileds Validate');

  if(!validateFileds.success) {
    return { errors: validateFileds.error.flatten().fieldErrors};
  }

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const res= await axios.post('/user/login',{email, password});
    const data = await res.data;
    const cookieStore = await cookies()
    const cookieData = setCookieParser(res.headers['set-cookie']!) 

    cookieData.forEach((cookie) => 
      // @ts-ignore
      cookieStore.set(cookie.name,cookie.value, {...cookie}))
    return data;
  } catch (error) {
    console.log('Error occur login',error)
    throw error
  }
  
};


export const signupAction = async(prevState:unknown, formData:FormData) => {
  console.log(prevState)

  const validateFileds = SignUpFromSchema.safeParse({
    name:formData.get('name'),
    email:formData.get('email'),
    password:formData.get('password'),

  })  

  console.log('Fileds Validate');

  if(!validateFileds.success) {
    return { errors: validateFileds.error.flatten().fieldErrors};
  }

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const res= await axios.post('/user/register',{name ,email, password});
    const data = await res.data;
    return data;
  } catch (error) {
    console.log('Error occur login',error)
    throw error
  }
  
};
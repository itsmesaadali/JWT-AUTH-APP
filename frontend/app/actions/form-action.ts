"use server";

import { LoginFromSchema } from "../lib/definitions";

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
  return { message: 'Success'}
};

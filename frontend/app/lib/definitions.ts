import z from "zod";

const SignUpFromSchema = z.object({
    name:z.string().trim().min(4,{message:'name must be 4 character long'}),
    email:z.string().trim().email({message:'please enter valid email'}),
    password:z.string().trim().min(6,{message:'password must be 6 number long'})
})


const LoginFromSchema = z.object({
    email:z.string().trim().email({message:'please enter valid email'}),
    password:z.string().trim().min(6,{message:'password must be 6 number long'})
})



export { SignUpFromSchema, LoginFromSchema}
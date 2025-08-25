import mongoose from "mongoose";
import { hashPassword, comparePassword } from "@/utils/bcrypt";


export interface IUser extends mongoose.Document {
    username:string;
    email:string;
    password:string;
    refreshToken?:string;
    createdAt:Date;
    updatedAt:Date;
    comparePassword(candidatePassword:string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String,
}, {
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    try {
        this.password = await hashPassword(this.password);
        next()
    } catch (error:any) {
        next(error as Error)
    }
}) 

userSchema.methods.comparePassword = async function(candidatePassword:string): Promise<boolean> {
    return comparePassword(candidatePassword, this.password);
}

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default UserModel;

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error:any) {
        next(error)
    }
}) 

userSchema.methods.comparePassword = async function(candidatePassword:string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;

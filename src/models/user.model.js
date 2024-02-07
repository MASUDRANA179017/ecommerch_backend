import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,

        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            requred: true,
            unique: true
        },
        addressOne: {
            type: String,
            required: true,
        },
        addressTwo: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            required: true,
        },
        postCode: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
      this.password =  await bcrypt.hash(this.password, 10);
        next();

});


userSchema.methods.isPasswordCarect = async function(password){
    bcrypt.compare(password, this.password, (err, result)=>{return result});
}


userSchema.methods.generateAccessToken = async function (){
    await jwt.sign({
        _id: this._id,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}
userSchema.methods.generateAccessRefresh = async function (){
    await jwt.sign({
        _id: this._id,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}





export const User = mongoose.model("User", userSchema)
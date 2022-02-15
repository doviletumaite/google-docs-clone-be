import mongoose from "mongoose";

const {Schema, model} = mongoose


const userSchema = new Schema(
    {
    name: {type: String},  
    },
    {
        timestamps: true
    }
)

export default model("user",userSchema)
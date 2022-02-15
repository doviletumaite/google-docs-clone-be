import mongoose from "mongoose";

const {Schema, model} = mongoose


const userSchema = new Schema(
    {
    name: {type: String},  
    documents: {type: mongoose.Schema.Types.ObjectId, ref: "document" }
    },
    {
        timestamps: true
    }
)

export default model("user",userSchema)
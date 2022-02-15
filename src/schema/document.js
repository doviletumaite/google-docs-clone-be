import mongoose from "mongoose";

const {Schema, model} = mongoose


const documentSchema = new Schema(
    {
    data: {type: Object},  
    author: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    },
    {
        timestamps: true
    }
)

export default model("document",documentSchema)
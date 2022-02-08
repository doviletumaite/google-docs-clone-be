import mongoose from "mongoose";

const {Schema, model} = mongoose


const documentSchema = new Schema(
    {
    data: {type: Object},  
    },
    {
        timestamps: true
    }
)

export default model("document",documentSchema)
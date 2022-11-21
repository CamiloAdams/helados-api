import { Schema, model } from "mongoose";

const icreCreamSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        imgURL: String,
        stock: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("IceCream", icreCreamSchema);

import { Schema, model } from "mongoose";

const billSchema = new Schema(
    {
        id_usuario: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        items: [
            {
                type: Map,
            },
        ],
        total: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Bill", billSchema);

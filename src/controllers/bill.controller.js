import Bill from "../models/Bill";
import IceCream from "../models/IceCream";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const createBill = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const { items, total } = req.body;

        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) return res.status(404).json({ message: "No user found" });

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            console.log(element);
            const icecream = await IceCream.findById(element.item);

            if (!icecream)
                return res.status(404).json({ message: "No ice cream found" });
        }
        if (parseFloat(total) > user.balance) {
            res.status(401).json({ message: "insufficient balance" });
        } else {
            const newBill = new Bill({
                id_usuario: decoded.id,
                items,
                total,
            });

            const updatedUser = await User.findByIdAndUpdate(
                decoded.id,
                {
                    balance: user.balance - total,
                    spent_balance: user.spent_balance + parseFloat(total),
                },
                { new: true }
            );
            console.log(updatedUser);
            const billSaved = await newBill.save();

            res.status(201).json(billSaved);
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unautorized" });
    }
};

export const getBills = async (req, res) => {
    const bills = await Bill.find().populate("id_usuario");
    res.json(bills);
};

export const getBill = async (req, res) => {
    await Bill.findById(req.params.billId, function (err, data) {
        if (!err) {
            res.status(200).json(data);
        } else {
            console.error;
            res.status(500).json("An error has ocurred");
        }
    })
        .clone()
        .catch(function (err) {
            console.log("An error has ocurred");
        });
};

export const updateBillById = async (req, res) => {
    const updatedBill = await Bill.findByIdAndUpdate(
        req.params.billId,
        req.body
    );
    res.status(200).json(updatedBill);
};

export const deleteBillById = async (req, res) => {
    const { billId } = req.params;
    await Bill.findByIdAndDelete(billId);
    res.status(204).json();
};

import User from "../models/User";
import IceCream from "../models/IceCream";
import Bill from "../models/Bill";
import jwt from "jsonwebtoken";
import config from "../config";

export const getUserStats = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        });

        res.status(201).json({
            balance: user.balance,
            spent_balance: user.spent_balance,
            bought_ice_creams: await getBoughtIceCreams(user._id),
        });

        if (!user) return res.status(404).json({ message: "No user found" });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        });

        if (!user) return res.status(404).json({ message: "No user found" });

        // const usersAvg = await usersAverageScore();
        // const usersHighScoreAvg = await usersAverageHighScore();

        res.status(201).json({
            avg_spent_money: await getAvgSpentMoney(),
            total_bought_ice_creams: await getTotalBoughtIceCreams(),
            ice_cream_profit: await getIceCreamProfit(),
            total_profit: await getTotalIceCreamProfit(),
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

async function getBoughtIceCreams(userId) {
    const bills = await Bill.find({ id_usuario: userId });
    let iceCreamsObject = await getIceCreamsObject();
    for (let index = 0; index < bills.length; index++) {
        const items = bills[index].items;
        for (let j = 0; j < items.length; j++) {
            const element = items[j];
            const iceCream = await IceCream.findOne({
                _id: element.get("item"),
            });
            iceCreamsObject[iceCream.name] += parseFloat(
                element.get("quantity")
            );
        }
    }
    return iceCreamsObject;
}

async function getIceCreamsObject() {
    const iceCreams = await IceCream.find();
    let iceCreamsObject = {};
    for (let index = 0; index < iceCreams.length; index++) {
        const element = iceCreams[index];
        iceCreamsObject[element.name] = 0;
    }
    return iceCreamsObject;
}

async function getAvgSpentMoney() {
    const users = await User.find();
    let avgsum = 0;

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.username == "admin") {
            continue;
        }
        avgsum += element.spent_balance;
    }
    return avgsum / users.length;
}

async function getTotalBoughtIceCreams() {
    const bills = await Bill.find();
    let iceCreamsObject = await getIceCreamsObject();
    for (let index = 0; index < bills.length; index++) {
        const items = bills[index].items;
        for (let j = 0; j < items.length; j++) {
            const element = items[j];
            const iceCream = await IceCream.findOne({
                _id: element.get("item"),
            });
            iceCreamsObject[iceCream.name] += parseFloat(
                element.get("quantity")
            );
        }
    }
    return iceCreamsObject;
}

async function getIceCreamProfit() {
    const bills = await Bill.find();
    let iceCreamsObject = await getIceCreamsObject();
    for (let index = 0; index < bills.length; index++) {
        const items = bills[index].items;
        for (let j = 0; j < items.length; j++) {
            const element = items[j];
            const iceCream = await IceCream.findOne({
                _id: element.get("item"),
            });
            iceCreamsObject[iceCream.name] +=
                parseFloat(element.get("quantity")) * iceCream.price;
        }
    }
    return iceCreamsObject;
}

async function getTotalIceCreamProfit(userId) {
    const bills = await Bill.find();
    let profit = 0;
    for (let index = 0; index < bills.length; index++) {
        const items = bills[index].items;
        for (let j = 0; j < items.length; j++) {
            const element = items[j];
            const iceCream = await IceCream.findOne({
                _id: element.get("item"),
            });
            profit += parseFloat(element.get("quantity")) * iceCream.price;
        }
    }
    return profit;
}

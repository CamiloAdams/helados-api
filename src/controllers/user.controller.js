import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const getUserInformation = async (req, res) => {
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

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(204).json();
};

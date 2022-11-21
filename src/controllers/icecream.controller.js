import IceCream from "../models/IceCream";

export const createIceCream = async (req, res) => {
    const { name, description, price, imgURL, stock } = req.body;

    const newIceCream = new IceCream({
        name,
        description,
        price,
        imgURL,
        stock,
    });

    const iceCreamSaved = await newIceCream.save();

    res.status(201).json(iceCreamSaved);
};

export const getIceCreams = async (req, res) => {
    const iceCreams = await IceCream.find();
    res.json(iceCreams);
};

export const getIceCream = async (req, res) => {
    await IceCream.findById(req.params.productId, function (err, data) {
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

export const updateIceCreamById = async (req, res) => {
    const updatedIceCream = await IceCream.findByIdAndUpdate(
        req.params.productId,
        req.body
    );
    res.status(200).json(updatedIceCream);
};

export const deleteIceCreamById = async (req, res) => {
    const { productId } = req.params;
    await IceCream.findByIdAndDelete(productId);
    res.status(204).json();
};

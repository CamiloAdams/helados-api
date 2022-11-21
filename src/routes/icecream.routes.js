import { Router } from "express";

import * as iceCreamCtrl from "../controllers/icecream.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.post(
    "/",
    [authjwt.verifyToken, authjwt.isAdmin],
    iceCreamCtrl.createIceCream
);

router.get("/", [authjwt.verifyToken], iceCreamCtrl.getIceCreams);

router.get("/:productId", [authjwt.verifyToken], iceCreamCtrl.getIceCream);

router.put(
    "/:productId",
    [authjwt.verifyToken, authjwt.isAdmin],
    iceCreamCtrl.updateIceCreamById
);

router.delete(
    "/:productId",
    [authjwt.verifyToken, authjwt.isAdmin],
    iceCreamCtrl.deleteIceCreamById
);

export default router;

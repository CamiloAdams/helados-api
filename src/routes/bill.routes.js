import { Router } from "express";

import * as billCtrl from "../controllers/bill.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.post("/", [authjwt.verifyToken], billCtrl.createBill);

router.get("/", [authjwt.verifyToken, authjwt.isAdmin], billCtrl.getBills);

router.get(
    "/:billId",
    [authjwt.verifyToken, authjwt.isAdmin],
    billCtrl.getBill
);

router.put(
    "/:billId",
    [authjwt.verifyToken, authjwt.isAdmin],
    billCtrl.updateBillById
);

router.delete(
    "/:billId",
    [authjwt.verifyToken, authjwt.isAdmin],
    billCtrl.deleteBillById
);

export default router;

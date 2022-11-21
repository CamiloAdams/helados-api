import { Router } from "express";

import * as statsCtrl from "../controllers/stats.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.get("/userstats", [authjwt.verifyToken], statsCtrl.getUserStats);
router.get(
    "/adminstats",
    [authjwt.verifyToken, authjwt.isAdmin],
    statsCtrl.getAdminStats
);

export default router;

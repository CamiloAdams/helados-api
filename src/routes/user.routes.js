import { Router } from "express";

import * as userCtrl from "../controllers/user.controller";
import { authjwt } from "../middlewares";

const router = Router();

router.get("/", [authjwt.verifyToken], userCtrl.getUserInformation);
router.get("/users", [authjwt.verifyToken, authjwt.isAdmin], userCtrl.getUsers);

router.delete("/:userId", [authjwt.verifyToken], userCtrl.deleteUserById);

export default router;

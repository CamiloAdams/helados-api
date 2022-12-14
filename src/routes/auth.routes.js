import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

export default router;

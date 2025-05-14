import { Router } from "express";
import { ROUTES } from "./config/constants";
import userRoutes from "./users/users.routes";

const router = Router();
router.use(ROUTES.USERS, userRoutes);

export default router;

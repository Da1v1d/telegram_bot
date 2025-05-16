import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";

const userRoutes = Router();
userRoutes.use(authMiddleware);

export default userRoutes;

import { Router } from "express";
import { ROUTES } from "./config/constants";
import authRoutes from "./features/auth/auth.routes";
import userRoutes from "./features/users/users.routes";

const routes = Router();

routes.use(ROUTES.USERS, userRoutes);
routes.use(ROUTES.AUTH, authRoutes);

export default routes;

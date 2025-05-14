// POST /api/cats

import { Request, Response } from "express";
import { UserDto } from "./users.dto";
import userRoutes from "./users.routes";
import { UsersService } from "./users.service";

const usersService = new UsersService();

// GET /api/users
userRoutes.get("/", (req, res) => {
  res.status(200).json({ message: "Get all users" });
});

// GET /api/users/:id
userRoutes.get(
  "/:id",
  async (req: Request<{ id: number }>, res: Response<UserDto>) => {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).json(user);
  }
);

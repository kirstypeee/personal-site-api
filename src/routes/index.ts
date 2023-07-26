import GithubRouter from "./github";
import { Router } from "express";
import UserRouter from "./user";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/user", UserRouter);
router.use("/github", GithubRouter)

// Export the base-router
export default router;

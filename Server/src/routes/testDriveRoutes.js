import { Router } from "express";
import {
  createTestDrive,
  getMyTestDrives,
  getAllTestDrives,
} from "../controllers/testDriveController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

// Buyer routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware("BUYER"),
  createTestDrive
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("BUYER"),
  getMyTestDrives
);

// Admin and sales consultant route
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "SALES_CONSULTANT"),
  getAllTestDrives
);

export default router;
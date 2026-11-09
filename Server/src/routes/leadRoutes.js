import { Router } from "express";
import {
  createLead,
  getLeads,
  updateLead,
} from "../controllers/leadController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

// Anyone can submit an enquiry
router.post("/", createLead);

// Only Admin and Sales Consultant can manage leads
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "SALES_CONSULTANT"),
  getLeads
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "SALES_CONSULTANT"),
  updateLead
);

export default router;
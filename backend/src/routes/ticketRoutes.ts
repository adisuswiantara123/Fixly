import express from "express";
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from "../controllers/ticketController";
import { authenticateToken, requireRole } from "../middlewares/authMiddleware";

const router = express.Router();

// All ticket routes require authentication
router.use(authenticateToken);

// Ticket CRUD
router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);

// Update ticket status/assignee requires AGENT or ADMIN role
router.patch("/:id", requireRole(["AGENT", "ADMIN"]), updateTicket);

// Delete ticket requires AGENT or ADMIN role
router.delete("/:id", requireRole(["AGENT", "ADMIN"]), deleteTicket);

export default router;

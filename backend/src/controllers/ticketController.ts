import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// CREATE Ticket
export const createTicket = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, priority, category } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        category,
        authorId: userId,
        status: "OPEN"
      }
    });

    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating ticket" });
  }
};

// GET All Tickets (with filters)
export const getTickets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;

    let whereClause = {};

    // Base level filtering: USER can only see their own tickets
    if (userRole === "USER") {
      whereClause = { authorId: userId };
    } 
    // AGENTs/ADMINs see all. We can add filter query params here.

    const tickets = await prisma.ticket.findMany({
      where: whereClause,
      include: {
        author: { select: { name: true, email: true } },
        assignee: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// GET Single Ticket
export const getTicketById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;
    const userId = req.user?.id;

    const ticket = await prisma.ticket.findUnique({
      where: { id: id as string },
      include: {
        author: { select: { id: true, name: true, email: true } },
        assignee: { select: { id: true, name: true, email: true } },
        comments: {
          include: { author: { select: { name: true, role: true } } },
          orderBy: { createdAt: "asc" }
        }
      }
    });

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    // Protection rule
    if (userRole === "USER" && ticket.authorId !== userId) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ticket" });
  }
};

// UPDATE Ticket (Assign or Change Status)
export const updateTicket = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, priority, assigneeId } = req.body;
    const userRole = req.user?.role;

    // Only Agent and Admin can change assignee or status arbitrarily in this simple logic
    if (userRole === "USER") {
       res.status(403).json({ message: "Only agents can update ticket dispatch data" });
       return;
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: id as string },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assigneeId && { assigneeId })
      }
    });

    res.status(200).json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating ticket" });
  }
};

// DELETE Ticket
export const deleteTicket = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;

    // Only Agent and Admin can delete tickets (or just Admin depending on policy)
    if (userRole === "USER") {
       res.status(403).json({ message: "Access denied. Only agents or admins can delete tickets." });
       return;
    }

    await prisma.ticket.delete({
      where: { id: id as string }
    });

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting ticket" });
  }
};


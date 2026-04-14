/**
 * 👨‍💻 Developed by Adi Suswiantara - Personal Portfolio Case Study
 * Fixly - Enterprise Helpdesk System
 * GitHub: https://github.com/adisuswiantara123
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Will update later for frontend URL
    methods: ["GET", "POST"]
  }
});

// Prisma is handled in lib/prisma.ts

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Fixly API is running" });
});

// Socket.io for Real-time
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("join_ticket", (ticketId) => {
    socket.join(`ticket_${ticketId}`);
    console.log(`User joined ticket ${ticketId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

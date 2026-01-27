import express from "express";
import Board from "../models/Board.js";  // ✅ Correct path
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE board (NOW SECURED)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const board = await Board.create({ 
      name, 
      owner: req.user.id
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET my boards (NOW SECURED)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET single board by ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const isOwner = board.owner.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE board
 */
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const isOwner = board.owner.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(board, req.body);
    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE board
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const isOwner = board.owner.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Board.findByIdAndDelete(req.params.id);

    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
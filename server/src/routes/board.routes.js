import express from "express";
import Board from "../models/Board.js";

const router = express.Router();

/**
 * CREATE board
 */
router.post("/", async (req, res) => {
  try {
    const { name, owner } = req.body;

    const board = await Board.create({ name, owner });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET boards by user
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.params.userId });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

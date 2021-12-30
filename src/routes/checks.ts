import express from "express";
import { getConnection } from "typeorm";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).send({ status: "OK" });
});

router.get("/readiness", (req, res) => {
  if (getConnection().isConnected) {
    res.status(200).send({ status: "OK" });
  } else {
    res.status(503).send({ status: "NotReady" });
  }
});

export default router;

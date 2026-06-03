import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";

import { getEmployees, createEmployee } from "#db/queries/employees";

/** I need routing middleware for getEmployees */

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

/** Routing middleware for createEmployee*/
router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body.");

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary)
    return res
      .status(400)
      .send("Request body must contain name, birthday, and salary.");

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

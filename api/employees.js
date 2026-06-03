import express from "express";
const router = express.Router();
export default router;

import db from "#db/client";

import {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
} from "#db/queries/employees";

/** I need routing middleware for getEmployees */

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

/** Routing middleware for POST /employees
 * Sends 400 if request body is not provided
 * Sends 400 if request body is missing a required field
 * Sends the newly created employee with status 201
 */
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

/** Routing middleware that allows reuse of the logic for parsing ID parameter */
router.param("id", async (req, res, next, id) => {
  // Try to find employee with specified ID
  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee cannot be found.");

  // Attach the employee to the request object
  req.employee = employee;
  next();
});

/** Routing middleware for GET /employees/:id
 * Sends 404 if employee does not exist
 * Sends employee with specified ID
 */
router.get("/:id", async (req, res) => {
  res.send(req.employee);
});

/**DELETE /employees/:id
 * Sends 404 if employee does not exist
 * Deletes the specified employee and sends status 204
 */
router.delete("/:id", async (req, res) => {
  await deleteEmployee(req.employee.id);
  res.status(204).send("Employee has been deleted.");
});

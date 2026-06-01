import { faker } from "@faker-js/faker";
import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

import { createEmployee } from "#db/queries/employees";
async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    await createEmployee({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate(),
      salary: faker.number.int({ min: 54000, max: 150000 }),
    });
  }
}

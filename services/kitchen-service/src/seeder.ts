import { AppDataSource } from "./database";
import { Permission } from "./entities/Permission";

async function seedData() {
  const repository = AppDataSource.getRepository(Permission);
  const permissions = [
    { name: "create_users" },
    { name: "view_users" },
    { name: "update_users" },
    { name: "delete_users" },
    { name: "create_orders" },
    { name: "view_orders" },
    { name: "update_orders" },
    { name: "delete_orders" },
    { name: "create_menu" },
    { name: "view_menu" },
    { name: "update_menu" },
    { name: "delete_menu" },
    { name: "create_tables" },
    { name: "view_tables" },
    { name: "update_tables" },
    { name: "delete_tables" },
  ];
  const createRecord = repository.create(permissions);
  const result = await repository.save(createRecord);
  console.log(result);
}
const seedDatabase = async () => {
  await AppDataSource.initialize();
  const start = Date.now();
  await seedData();
  const end = Date.now();
  console.log(`Thời gian thêm dữ liệu vào sql ${(end - start) / 1000}`);
  console.log("Data seeded!");
  await AppDataSource.destroy();
};
seedDatabase().catch((error) => console.error(error));

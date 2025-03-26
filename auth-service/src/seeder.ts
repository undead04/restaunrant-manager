import { Role } from "./entities/Role";
import { AppDataSource } from "./database";
import { Permission } from "./entities/Permission";
import { roleRepository } from "./services/repository/roleRepository";
import { userService } from "./services/userService";
import { UserDTO } from "./models/UserDTO";

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
    { name: "create_role" },
    { name: "view_role" },
    { name: "update_role" },
    { name: "delete_role" },
  ];
  const datas = (await repository.find({})).map((item) => item.name);
  const missingData = permissions.filter(
    (permission) => !datas.includes(permission.name)
  );

  if (missingData.length === 0) {
    console.log("Đã seed data");
  } else {
    const createRecords = repository.create(missingData);
    await repository.save(createRecords);
    console.log(`Đã thêm ${missingData.length} bản ghi mới.`);
  }
}
const seedDatabase = async () => {
  await seedData();
  console.log("Data seeded!");
};
export default seedDatabase;

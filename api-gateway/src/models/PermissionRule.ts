import { AppPermission } from "./AppPermission";

interface IPermissionRule {
  path: string;
  method: string;
  requireAuth: boolean;
  permission: string[];
}
// Danh sách API và quyền truy cập

const permissionRules: IPermissionRule[] = [
  {
    path: "/auth/login",
    method: "POST",
    requireAuth: false,
    permission: [],
  }, // Không cần đăng nhập
  {
    path: "/user",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_USERS],
  },
  {
    path: "/user",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_USERS],
  },
  // User Controller
  {
    path: "/user/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_USERS],
  },
  {
    path: "/user",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_USERS],
  },
  {
    path: "/user",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_USERS],
  },
  {
    path: "/user",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_USERS],
  },
  // Role Controller
  {
    path: "/role",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_ROLE],
  },
  {
    path: "/role/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_ROLE],
  },
  {
    path: "/role",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_ROLE],
  },
  {
    path: "/role",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_ROLE],
  },
  {
    path: "/role",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_USERS],
  },
  // Permission Controller
  {
    path: "/permission",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_ROLE],
  },
  // profile Controller
  {
    path: "/profile",
    method: "GET",
    requireAuth: true,
    permission: [],
  },
  // Dish Controller
  {
    path: "/dish",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_MENU],
  },
  {
    path: "/dish/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_MENU],
  },
  {
    path: "/dish",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_MENU],
  },
  {
    path: "/dish",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_MENU],
  },
  {
    path: "/dish",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_MENU],
  },
  // Dish Category Controller
  {
    path: "/categoryDish",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_MENU],
  },
  {
    path: "/categoryDish/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_MENU],
  },
  {
    path: "/categoryDish",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_MENU],
  },
  {
    path: "/categoryDish",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_MENU],
  },
  {
    path: "/categoryDish",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_MENU],
  },
  // Table Dish Controller
  {
    path: "/table",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_TABLES],
  },
  {
    path: "/table/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_TABLES],
  },
  {
    path: "/table",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_TABLES],
  },
  {
    path: "/table",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_TABLES],
  },
  {
    path: "/table",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_TABLES],
  },
  // Table Order Controller
  {
    path: "/order",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_ORDERS],
  },
  {
    path: "/order/:id",
    method: "GET",
    requireAuth: true,
    permission: [AppPermission.VIEW_ORDERS],
  },
  {
    path: "/order",
    method: "POST",
    requireAuth: true,
    permission: [AppPermission.CREATE_ORDERS],
  },
  {
    path: "/order",
    method: "PUT",
    requireAuth: true,
    permission: [AppPermission.UPDATE_ORDERS],
  },
  {
    path: "/order",
    method: "DELETE",
    requireAuth: true,
    permission: [AppPermission.DELETE_ORDERS],
  },
];
export default permissionRules;

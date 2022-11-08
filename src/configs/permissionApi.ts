import { baseApi } from "../http-common";

export default {
  getPermissionAll: baseApi + `/permission`,
  getPermissionDetail: (permissionId: string) =>
    baseApi + `/permission/` + permissionId + `/games`,
  addPermission: baseApi + `/permission/create`,
  editPermission: (permissionId: string) =>
    baseApi + `/permission/` + permissionId,
  deletePermission: (permissionId: string) =>
    baseApi + `/permission/` + permissionId,
  getPermissionGame: (permissionId: string) =>
    baseApi + `/permission/` + permissionId,
  addGameToPermission: (permissionId: string, userId: string) =>
    baseApi + `/permission/` + permissionId + `/game/${userId}`,
};

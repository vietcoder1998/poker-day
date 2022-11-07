<template>
  <el-row>
    <el-header> Permission </el-header>
    <PermissionEditModal
      :dialogVisible="visibleEditPermission"
      :permissionDetail="permissionDetail"
      @close="visibleEditPermission = false"
    ></PermissionEditModal>
    <el-table :data="tableData" max-height="500">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column fixed="right" label="Operation">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="
              permissionDetail = scope.row;
              visibleEditPermission = true;
            "
            >Edit</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            :style="{ width: 250 }"
            @confirm="() => deletePermission(scope.row.id)"
          >
            <template #reference>
              <el-button link type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script lang="ts">
import permissionApi from "@/configs/permissionApi";
import userApi from "@/configs/userApi";
import AddPermission from "@/components/AddPermission.vue";
import { Vue, Options } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import PermissionEditModal from "@/components/permission/PermissionEditModal.vue";

@Options({
  name: "PermissionView",
  computed: {},
  components: {
    AddPermission,
    CenterLayout,
    PermissionEditModal,
  },
  methods: {
    getPermissions() {
      this.httpRequest
        .get(permissionApi.getPermissionAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deletePermission(PermissionId: string) {
      this.httpRequest
        .delete(permissionApi.deletePermission(PermissionId))
        .then((res) => {
          this.getPermissions();
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getUsers() {
      this.httpRequest
        .get(userApi.getUserAll)
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  created() {
    this.getPermissions();
  },
  data() {
    return {
      tableData: [],
      users: [],
    };
  },
})
export default class Permission extends Vue {
  handleTabClick: any;
  permissionIds: any;
  tableData:
    | Array<{ description: string; name: string; id: string }>
    | undefined;
  deletePermission: any;
  permissions: Array<{ name: string; id: string; description: string }> = [];
  visibleEditPermission = false;
  permissionDetail: { id: string; name: string; description: string } = {
    name: "",
    description: "",
    id: "",
  };
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

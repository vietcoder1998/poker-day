<template>
  <el-row>
    <el-header> Role </el-header>
    <RoleEditModal
      :dialogVisible="visibleEditRole"
      :roleDetail="roleDetail"
      @close="visibleEditRole = false"
    ></RoleEditModal>
    <el-table :data="tableData" max-height="500">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column fixed="right" label="Operation">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="
              roleDetail = scope.row;
              visibleEditRole = true;
            "
            >Edit</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            :style="{ width: 250 }"
            @confirm="() => deleteRole(scope.row.id)"
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
import roleApi from "@/configs/roleApi";
import userApi from "@/configs/userApi";
import AddRole from "@/components/AddRole.vue";
import { Vue, Options } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import RoleEditModal from "@/components/role/RoleEditModal.vue";

@Options({
  name: "RoleView",
  computed: {},
  components: {
    AddRole,
    CenterLayout,
    RoleEditModal,
  },
  methods: {
    getRoles() {
      this.httpRequest
        .get(roleApi.getRoleAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteRole(RoleId: string) {
      this.httpRequest
        .delete(roleApi.deleteRole(RoleId))
        .then((res) => {
          this.getRoles();
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
    this.getRoles();
  },
  data() {
    return {
      tableData: [],
      users: [],
    };
  },
})
export default class Role extends Vue {
  handleTabClick: any;
  roleIds: any;
  tableData:
    | Array<{ description: string; name: string; id: string }>
    | undefined;
  deleteRole: any;
  roles: Array<{ name: string; id: string; description: string }> = [];
  visibleEditRole = false;
  roleDetail: { id: string; name: string; description: string } = {
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

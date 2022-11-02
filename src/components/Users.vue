<template>
  <el-row>
    <el-link type="primary" href="/add-user"> Add User </el-link>
    <el-table :data="tableData" max-height="250">
      <el-table-column prop="name" label="Name" width="250" />
      <el-table-column prop="username" label="Name" width="250" />
      <el-table-column prop="description" label="Description" width="250" />
      <el-table-column fixed="right" label="Operation" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small">Edit</el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            :style="{ width: 250 }"
            @confirm="() => deleteUser(scope.row.id)"
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
import axios from "axios";
import userApi from "@/configs/userApi";
import { Vue, Options } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  name: "Users",
  computed: {},
  components: {
    CenterLayout,
  },
  methods: {
    getUsers() {
      axios
        .get(userApi.getUserAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteUser(userId: string) {
      axios
        .delete(userApi.deleteUser(userId))
        .then((res) => {
          alert(JSON.stringify(res.data));
          this.getUsers();
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  created() {
    this.getUsers();
  },
  data() {
    return {
      tableData: [],
      users: [],
    };
  },
})
export default class Home extends Vue {
  users?: Array<any>;
  handleTabClick: any;
  userId: any;
  tableData:
    | Array<{ description: string; name: string; id: string }>
    | undefined;
  deleteUser: any;
  rooms: Array<{ name: string; id: string; description: string }> = [];
  getUsers: any;
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
  backguser: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

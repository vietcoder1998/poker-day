<template>
  <el-row>
    <el-header> Round </el-header>
    <el-table :data="tableData" max-height="500">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column fixed="right" label="Operation">
        <template #default="scope">
          <el-button link type="primary">Edit</el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            :style="{ width: 250 }"
            @confirm="() => deleteRound(scope.row.id)"
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
import roundApi from "@/configs/roundApi";
import userApi from "@/configs/userApi";
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import Room from "./ui/RoomCard.vue";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  name: "Round",
  computed: {},
  components: {
    AddRound,
    Room,
    CenterLayout,
  },
  methods: {
    getRounds() {
      axios
        .get(roundApi.getRoundAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteRound(roundId: string) {
      axios
        .delete(roundApi.deleteRound(roundId))
        .then((res) => {
          this.getRounds();
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getUsers() {
      axios
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
    this.getRounds();
  },
  data() {
    return {
      tableData: [],
      users: [],
    };
  },
})
export default class Home extends Vue {
  rounds?: Array<any>;
  handleTabClick: any;
  roundId: any;
  tableData:
    | Array<{ description: string; name: string; id: string }>
    | undefined;
  deleteRound: any;
  rooms: Array<{ name: string; id: string; description: string }> = [];
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
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

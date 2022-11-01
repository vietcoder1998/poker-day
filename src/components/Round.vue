<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column prop="name" label="Name" width="250" />
    <el-table-column prop="name" label="description" width="250" />
    <el-table-column fixed="right" label="Operation" width="120">
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
        <el-popconfirm
          title="Are you sure to delete this?"
          :style="{ width: 250 }"
        >
          <template #reference>
            <el-button link type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import axios from "axios";
import roundApi from "@/configs/roundApi";
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import Room from "./ui/Room.vue";
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
    getRooms() {
      axios
        .get(roundApi.getRoundAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  created() {
    this.getRooms();
  },
  data() {
    return {
      tableData: [],
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

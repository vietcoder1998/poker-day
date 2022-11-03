<template>
  <el-row>
    <el-header> Room </el-header>
    <RoomEditModal
      :dialogVisible="visibleEditRoom"
      :roomDetail="roomDetail"
      @close="visibleEditRoom = false"
    ></RoomEditModal>
    <el-table :data="tableData" max-height="500">
      <el-table-column prop="name" label="Name" width="250" />
      <el-table-column prop="description" label="Description" width="250" />
      <el-table-column fixed="right" label="Operation" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="
              roomDetail = scope.row;
              visibleEditRoom = true;
            "
            >Edit</el-button
          >
          <el-button
            link
            type="success"
            @click="() => $router.push(`/room/${scope.row.id}`)"
            >Go</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            :style="{ width: 250 }"
            @confirm="() => deleteRoom(scope.row.id)"
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
import roomApi from "@/configs/roomApi";
import userApi from "@/configs/userApi";
import AddRoom from "@/components/AddRoom.vue";
import { Vue, Options } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import RoomEditModal from "@/components/room/RoomEditModal.vue";

@Options({
  name: "RoomView",
  computed: {},
  components: {
    AddRoom,
    CenterLayout,
    RoomEditModal,
  },
  methods: {
    getRooms() {
      axios
        .get(roomApi.getRoomAll)
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteRoom(RoomId: string) {
      axios
        .delete(roomApi.deleteRoom(RoomId))
        .then((res) => {
          this.getRooms();
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
    this.getRooms();
  },
  data() {
    return {
      tableData: [],
      users: [],
    };
  },
})
export default class Room extends Vue {
  Rooms?: Array<any>;
  handleTabClick: any;
  RoomId: any;
  tableData:
    | Array<{ description: string; name: string; id: string }>
    | undefined;
  deleteRoom: any;
  rooms: Array<{ name: string; id: string; description: string }> = [];
  visibleEditRoom = false;
  roomDetail: { id: string; name: string; description: string } = {
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

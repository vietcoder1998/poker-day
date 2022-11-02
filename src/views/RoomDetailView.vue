<template>
  <center-layout>
    <el-row align="right">
      <el-button type="primary" @click="dialogVisible = true"> Add </el-button>
    </el-row>
    <!-- Add User -->
    <el-dialog v-model="dialogVisible" title="Thêm người dùng" width="30%">
      <!-- User info -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-select v-model="newUser.id" class="m-2" placeholder="Select">
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="newUser = item"
            />
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-input
            type="textarea"
            disabled
            v-model="newUser.description"
          ></el-input>
        </el-col>
      </el-row>
      <!-- User Info -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onAddGametoRoom">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- Add User -->
    <el-table :data="tableData" max-height="250">
      <el-table-column prop="name" label="Name" width="250" />
      <el-table-column prop="callNumber" label="Call" width="250">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.callNumber"
            :ref="scope.row.id"
            :min="0"
            :max="100000"
          />
        </template>
      </el-table-column>
      <el-table-column prop="inventory" label="Inventory" width="250">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.inventory"
            :ref="scope.row.id"
            :min="0"
            :max="100000"
          />
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total" width="250" />
      <el-table-column label="Operation" width="250" fixed="right">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="() => onSaveGameResult(scope.row.id)"
          >
            Save
          </el-button>
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="() => deleteGame(scope.row.id)"
          >
            <template #reference>
              <el-button link type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import roomApi from "@/configs/roomApi";
import userApi from "@/configs/userApi";
import gameApi from "@/configs/gameApi";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  components: {
    CenterLayout,
  },
  created() {
    this.getRoomDetail();
    this.getUsers();
    const { roomId } = this.$route.params;
    this.roomId = roomId;
  },
  data() {
    return {
      games: [],
      dialogVisible: false,
      users: [],
      newUser: {
        name: "",
        id: "",
        description: "",
      },
    };
  },
  computed: {
    tableData() {
      return this.games;
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    onSaveGameResult(gameId: string) {
      const { callNumber, inventory } = this.games.find(
        (item: any) => item.id === gameId
      );
      axios
        .post(gameApi.updateGameResult(gameId), { callNumber, inventory })
        .then((res) => {
          console.log(JSON.stringify(res));
          this.getRoomDetail();
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getRoomDetail() {
      const { roomId } = this.$route.params;
      axios
        .get(roomApi.getRoomDetail(roomId))
        .then((res) => {
          this.games = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteGame(gameId: string) {
      axios
        .delete(gameApi.deleteGame(gameId))
        .then((res) => {
          alert(JSON.stringify(res.data));
          this.getRoomDetail();
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
    onAddGametoRoom() {
      axios
        .post(roomApi.addGameToRoom(this.roomId, this.newUser.id))
        .then((res) => {
          this.getRoomDetail();
          this.dialogFormVisible = false;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
})
export default class RoomDetailView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
  dialogVisible: any = false;
  users: any[] = [];
  newUser: {
    name: string;
    description: string;
    id: string;
  } = { name: "", description: "", id: "" };
  onAddGametoRoom: any;
  onSaveGameResult: any;
  deleteGame: any;
}
</script>

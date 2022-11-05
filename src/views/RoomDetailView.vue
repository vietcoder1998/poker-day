<template>
  <center-layout>
    <el-header
      >Room Detail: <bold>{{ roomDetail.name }}</bold></el-header
    >
    <el-row>
      <el-button type="primary" @click="dialogVisible = true">
        Add Game
      </el-button>
      <el-button type="primary" @click="() => $router.push('/add-user')">
        Add User
      </el-button>
    </el-row>
    <!-- Add User -->
    <el-dialog v-model="dialogVisible" title="Thêm người dùng">
      <!-- User info -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-select v-model="newUser.name" class="m-2" placeholder="Select">
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user.id"
              @click="newUser = user"
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
    <el-table :data="games" max-height="500">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="callNumber" label="Call" width="175">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.callNumber"
            :ref="scope.row.id"
            :min="0"
            :max="20"
          />
        </template>
      </el-table-column>
      <el-table-column prop="inventory" label="Inventory" width="175">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.inventory"
            :ref="scope.row.id"
            :min="0"
            :max="100000"
          />
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total">
        <template #default="scope">
          <label :style="{ color: scope.row.total < 0 ? 'red' : 'green' }">{{
            scope.row.total
          }}</label>
        </template>
      </el-table-column>
      <el-table-column label="Operation" fixed="right">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="() => onSaveGameResult(scope.row._id)"
          >
            Save
          </el-button>
          <!-- Delete  -->
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="() => deleteGameInRoom(scope.row._id)"
          >
            <template #reference>
              <el-button link type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
          <!-- Delete  -->
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
  name: "RoomDetailView",
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
      roomDetail: {
        name: "",
        id: "",
        description: "",
        games: [],
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
      console.log(gameId);
      const { callNumber, inventory } = this.games.find(
        (item: any) => item._id === gameId
      );
      axios
        .post(gameApi.updateGameResult(gameId), { callNumber, inventory })
        .then((res) => {
          alert(JSON.stringify(res.data));
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
          this.roomDetail = res.data;
          this.games = this.roomDetail.games;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteGameInRoom(gameId: string) {
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
          this.dialogVisible = false;
          alert(JSON.stringify(res.data));
          this.getRoomDetail();
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
})
export default class RoomDetailView extends Vue {
  tableData: unknown;
  dialogVisible: any;
  users: any;
  newUser: any;
  onAddGametoRoom: any;
  onSaveGameResult: any;
  deleteGame: any;
  roomDetail: any;
  games: any;
  deleteGameInRoom: any;
}
</script>

<template>
  <center-layout>
    <el-header>
      Room Detail:
      <bold>{{ roomDetail.name }}</bold>
    </el-header>
    <el-row>
      <el-button type="primary" @click="dialogVisible = true">
        + Add Game
      </el-button>
      <el-button type="primary" @click="() => $router.push('/add-user')">
        Create New User
      </el-button>
      <el-button
        type="danger"
        @click="onDeleteManyGames"
        :plain="selectedGames.length === 0"
        :disabled="selectedGames.length === 0"
      >
        - Remove
      </el-button>
      <el-button type="success" @click="onSaveData"> Save </el-button>
    </el-row>
    <!-- Add User -->
    <el-dialog v-model="dialogVisible" title="Thêm ngườ i dùng">
      <!-- User info -->
      <el-select v-model="addUserList" multiple placeholder="Select a user">
        <el-option
          v-for="item in userList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        >
        </el-option
      ></el-select>
      <!-- User Info -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onAddManyGameToRoom">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- Table -->
    <keep-alive>
      <component
        v-bind:is="gameComponent"
        :roomDetail="roomDetail"
        @onCheckGame="onCheckGame"
        @onSaveGameResult="onSaveGameResult"
        @getRoomDetail="getRoomDetail"
      ></component>
    </keep-alive>
  </center-layout>
</template>

<script lang="ts">
import gameApi from "@/configs/gameApi";
import roomApi from "@/configs/roomApi";
import userApi from "@/configs/userApi";
import CenterLayout from "@/layout/CenterLayout.vue";
import { Options, Vue } from "vue-class-component";
import RoomDetailPoker from "./components/RoomDetailPoker.vue";
import RoomDetailSam from "./components/RoomDetailSam.vue";

@Options({
  name: "RoomDetail",
  components: {
    CenterLayout,
    RoomDetailPoker,
    RoomDetailSam,
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
      addUserList: [],
      addUserIdList: [],
      selectedGames: [],
    };
  },
  computed: {
    tableData() {
      return this.games;
    },
    gameComponent() {
      // return RoomDetailSam;
      return this.roomDetail.type === "sam" ? RoomDetailSam : RoomDetailPoker;
    },
    userList() {
      return (
        this.users?.map((user) => ({
          value: user.id,
          label: user.name,
        })) ?? []
      );
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    onCheckGame($event) {
      const ids = $event.map((item) => item._id);
      this.selectedGames = ids;
    },
    onSaveGameResult(gameId: string) {
      const { callNumber, inventory } = this.games.find(
        (item: any) => item._id === gameId
      );

      this.httpRequest.post(gameApi.updateGameResult(gameId), {
        callNumber,
        inventory,
      });
    },
    onDeleteManyGames() {
      this.httpRequest.delete(gameApi.deleteManyGames, {
        data: {
          gameIds: this.selectedGames,
        },
      });
      this.getRoomDetail();
    },
    async getRoomDetail() {
      const { roomId } = this.$route.params;
      this.httpRequest.get(roomApi.getRoomDetail(roomId)).then((res) => {
        this.roomDetail = res.data;
        this.games = this.roomDetail.games;
      });
    },
    deleteGameInRoom(gameId: string) {
      this.httpRequest.delete(gameApi.deleteGame(gameId));
      this.getRoomDetail();
    },
    getUsers() {
      this.httpRequest.get(userApi.getUserAll).then((res) => {
        this.users = res.data;
      });

      this.getRoomDetail();
    },
    onAddGametoRoom() {
      this.httpRequest.post(
        roomApi.addGameToRoom(this.roomId, this.newUser.id)
      );

      this.getRoomDetail();
      this.dialogVisible = false;
    },
    onAddManyGameToRoom(): void {
      this.httpRequest
        .post(roomApi.addManyGameToRoom(this.roomId), {
          userIds: Object.values(this.addUserList),
          roomId: this.roomId,
        })
        .then((res) => this.dispatch(res.data))
        .finally(() => this.getRoomDetail());

      this.dialogVisible = false;
    },
    onSaveData() {
      const updateGames = this.games.map((game) => ({
        _id: game._id,
        callNumber: game.callNumber,
        inventory: game.inventory,
      }));
      this.httpRequest
        .post(roomApi.updateManyGame(this.roomId), {
          updateGames,
        })
        .then((res) => this.dispatch(res.data))
        .finally(() => this.getRoomDetail());
    },
  },
})
export default class RoomDetail extends Vue {
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
  onCheckGame: any;
  selectedGames: any;
  onDeleteManyGames: any;
  addUserList: any;
  onAddUserList: any;
  addUserIdList: any;
  addManyGameToRoom: any;
  onAddManyGameToRoom: any;
  userList: any;
  gameComponent: any;
  onSaveData: any;
  getRoomDetail: any;
}
</script>

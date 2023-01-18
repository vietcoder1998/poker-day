<template>
  <el-table
    :loading="false"
    :data="games"
    max-height="500"
    @selection-change="$emit('onCheckGame', $event)"
  >
    <el-table-column prop="id" type="selection"> </el-table-column>
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="callNumber" label="Cash In" width="175">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.callNumber"
          :ref="scope.row.id"
          :min="-10000"
          :max="10000"
          :step="1000"
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
          :step="1000"
        />
      </template>
    </el-table-column>
    <el-table-column prop="total" label="Total">
      <template #default="scope">
        <label :style="{ color: scope.row.total < 0 ? 'red' : 'green' }">
          {{ scope.row.total }}
        </label>
      </template>
    </el-table-column>
    <el-table-column label="Operation" fixed="right">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="$emit('onSaveGameResult', scope.row._id)"
        >
          Save
        </el-button>
        <!-- Delete  -->
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="$emit('deleteGameInRoom', scope.row._id)"
        >
          <template #reference>
            <el-button link type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
        <!-- Delete  -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import gameApi from "@/configs/gameApi";
import CenterLayout from "@/layout/CenterLayout.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "RoomDetailPoker",
  components: {
    CenterLayout,
  },
  created() {
    const { roomId } = this.$route.params;
    this.roomId = roomId;
  },
  data() {
    return {
      users: [],
    };
  },
  props() {
    return {
      roomDetail: {},
    };
  },
  computed: {
    games() {
      return this.$attrs.roomDetail?.games;
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
    onSaveGameResult(gameId: string) {
      const { callNumber, inventory } = this.games.find(
        (item: any) => item._id === gameId
      );
      this.httpRequest
        .post(gameApi.updateGameResult(gameId), {
          callNumber,
          inventory,
        })
        .then((res) => this.dispatch(res.data))
        .finally(() => this.$emit("getRoomDetail"));
    },
    deleteGameInRoom(gameId: string) {
      this.httpRequest
        .delete(gameApi.deleteGame(gameId))
        .then((res) => this.dispatch(res.data))
        .finally(() => this.$emit("getRoomDetail"));
    },
  },
})
export default class RoomDetailPoker extends Vue {
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
}
</script>

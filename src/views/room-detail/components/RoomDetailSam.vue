<template>
  <el-table
    :loading="false"
    :data="games"
    max-height="500"
    @selection-change="$emit('onCheckGame', $event)"
  >
    <fragment v-for="(name, index) in users" :key="index">
      <el-table-column :label="name" :key="index">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.callNumber"
            :ref="scope.row.id"
            :min="-10000"
            :max="10000"
            :step="1"
          />
        </template>
      </el-table-column>
    </fragment>

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
  name: "RoomDetailSam",
  components: {
    CenterLayout,
  },
  created() {
    const { roomId } = this.$route.params;
    this.roomId = roomId;
  },
  data() {
    return {};
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
    users() {
      return this.$attrs.roomDetail?.users;
    },
    filterUser() {
      const result = [];
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

      this.httpRequest.post(gameApi.updateGameResult(gameId), {
        callNumber,
        inventory,
      });
    },
    deleteGameInRoom(gameId: string) {
      this.httpRequest.delete(gameApi.deleteGame(gameId));
      this.getRoomDetail();
    },
  },
})
export default class RoomDetailSam extends Vue {
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

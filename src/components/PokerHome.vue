<template>
  <div style="max-height: 100vh; overflow-y: auto">
    <el-header>Poker</el-header>
    <fragment>
      <el-row
        v-for="{ rooms, name, id, filter } in viewItems"
        :key="id"
        :gutter="6"
      >
        <el-divider>{{ name }}</el-divider>
        <el-col :span="24">
          <user-dash-board :filter="filter"></user-dash-board>
        </el-col>
        <el-col :span="24" :style="{ textAlign: 'left' }">
          <el-button
            type="primary"
            @click="$router.push(`/add-room?roundId=${id}`)"
          >
            <el-icon><Plus /></el-icon>
            Add Room
          </el-button>
          <el-button
            type="danger"
            @click="onDeleteMananyRoom"
            :plain="
              rooms?.every((item) => selectedRoom.includes(item.id)) ||
              selectedRoom.length === 0
            "
            :disabled="
              rooms?.every((item) => selectedRoom.includes(item.id)) ||
              selectedRoom.length === 0
            "
          >
            Remove
          </el-button>
        </el-col>
        <el-col
          v-for="room in rooms"
          :span="8"
          :sm="12"
          :xs="24"
          :lg="12"
          :md="12"
          :key="room?.id"
        >
          <RoomCard
            v-if="room"
            :tableItem="room"
            @changeInput="onChangeInputValue"
          ></RoomCard>
        </el-col>
      </el-row>
    </fragment>
  </div>
</template>

<script lang="ts">
import UserDashBoard from "@/components/poker-home/UserDashBoard.vue";
import RoomCard from "@/components/ui/RoomCard.vue";
import roundApi from "@/configs/roundApi";
import statisticApi from "@/configs/statisticApi";
import { TabsPaneContext } from "element-plus";
import BaseMixins from "@/mixins/base";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PokerHome",
  mixins: [BaseMixins],
  components: {
    RoomCard,
    UserDashBoard,
  },
  methods: {
    handleTabClick(tab: TabsPaneContext) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = tab.props.name;
      this.getRooms();
    },
    onChangeInputValue(event, id) {
      if (event) {
        this.selectedRoom = [...this.selectedRoom, id];
      } else {
        this.selectedRoom = this.selectedRoom.filter(
          (item) => !item.includes(id)
        );
      }
    },
    getRounds() {
      this.dispatch(
        this.httpRequest?.get(roundApi.getRoundWithRoom).then((res) => {
          this.rounds = res.data;
        })
      );
    },
    getStatistic() {
      this.httpRequest?.get(statisticApi.getStatistic).then((res) => {
        this.statistics = res.data;
        this.dispatch(res.data);
      });
    },
    onDeleteMananyRoom() {
      this.httpRequest
        ?.delete(statisticApi.deleteManyRoom(), {
          data: { roomIds: this.selectedRoom },
        })
        .then((res) => this.dispatch(res.data));
      this.httpRequest?.get(statisticApi.getStatistic).then((res) => {
        this.statistics = res.data;
      });
    },
  },
  computed: {
    viewItems() {
      if (this.rounds.length > 0 && this.statistics.length > 0) {
        return this.rounds?.map((round) => {
          const filter = this.statistics?.filter(
            (item) => item && item._id && item._id.round === round.id
          );

          round.filter = filter;

          return round;
        });
      }

      return [];
    },
  },
  async mounted() {
    this.getStatistic();
    this.getRounds();
  },
  data(): { rounds: any[]; statistics: any[]; selectedRoom: any[] } {
    return {
      rounds: [],
      statistics: [],
      selectedRoom: [],
    };
  },
  setup() {
    return {
      roundId: "add",
    };
  },
})
export default class PokerHome extends Vue {
  selectedRoom: any;
  onDeleteMananyRoom: any;
  viewItems: any;
  onChangeInputValue: any;
}
</script>

<style scoped>
.el-col {
  margin-bottom: 10px;
}

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

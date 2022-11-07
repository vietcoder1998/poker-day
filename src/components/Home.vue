<template>
  <el-header>Home</el-header>
  <fragment>
    <el-row
      v-for="{ rooms, name, id, filter } in viewItems"
      :key="id"
      :gutter="20"
    >
      <el-divider>{{ name }}</el-divider>
      <user-dash-board :filter="filter"></user-dash-board>
      <el-col :span="24" :style="{ textAlign: 'left' }">
        <el-button
          type="primary"
          @click="$router.push(`/add-room?roundId=${id}`)"
        >
          <el-icon><Plus /></el-icon>
          Add Room
        </el-button>
      </el-col>
      <el-col
        v-for="room in rooms"
        :span="8"
        :sm="12"
        :xs="24"
        :lg="8"
        :md="12"
        :key="room?.id"
      >
        <RoomCard v-if="room" :tableItem="room"></RoomCard>
      </el-col>
    </el-row>
  </fragment>
</template>

<script lang="ts">
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import type { TabsPaneContext } from "element-plus";
import RoomCard from "@/components/ui/RoomCard.vue";
import roundApi from "@/configs/roundApi";
import statisticApi from "@/configs/statisticApi";
import UserDashBoard from "@/components/ui/UserDashBoard.vue";

@Options({
  name: "Home",
  components: {
    AddRound,
    RoomCard,
    UserDashBoard,
  },
  methods: {
    handleTabClick(tab: TabsPaneContext) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = tab.props.name;
      this.getRooms();
    },
    getRounds() {
      this.httpRequest
        .get(roundApi.getRoundWithRoom)
        .then((res) => {
          this.rounds = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getStatistic() {
      this.httpRequest
        .get(statisticApi.getStatistic)
        .then((res) => {
          this.statistics = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
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

          console.log(filter);
          round.filter = filter;

          return round;
        });
      }

      return [];
    },
  },
  async created() {
    this.getStatistic();
    this.getRounds();
  },
  data() {
    return {
      rounds: [],
      roundId: "add",
      statistics: [],
    };
  },
})
export default class Home extends Vue {
  rounds?: Array<any>;
  handleTabClick: any;
  roundId: any;
  tableData:
    | Array<{ date: string; name: string; state: string; id: string }>
    | undefined;
  deleteRound: any;
  viewItems: any;
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

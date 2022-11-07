<template>
  <CenterLayout>
    <el-header>Home</el-header>
    <el-row
      v-for="{ rooms, name, id, statistic } in rounds"
      :key="id"
      :gutter="20"
    >
      <el-divider>{{ name }}</el-divider>
      <el-col v-if="statistic && statistic.length > 0" :span="24">
        <user-dash-board
          v-for="(item, key) in statistic"
          v-bind:key="['statistic', key].join('_')"
          :data="item"
        ></user-dash-board>
      </el-col>
      <el-col :span="24" :style="{ textAlign: 'left' }">
        <el-button
          type="primary"
          @click="$router.push(`/add-room?roundId=${id}`)"
        >
          <el-icon><Plus /></el-icon>
          Add Room
        </el-button>
      </el-col>
      <el-col v-if="statistic && statistic.length > 0" :span="24">
        <UserDashBoard :statistic="statistic"></UserDashBoard>
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
  </CenterLayout>
</template>

<script lang="ts">
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import type { TabsPaneContext } from "element-plus";
import RoomCard from "@/components/ui/RoomCard.vue";
import CenterLayout from "@/layout/CenterLayout.vue";
import roundApi from "@/configs/roundApi";
import statisticApi from "@/configs/statisticApi";
import UserDashBoard from "@/components/ui/UserDashBoard.vue";

@Options({
  name: "Home",
  components: {
    AddRound,
    CenterLayout,
    RoomCard,
    UserDashBoard,
  },
  methods: {
    handleTabClick(tab: TabsPaneContext) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = tab.props.name;
      this.getRooms();
    },
    async getRounds() {
      this.httpRequest
        .get(roundApi.getRoundAll + "?withRoom=true", {
          headers: this.authenticateHeader,
        })
        .then((res) => {
          this.rounds = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    async getStatistic() {
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
    roundIds() {
      return this.rounds.map((item) => item.id);
    },
  },
  created() {
    // this.getRooms();
    this.getRounds().then(() => this.getStatistic());
  },
  watch: {
    statistics: {
      handler(nVal) {
        this.rounds = this.rounds.map((round) => {
          const filterItem = nVal.filter((item) => item._id.round === round.id);
          round.statistic = filterItem;

          return round;
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      rounds: [],
      roundId: "add",
      rooms: [],
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
  rooms: Array<{ name: string; id: string; description: string }> = [];
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

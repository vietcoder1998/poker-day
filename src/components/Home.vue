<template>
  <CenterLayout>
    <el-header>Home</el-header>
    <el-row v-for="{ rooms, name, id } in rounds" :key="id" class="home">
      <el-divider>{{ name }}</el-divider>
      <el-col :span="24" :style="{ textAlign: 'left' }">
        <el-button
          type="primary"
          @click="$router.push(`/add-room?roundId=${id}`)"
        >
          <el-icon><Plus /></el-icon>
          Add Room</el-button
        >
      </el-col>
      <el-col
        v-for="room in rooms"
        :span="8"
        :sm="12"
        :xs="24"
        :lg="8"
        :md="12"
        :key="room?.id"
        :body-style="{ padding: '10px' }"
      >
        <RoomCard v-if="room" :tableItem="room"></RoomCard>
      </el-col>
    </el-row>
  </CenterLayout>
</template>

<script lang="ts">
import axios from "axios";
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import type { TabsPaneContext } from "element-plus";
import RoomCard from "@/components/ui/RoomCard.vue";
import CenterLayout from "@/layout/CenterLayout.vue";
import roundApi from "@/configs/roundApi";

@Options({
  name: "Home",
  computed: {},
  components: {
    AddRound,
    CenterLayout,
    RoomCard,
  },
  methods: {
    handleTabClick(tab: TabsPaneContext) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = tab.props.name;
      this.getRooms();
    },
    getRounds() {
      axios
        .get(roundApi.getRoundAll + "?withRoom=true")
        .then((res) => {
          this.rounds = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  created() {
    // this.getRooms();
    this.getRounds();
  },
  data() {
    return {
      rounds: [],
      roundId: "add",
      rooms: [],
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

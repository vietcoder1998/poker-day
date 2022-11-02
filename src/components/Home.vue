<template>
  <fragment>
    <el-row class="home">
      <el-col
        :span="6"
        :sm="12"
        :xs="24"
        :lg="6"
        :md="8"
        v-for="room in rooms"
        :key="room?.id"
        :body-style="{ padding: '10px' }"
      >
        <Room :tableItem="room"></Room>
      </el-col>
    </el-row>
  </fragment>
</template>

<script lang="ts">
import axios from "axios";
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import type { TabsPaneContext } from "element-plus";
import roomApi from "@/configs/roomApi";
import Room from "./ui/Room.vue";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  name: "Home",
  computed: {},
  components: {
    AddRound,
    Room,
    CenterLayout,
  },
  methods: {
    handleTabClick(tab: TabsPaneContext, event: Event) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = tab.props.name;
      this.getRooms();
    },
    getRooms() {
      axios
        .get(roomApi.getRoomAll)
        .then((res) => {
          this.rooms = res.data;
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

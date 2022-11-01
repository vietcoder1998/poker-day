<template>
  <dynamic-layout>
    <el-row :style="{ textAlign: 'center', padding: '10px' }">
      <el-link :href="`/add-room`">
        <el-button :type="'primary'" :style="{ margin: '10px' }">
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-link>
      <el-button
        :type="'danger'"
        :style="{ margin: '10px' }"
        @click="deleteRound"
      >
        <el-icon><Minus /></el-icon>
      </el-button>
    </el-row>
    <el-row class="home">
      <el-col
        :span="6"
        :sm="24"
        :xs="24"
        v-for="tableItem in tableData"
        :key="tableItem?.id"
        :body-style="{ padding: '10px' }"
      >
        <room :tableItem="tableItem"></room>
      </el-col>
    </el-row>
  </dynamic-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DynamicLayout from "@/layout/DynamicLayout.vue";
import Room from "@/ui/Room.vue";
import AddRoom from "@/ui/AddRoom.vue";
import axios from "axios";
import roundApi from "@/configs/roundApi";
import roomApi from "@/configs/roomApi";

@Options({
  components: {
    DynamicLayout,
    Room,
    AddRoom,
  },
  props: {
    roundId: {
      type: String,
      default: "",
    },
  },
  created() {
    this.getRooms();
  },
  methods: {
    deleteRound() {
      axios
        .delete(roundApi.deleteRound(this.roundId))
        .then((res) => {
          alert(JSON.stringify(res.data));
          this.$router.go(0);
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getRooms() {
      axios
        .get(roomApi.getRoomAll)
        .then((res) => {
          alert(JSON.stringify(res.data));
          this.rooms = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  computed: {
    name: "hello world",
    tableData() {
      return this.rooms;
    },
  },
  data() {
    return {
      rooms: [],
    };
  },
})
export default class HomeView extends Vue {
  tableData:
    | Array<{ date: string; name: string; state: string; id: string }>
    | undefined;
  deleteRound: any;
}
</script>

<template>
  <dynamic-layout>
    <el-header>HOME</el-header>
    <el-row :style="{ textAlign: 'center', padding: '10px' }">
      <el-link :href="`/add-room`">
        <el-button :type="'primary'" :style="{ margin: '10px' }">
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-link>
    </el-row>
    <el-row class="home">
      <el-col
        :span="6"
        :sm="24"
        :xs="24"
        :lg="6"
        :md="8"
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
import axios from "axios";
import roomApi from "@/configs/roomApi";

@Options({
  name: "Home",
  components: {
    DynamicLayout,
    Room,
  },
  props: {
    roundId: {
      type: String,
      default: "",
    },
  },
  methods: {
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
  computed: {
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

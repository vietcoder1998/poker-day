<template>
  <center-layout>
    <el-table :data="tableData" max-height="250" width="100%">
      <el-table-column prop="name" label="Name" width="250" />
      <el-table-column prop="callNumber" label="Call" width="250">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.callNumber"
            :min="0"
            :max="100000"
          />
        </template>
      </el-table-column>
      <el-table-column prop="inventory" label="All" width="250">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.inventory"
            :min="0"
            :max="100000"
          />
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total" width="250" />
    </el-table>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Room from "@/ui/Room.vue";
import axios from "axios";
import roomApi from "@/configs/roomApi";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  components: {
    Room,
  },
  created() {
    this.getRoomDetail();
  },
  data() {
    return {
      games: [],
    };
  },
  computed: {
    tableData() {
      return this.games;
    },
  },
  methods: {
    getRoomDetail() {
      const { roomId } = this.$route.params;

      axios
        .get(roomApi.getRoomDetail(roomId))
        .then((res) => {
          this.games = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    deleteRow() {
      return;
    },
  },
})
export default class RoomDetailView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
}
</script>

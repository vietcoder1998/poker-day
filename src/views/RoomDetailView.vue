<template>
  <dynamic-layout>
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
  </dynamic-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DynamicLayout from "@/layout/DynamicLayout.vue";
import Room from "@/ui/Room.vue";
import axios from "axios";

@Options({
  components: {
    DynamicLayout,
    Room,
  },
  created() {
    const { roomId } = this.$route.params;
    axios.get(`http://localhost:8090/room/${roomId}/games`).then((res) => {
      this.games = res.data;
    });
  },
  data() {
    return {
      games: [],
    };
  },
  computed: {
    name: "Hell world",
    tableData() {
      return this.games;
    },
  },
  methods: {
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

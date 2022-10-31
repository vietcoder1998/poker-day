<template>
  <dynamic-layout>
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="call" label="Call" width="200">
        <el-input-number :min="1" :max="10" />
      </el-table-column>
      <el-table-column prop="all" label="All" width="200">
        <el-input-number :min="1" :max="10" />
      </el-table-column>
      <el-table-column prop="total" label="Total" width="200" />
      <el-table-column props="id" label="Operator" width="120">
        <template>
          <el-button size="small">Edit</el-button>
          <el-button size="small" type="danger"> Delete </el-button>
        </template>
      </el-table-column>
    </el-table>
  </dynamic-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DynamicLayout from "@/layout/DynamicLayout.vue";
import Room from "@/ui/Room.vue";

@Options({
  components: {
    DynamicLayout,
    Room,
  },
  computed: {
    name: "Hell world",
    tableData() {
      return [
        {
          id: "2016-05-03",
          name: "Tom",
          call: 1000,
          all: 3200,
          total: 1000,
        },
        {
          id: "2016-05-03",
          name: "Tom",
          call: 1000,
          all: 3200,
          total: -100,
        },
      ];
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

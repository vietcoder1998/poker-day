<template>
  <center-layout>
    <el-header>Add Room</el-header>
    <AddRoom></AddRoom>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddRoom from "@/components/AddRoom.vue";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  name: "AddRoomPage",
  components: {
    AddRoom,
    CenterLayout,
  },
})
export default class AddRoomClass extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  ruleForm: any;
  resetForm: any;
  submitForm: any;
  ruleFormRef: any;
}
</script>

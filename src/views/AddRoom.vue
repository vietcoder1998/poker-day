<template>
  <AddRoom></AddRoom>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import AddRoom from "@/components/AddRoom.vue";

@Options({
  components: {
    CenterLayout,
    AddRoom,
  },
  name: "AddRoom",
  computed: {
    name: "hello world",
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

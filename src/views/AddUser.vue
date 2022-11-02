<template>
  <center-layout>
    <AddUser></AddUser>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddUser from "@/components/AddUser.vue";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  components: {
    AddUser,
    CenterLayout,
  },

  name: "AddUserPage",
})
export default class AddRoomClass extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  ruleForm: any;
  resetForm: any;
  submitForm: any;
  ruleFormRef: any;
}
</script>

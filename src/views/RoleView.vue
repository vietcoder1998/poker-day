<template>
  <center-layout>
    <Role></Role>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import Role from "@/components/Role.vue";

@Options({
  name: "RoleView",
  components: {
    CenterLayout,
    Role,
  },
})
export default class RoleView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
}
</script>

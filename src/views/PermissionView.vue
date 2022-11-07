<template>
  <center-layout>
    <Permission></Permission>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import Permission from "@/components/Permission.vue";

@Options({
  name: "PermissionView",
  components: {
    CenterLayout,
    Permission,
  },
})
export default class PermissionView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
}
</script>

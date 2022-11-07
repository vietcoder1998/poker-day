<template>
  <center-layout>
    <Users></Users>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import Users from "@/components/Users.vue";

@Options({
  components: {
    CenterLayout,
    Users,
  },
  name: "UserPage",
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

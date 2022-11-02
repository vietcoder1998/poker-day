<template>
  <center-layout>
    <Room></Room>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import Room from "@/components/Room.vue";

@Options({
  name: "RoomView",
  components: {
    CenterLayout,
    Room,
  },
})
export default class RoomView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
}
</script>

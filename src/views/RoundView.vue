<template>
  <center-layout>
    <Round></Round>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import Round from "@/components/Round.vue";

@Options({
  name: "RoundView",
  components: {
    CenterLayout,
    Round,
  },
  methods: {
    deleteRow() {
      return;
    },
  },
})
export default class RoundView extends Vue {
  tableData: unknown;
  deleteRow(event: any) {
    console.log("Event: " + event);
  }
}
</script>

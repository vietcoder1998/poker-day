<template>
  <center-layout>
    <Home></Home>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "@/components/Home.vue";
import CenterLayout from "@/layout/CenterLayout.vue";

@Options({
  name: "HomeView",
  components: {
    Home,
    CenterLayout,
  },
})
export default class HomeView extends Vue {}
</script>

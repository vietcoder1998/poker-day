<template>
  <Home> </Home>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "@/components/Home.vue";

@Options({
  name: "HomeView",
  components: {
    Home,
  },
})
export default class HomeView extends Vue {}
</script>

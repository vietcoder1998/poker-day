<template>
  <center-layout>
    <el-row>
      <el-col :md="24">
        <Home></Home>
      </el-col>
    </el-row>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "@/components/PokerHome.vue";
import CenterLayout from "@/layout/CenterLayout.vue";
import WesternCard from "@/components/WesternCard.vue";

@Options({
  name: "HomeView",
  components: {
    Home,
    CenterLayout,
    WesternCard,
  },
})
export default class HomeView extends Vue {}
</script>

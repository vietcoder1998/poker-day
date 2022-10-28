<template>
  <dynamic-layout>
    <el-row class="home">
      <el-col
        :span="12"
        v-for="o in 4"
        :key="o"
        :body-style="{ padding: '10px' }"
      >
        <room></room>
      </el-col>
    </el-row>
  </dynamic-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import DynamicLayout from "@/layout/DynamicLayout.vue";
import Room from "@/ui/Room.vue";

@Options({
  components: {
    HelloWorld,
    DynamicLayout,
    Room,
  },
  computed: {
    name: "hello world",
  },
})
export default class HomeView extends Vue {}
</script>

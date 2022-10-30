<template>
  <dynamic-layout>
    <el-row class="home">
      <el-col
        :span="12"
        v-for="o in tableData"
        :key="o"
        :body-style="{ padding: '10px' }"
      >
        <room :tableItem="o"></room>
      </el-col>
      <el-col :span="24" :style="{ textAlign: 'center', padding: '10px' }">
        <el-link :href="`/add-room`">
          <el-button :type="'primary'" :style="{ margin: '10px' }">
            <el-icon><Plus /></el-icon>
          </el-button>
        </el-link>
        <el-button :type="'danger'" :style="{ margin: '10px' }">
          <el-icon><Minus /></el-icon>
        </el-button>
      </el-col>
    </el-row>
  </dynamic-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import DynamicLayout from "@/layout/DynamicLayout.vue";
import Room from "@/ui/Room.vue";
import AddRoom from "@/ui/AddRoom.vue";

@Options({
  components: {
    HelloWorld,
    DynamicLayout,
    Room,
    AddRoom,
  },
  computed: {
    name: "hello world",
    tableData() {
      return [
        { date: "2016-05-03", id: "1", name: "Room1" },
        { date: "2016-05-03", id: "2", name: "Room2" },
        { date: "2016-05-03", id: "3", name: "Room3" },
      ];
    },
  },
})
export default class HomeView extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
}
</script>

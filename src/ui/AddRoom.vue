<template>
  <el-card class="box-card">
    <div>
      {{ "+" }}
    </div>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Room",
  computed: {
    name: "hello world",
  },
})
export default class Room extends Vue {}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin: 10px;
  width: calc(100%-20px);
}
</style>

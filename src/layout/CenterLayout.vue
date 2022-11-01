<template>
  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <slot></slot>
    </el-col>
    <el-col :span="4"> </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "DynamicLayout",
})
export default class DynamicLayout extends Vue {}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>

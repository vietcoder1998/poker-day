<template>
  <el-row>
    <el-col :span="4">
      <el-scrollbar height="400px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar>
    </el-col>
    <el-col :span="20">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "DynamicLayout",
  computed: {
    name: "hello world",
  },
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

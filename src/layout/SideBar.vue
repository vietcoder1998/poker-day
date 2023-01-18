<template>
  <el-col :span="24">
    <h5 class="mb-2">Default colors</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <el-link href="/">Poker</el-link>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Sâm</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script lang="ts">
export default {
  name: "SideBar",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

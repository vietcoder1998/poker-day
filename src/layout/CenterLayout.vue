<template>
  <el-row>
    <CustomAlert
      :title="title"
      :description="description"
      :type="type"
      @close="isClosed = true"
    ></CustomAlert>
    <el-col :span="4" :xs="0"></el-col>
    <el-col :span="16" :xs="24">
      <slot></slot>
    </el-col>
    <el-col :span="4" :xs="0"> </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomAlert from "@/components/ui/CustomAlert.vue";
import BaseMixins from "@/mixins/base";

@Options({
  name: "CenterLayout",
  mixins: [BaseMixins],
  components: {
    CustomAlert,
  },
  computed: {
    title() {
      return this.aInfo.title;
    },
    description() {
      return this.aInfo.description;
    },
    type() {
      return this.aInfo.type;
    },
  },
})
export default class DynamicLayout extends Vue {
  isClosed: any;
  aInfo: any;
  title: any;
  description: any;
  type: any;
}
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

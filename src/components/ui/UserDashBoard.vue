<template>
  <el-descriptions direction="vertical" :column="2" size="2" border>
    <el-descriptions-item label="name">{{
      data._id.name
    }}</el-descriptions-item>
    <el-descriptions-item label="Telephone">{{
      data.totalScore
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    data: {
      type: Object,
      default: () => ({
        totalScore: 0,
        _id: {
          user: "",
          round: "",
          name: "",
        },
      }),
    },
  },
})
export default class UserDashBoard extends Vue {
  data: any;
}
</script>

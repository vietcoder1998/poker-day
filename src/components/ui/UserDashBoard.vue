<template>
  <el-table
    :data="dashboard"
    border
    :style="{
      width: 500,
    }"
  >
    <el-table-column prop="name" label="Name">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="total" label="Total">
      <template #default="scope">
        <label :style="{ color: scope.row.total < 0 ? 'red' : 'green' }">
          {{ scope.row.total }}
        </label>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "UserDashBoard",
  props: {
    statistic: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    dashboard() {
      const statistic = this.statistic;

      return statistic.map((item) => ({
        total: parseInt(item.totalScore),
        name: item._id.name,
      }));
    },
  },
})
export default class UserDashBoard extends Vue {
  statistic: any;
  dashboard: any;
}
</script>

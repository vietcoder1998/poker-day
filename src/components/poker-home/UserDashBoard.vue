<template>
  <el-table
    border
    :data="dashboard"
    :style="{
      width: 500,
      marginBottom: 10,
    }"
  >
    <el-table-column prop="name" label="Name">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="total" label="Cash">
      <template #default="scope">
        <label :style="{ color: scope.row.score < 0 ? 'red' : 'green' }">
          {{ scope.row.score }}
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
    filter: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.$props);
  },
  computed: {
    dashboard() {
      const statistics = this.filter;

      const data = statistics.map((item) => ({
        score: parseInt(item.totalScore),
        name: item._id.name,
      }));
      console.log(data);
      const total = statistics
        .map((item) => item.score ?? 0)
        .reduce((a, b) => a + b, 0);
      console.log("total is", total, data);
      return [...data, { name: `Total`, score: total ?? 0 }];
    },
  },
})
export default class UserDashBoard extends Vue {
  statistic: any;
  dashboard: any;
}
</script>

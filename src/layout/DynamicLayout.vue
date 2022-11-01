<template>
  <el-tabs
    tab-position="left"
    style="width: 100%"
    class="demo-tabs"
    v-model="roundId"
    @tab-click="handleTabClick"
  >
    <el-tab-pane label="ADD" name="add">
      <AddRound></AddRound>
    </el-tab-pane>
    <el-tab-pane
      v-for="(round, index) in rounds"
      :key="['round', index].join('')"
      :label="round.name"
      :name="round.id"
    >
      <slot :roundId="round.id"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import axios from "axios";
import roundApi from "@/configs/roundApi";
import AddRound from "@/components/AddRound.vue";
import { Vue, Options } from "vue-class-component";
import type { TabsPaneContext } from "element-plus";

@Options({
  name: "DynamicLayout",
  computed: {},
  components: {
    AddRound,
  },
  methods: {
    getRound() {
      axios
        .get(roundApi.getRoundAll)
        .then((res) => {
          this.rounds = res.data;
        })
        .catch((err) => alert(err));
    },
    handleTabClick(tab: TabsPaneContext, event: Event) {
      this.$router.push({ query: { roundId: tab.props.name } });
      this.roundId = this.tab.props.name;
    },
  },
  created() {
    this.getRound();
    if (this.$route.query.roundId) {
      this.roundId = this.$route.query.roundId;
    }
  },
  data() {
    return {
      rounds: [],
      roundId: "add",
    };
  },
})
export default class DynamicLayout extends Vue {
  rounds?: Array<any>;
  handleTabClick: any;
  roundId: any;
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

<template>
  <el-row>
    <el-row>
      <el-col span="4">
        <el-tabs
          tab-position="left"
          style="width: 100%"
          class="demo-tabs"
          v-model="roundId"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="ADD" name="add">
            <el-col span="20">
              <AddRound></AddRound>
            </el-col>
          </el-tab-pane>
          <el-tab-pane
            v-for="(round, index) in rounds"
            :key="['round', index].join('')"
            :label="round.name"
            :name="round.id"
          >
            <el-col span="20">
              <slot :roundId="round.id"></slot>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-row>
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

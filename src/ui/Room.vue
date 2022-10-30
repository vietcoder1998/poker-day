<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ tableItem.name }}</span>
        <el-link :href="`/room/${tableItem.id}`" target="_blank" type="success">
          Go
        </el-link>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Room",
  computed: {
    name: "hello world",
  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({
        id: "",
        name: "",
        user: [],
      }),
    },
  },
})
export default class Room extends Vue {
  tableItem: any;
}
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

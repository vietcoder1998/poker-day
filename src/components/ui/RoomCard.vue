<template>
  <el-card
    class="box-card"
    draggable="true"
    ondrop="onDrop"
    ondragstart="onDrag"
  >
    <template #header>
      <div class="card-header">
        <div>
          <el-checkbox
            :id="tableItem._id"
            @change="$emit('changeInput', $event, tableItem._id)"
          >
          </el-checkbox>
          <label :for="tableItem._id">
            {{ tableItem.name.toUpperCase() }}
          </label>
        </div>
        <el-link :href="`/room/${tableItem._id}`" type="success" button>
          Xem
        </el-link>
      </div>
    </template>
    <div style="text-align: left">
      <div>
        <b>{{ tableItem.round.name }} </b>
      </div>
      <div>{{ tableItem.createdAt }}</div>
      <div>{{ tableItem.description }}</div>
    </div>
  </el-card>
</template>

<script lang="ts">
import roomApi from "@/configs/roomApi";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "RoomCard",
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
  methods: {
    deleteRoom(roomId) {
      this.httpRequest
        .delete(roomApi.deleteRoom(roomId))
        .then((res) => this.dispatch(res.data));
    },
    onDrop(event) {
      console.log(event);
    },
    onDrag(event) {
      console.log(event);
    },
  },
})
export default class RoomCard extends Vue {
  tableItem: any;
  deleteRoom: any;
  onDrop: any;
  onDrag: any;
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
  width: calc(100%-20px);
}
</style>

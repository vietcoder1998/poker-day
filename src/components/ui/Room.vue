<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ tableItem.name }}</span>
        <el-popconfirm
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          width="200px"
          @confirm="() => deleteRoom(tableItem.id)"
        >
          <template #reference>
            <el-link type="danger"> Delete </el-link>
          </template>
        </el-popconfirm>
        <el-link :href="`/room/${tableItem.id}`" type="success"> Go </el-link>
      </div>
    </template>
    <div style="text-align: left">
      <div>8 people</div>
      <div>8/11/2022</div>
      <div>Description</div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import roomApi from "@/configs/roomApi";

@Options({
  name: "Room",
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
    deleteRoom(id: string) {
      axios
        .delete(roomApi.deleteRoom(this.tableItem.id))
        .then((res) => {
          if (res.data) {
            alert(JSON.stringify(res.data));
            this.$router.go(0);
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
})
export default class Room extends Vue {
  tableItem: any;
  deleteRoom: any;
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

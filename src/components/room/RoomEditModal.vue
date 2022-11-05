<template>
  <el-dialog v-model="dialogVisible" title="Edit Room">
    <el-form
      ref="roomDetailRef"
      :model="roomDetail"
      status-icon
      label-width="120px"
      class="demo-roomDetail"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="roomDetail.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="roomDetail.description"
          type="textarea"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitEdit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import roomApi from "@/configs/roomApi";

@Options({
  name: "RoomEditModal",
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitEdit() {
      this.onUpdateRoom();
      this.handleClose();
    },
    onUpdateRoom() {
      const room = this.roomDetail;
      axios
        .post(roomApi.editRoom(room.id), room)
        .then((res) => {
          alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  props: {
    roomDetail: {
      name: {
        type: String,
        required: true,
        default: "",
      },
      id: {
        type: String,
        required: true,
        default: "",
      },
      description: {
        type: String,
        required: true,
        default: "",
      },
    },
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
})
export default class RoomEditModal extends Vue {
  handleClose: any;
  roomDetail: any;
  submitEdit: any;
  dialogVisible: any;
}
</script>

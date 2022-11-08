<template>
  <el-dialog v-model="dialogVisible" title="Edit Round">
    <el-form
      ref="roundDetailRef"
      :model="roundDetail"
      status-icon
      label-width="120px"
      class="demo-roundDetail"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="roundDetail.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="roundDetail.description"
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
import roundApi from "@/configs/roundApi";

@Options({
  name: "RoundEditModal",
  methods: {
    handleClose() {
      this.$emit("close-round");
    },
    submitEdit() {
      this.onUpdateRound();
      this.handleClose();
    },
    onUpdateRound() {
      const round = this.roundDetail;
      this.httpRequest
        .post(roundApi.editRound(round.id), round)
        .then((res) => {
          alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  props: {
    roundDetail: {
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
export default class RoundEditModal extends Vue {
  handleClose: any;
  roundDetail: any;
  submitEdit: any;
  dialogVisible: any;
}
</script>

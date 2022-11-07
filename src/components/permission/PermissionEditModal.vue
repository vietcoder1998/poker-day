<template>
  <el-dialog v-model="dialogVisible" title="Edit Permission">
    <el-form
      ref="permissionDetailRef"
      :model="permissionDetail"
      status-icon
      label-width="120px"
      class="demo-permissionDetail"
    >
      <el-form-item label="Name" prop="name">
        <el-input
          v-model="permissionDetail.name"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="permissionDetail.description"
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
import permissionApi from "@/configs/permissionApi";

@Options({
  name: "PermissionEditModal",
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitEdit() {
      this.onUpdatePermission();
      this.handleClose();
    },
    onUpdatePermission() {
      const permission = this.permissionDetail;
      this.httpRequest
        .post(permissionApi.editPermission(permission.id), permission)
        .then((res) => {
          alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  props: {
    permissionDetail: {
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
export default class PermissionEditModal extends Vue {
  handleClose: any;
  permissionDetail: any;
  submitEdit: any;
  dialogVisible: any;
}
</script>

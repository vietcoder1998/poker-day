<template>
  <el-dialog v-model="dialogVisible" title="Edit Role">
    <el-form
      ref="roleDetailRef"
      :model="roleDetail"
      status-icon
      label-width="120px"
      class="demo-roleDetail"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="roleDetail.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="roleDetail.description"
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
import roleApi from "@/configs/roleApi";

@Options({
  name: "RoleEditModal",
  methods: {
    handleClose() {
      this.$emit("close");
    },
    submitEdit() {
      this.onUpdateRole();
      this.handleClose();
    },
    onUpdateRole() {
      const role = this.roleDetail;
      axios
        .post(roleApi.editRole(role.id), role)
        .then((res) => {
          alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  props: {
    roleDetail: {
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
export default class RoleEditModal extends Vue {
  handleClose: any;
  roleDetail: any;
  submitEdit: any;
  dialogVisible: any;
}
</script>

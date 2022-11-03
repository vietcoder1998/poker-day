<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-header>AddUser</el-header>
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Username" prop="name">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input
        v-model="ruleForm.description"
        type="textarea"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import userApi from "@/configs/userApi";
import { Vue, Options } from "vue-class-component";

@Options({
  name: "AddRound",
  methods: {
    submitForm() {
      axios
        .post(userApi.addUser, this.ruleForm)
        .then((data) => {
          alert(JSON.stringify(data));
          this.$router.go(-1);
        })
        .catch((err) => alert(err))
        .finally(() => {
          this.resetForm();
        });
    },
    resetForm() {
      this.ruleForm = {
        name: "",
        username: "",
        description: "",
      };
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        description: "",
      },
    };
  },
})
export default class AddRound extends Vue {}
</script>

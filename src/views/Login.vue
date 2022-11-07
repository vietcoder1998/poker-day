<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-header>Login</el-header>
    <el-form-item label="Username" prop="username">
      <el-input type="text" autocomplete="on" v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="on" />
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
import authenticateApi from "@/configs/authenticateApi";
import { Vue, Options } from "vue-class-component";

@Options({
  name: "Login",
  methods: {
    submitForm() {
      axios
        .post(authenticateApi.login, this.ruleForm)
        .then((res) => {
          const { token, username } = res.data.data;
          this.setAuthenticate(token, username);
          alert(JSON.stringify(res));
          this.$router.go("/");
        })
        .catch((err) => alert(err))
        .finally(() => {
          this.resetForm();
        });
    },
    resetForm() {
      this.ruleForm = {
        username: "",
        password: "",
      };
    },
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
})
export default class AddRound extends Vue {}
</script>

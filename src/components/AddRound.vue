<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-header>Add Round</el-header>
    <el-form-item label="Name" prop="pass">
      <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Description" prop="checkPass">
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
import roundApi from "@/configs/roundApi";
import { Vue, Options } from "vue-class-component";
@Options({
  name: "AddRound",
  methods: {
    submitForm() {
      axios
        .post(roundApi.addRound, this.ruleForm)
        .then((data) => alert(JSON.stringify(data)))
        .catch((err) => alert(err))
        .finally(() => {
          this.resetForm();
        });
    },
    resetForm() {
      this.ruleForm = {
        name: "",
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

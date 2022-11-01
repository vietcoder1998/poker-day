<template>
  <center-layout>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
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
      <el-form-item label="Month" prop="month">
        <el-input v-model.number="ruleForm.month" type="text" />
      </el-form-item>
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import axios from "axios";
import roomApi from "@/configs/roomApi";

@Options({
  components: {
    CenterLayout,
  },
  computed: {
    name: "hello world",
  },
  methods: {
    resetForm(form: any) {
      form.reset();
    },
    submitForm(form: any) {
      axios
        .post(roomApi.addRoom, this.ruleForm)
        .then((res) => {
          this.rooms = res.data;
          this.$router.back();
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        description: "",
        date: "",
      },
    };
  },
})
export default class HomeView extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  ruleForm: any;
  resetForm: any;
  submitForm: any;
  ruleFormRef: any;
}
</script>

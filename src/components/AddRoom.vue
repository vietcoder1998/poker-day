<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Name" prop="pass">
      <el-input
        v-model="ruleForm.name"
        type="text"
        autocomplete="on"
        required
      />
    </el-form-item>
    <el-form-item label="Description" prop="checkPass">
      <el-input
        v-model="ruleForm.description"
        type="textarea"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Round" prop="round">
      <el-select
        v-model="ruleForm.roundId"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in rounds"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import roomApi from "@/configs/roomApi";
import roundApi from "@/configs/roundApi";

@Options({
  name: "AddRoom",
  methods: {
    resetForm(form: any) {
      form.reset();
    },
    submitForm() {
      axios
        .post(roomApi.addRoom, this.ruleForm)
        .then((res) => {
          this.rooms = res.data;
          alert(JSON.stringify(res.data));
          console.log("success");
          this.$router.push(`/room/${res.data.data.id}`);
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    getRoundList() {
      axios
        .get(roundApi.getRoundAll)
        .then((res) => {
          this.rounds = res.data;
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
  },
  created() {
    if (this.$route.query.roundId) {
      this.ruleForm.roundId = this.$route.query.roundId;
    }
    this.getRoundList();
  },
  data() {
    return {
      ruleForm: { name: "", description: "", date: "", round: "", roundId: "" },
      rounds: [],
    };
  },
})
export default class AddRoom extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  ruleForm: any;
  resetForm: any;
  submitForm: any;
  ruleFormRef: any;
  rounds: Array<{ id: string; name: string }> = [];
}
</script>

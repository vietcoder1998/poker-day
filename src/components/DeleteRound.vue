<template>
  <div>
    <el-checkbox v-model="checked1" label="Option 1" size="large" />
    <el-checkbox v-model="checked2" label="Option 2" size="large" />
  </div>
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
        .then((data) => {
          alert(JSON.stringify(data));
          this.$emit("getRound");
          this.$router.go(0);
        })
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

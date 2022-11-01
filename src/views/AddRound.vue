<template>
  <center-layout>
    <AddRound></AddRound>
  </center-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CenterLayout from "@/layout/CenterLayout.vue";
import axios from "axios";
import roomApi from "@/configs/roomApi";
import AddRound from "@/components/AddRound.vue";

@Options({
  components: {
    CenterLayout,
    AddRound,
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
export default class AddRoundClass extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  ruleForm: any;
  resetForm: any;
  submitForm: any;
  ruleFormRef: any;
}
</script>

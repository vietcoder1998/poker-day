<template>
  <el-form
    ref="roomDataRef"
    :model="roomData"
    status-icon
    label-width="120px"
    class="demo-roomData"
  >
    <el-form-item label="Name" prop="pass">
      <el-input
        v-model="roomData.name"
        type="text"
        autocomplete="on"
        required
      />
    </el-form-item>
    <el-form-item label="Description" prop="checkPass">
      <el-input
        v-model="roomData.description"
        type="textarea"
        defaultValue="This is the description"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Round" prop="round">
      <el-select
        v-model="roomData.roundId"
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
    <el-form-item label="Game Type">
      <el-select
        v-model="roomData.type"
        class="m-2"
        placeholder="Select"
        defaultValue="poker"
        size="large"
      >
        <el-option label="Poker" value="poker" />
        <el-option label="Sam" value="sam" />
      </el-select>
    </el-form-item>
    <el-form-item label="Date" prop="date">
      <el-date-picker
        v-model="roomData.date"
        type="date"
        label="Pick a date"
        placeholder="Pick a date"
        style="width: 100%"
        :default-time="new Date()"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(roomDataRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(roomDataRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import roomApi from "@/configs/roomApi";
import roundApi from "@/configs/roundApi";

@Options({
  name: "AddRoom",
  methods: {
    resetForm(form: any) {
      form.reset();
    },
    submitForm() {
      this.httpRequest
        .post(roomApi.addRoom, this.roomData)
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
      this.httpRequest
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
      this.roomData.roundId = this.$route.query.roundId;
    }
    this.getRoundList();
  },
  data() {
    return {
      roomData: {
        name: "",
        description: "",
        date: "",
        round: "",
        roundId: "",
        type: "poker",
      },
      rounds: [],
    };
  },
})
export default class AddRoom extends Vue {
  tableData: Array<{ date: string; name: string; state: string }> | undefined;
  roomData: any;
  resetForm: any;
  submitForm: any;
  roomDataRef: any;
  rounds: Array<{ id: string; name: string }> = [];
}
</script>

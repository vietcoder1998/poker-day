<template>
  <el-alert
    :title="title"
    :type="type"
    :description="description"
    :closable="isClosed"
    @close="$emit('close')"
    show-icon
  />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
@Options({
  name: "CustomAlert",
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
    description: {
      type: String,
      default: "",
    },
  },
})
export default class Alert extends Vue {
  isClosed: any;
  timeClose = 5000;
  title: any;
  description: any;
  type: any;
}
</script>

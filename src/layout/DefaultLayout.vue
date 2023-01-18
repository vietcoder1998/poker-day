<template v-if="isAuthenticated">
  <SideBar> </SideBar>
</template>

<script lang="ts">
import base from "@/mixins/base";

export default {
  mixins: [base],
  name: "DefaultLayout",
};
</script>

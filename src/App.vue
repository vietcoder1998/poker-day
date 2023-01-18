<template>
  <el-row>
    <el-col :md="3">
      <SideBar></SideBar>
    </el-col>
    <el-col :md="21">
      <router-view />
    </el-col>
  </el-row>
</template>
<script lang="ts">
import SideBar from "./layout/SideBar.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "App",
  components: {
    SideBar,
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

.el-breadcrumb__item {
  margin: 10px 0px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

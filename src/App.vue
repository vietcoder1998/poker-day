<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/room">Room</router-link>|
    <router-link to="/round">Round</router-link> |
    <router-link to="/users">Users</router-link> |
    <router-link to="/add-round">AddRound</router-link> |
    <router-link to="/add-user">AddUser</router-link> |
    <router-link to="/add-room">Add Room</router-link> |
    <router-link to="/about">About</router-link>
    <el-page-header @back="onBack"></el-page-header>
  </nav>
  <router-view />
</template>
<script>
export default {
  methods: {
    onBack() {
      this.$router.go(-1);
    },
  },
};
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

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

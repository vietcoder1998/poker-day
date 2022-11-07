<template>
  <el-row>
    <el-page-header @back="onBack" v-if="isAuthenticated">
      <template #breadcrumb>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/room' }">Room</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/round' }">
            Round
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/role' }">Role</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/users' }">
            Users
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/permission' }">
            Permission
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/add-round' }">
            Add Round
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/add-user' }">
            Add User
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/add-room' }">
            Add Room
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/add-role' }">
            Add Role
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/about' }">
            About
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </el-page-header>
  </el-row>
  <router-view />
</template>
<script>
export default {
  methods: {
    onBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
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

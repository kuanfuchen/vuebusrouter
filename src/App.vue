<template>
  <div>
    <!-- <NavHeader /> -->
    <router-view />
  </div>
</template>
<script>
import NavHeader from "./components/NavHeader.vue";
export default {
  components: {
    NavHeader,
  },
};
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "@/assets/scss/all.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

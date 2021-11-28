<template>
  <div class="w-100 header d-flex justify-content-between align-items-center">
    <div class="logoImg">
      <router-link to="/"><img src="../assets/busImg/logo3.png" /></router-link>
    </div>
    <div>
      <router-link to="/citybus"><a href="#">市區公車</a></router-link>
      <router-link to="/roadpassengertransport"
        ><a href="#">公路客運</a></router-link
      >
      <router-link to="/rideplan"><a href="#">乘車規劃</a></router-link>
    </div>
  </div>
</template>
<style lang="scss">
.header {
  height: 54px;
  background-color: #161933;
  a {
    text-decoration: none;
    color: #fff;
    margin-right: 24px;
    &:hover {
      filter: drop-shadow(0 0 8px #d032d3);
    }
  }
  .logoImg {
    cursor: pointer;
    margin-left: 24px;
  }
}
</style>
<template>
  <div class="home">
    <div class="gradualBg">
      <div :style="homeBg" class="row">
        <div class="align-self-center">
          <div style="margin-bottom: 24px">
            <img src="../assets/busImg/logo2.png" />
          </div>
          <p class="text-white indexText">
            <span>提供最即時的公車動態，讓你輕鬆掌握資訊，</span><br />
            <span>現在就開始規劃您的路線吧!</span>
          </p>
          <router-link to="/citybus">
            <div class="btn btn-special">
              <span class="d-flex justify-content-between" style="width: 185px"
                ><img class="me-2" src="../assets/icon/bus.png" />
                <span class="textlocation">市區公車</span></span
              >
            </div>
          </router-link>
          <router-link to="/roadpassengertransport">
            <div class="btn btn-special btnGap-special">
              <span class="d-flex justify-content-between" style="width: 185px"
                ><img class="me-2" src="../assets/icon/bus.png" />
                <span class="textlocation">公路客運</span></span
              >
            </div>
          </router-link>
          <router-link to="/rideplan">
            <div class="btn btn-special">
              <span class="d-flex justify-content-between" style="width: 185px"
                ><img class="me-2" src="../assets/icon/bus.png" />
                <span class="textlocation">乘車規劃</span></span
              >
            </div>
          </router-link>

          <div class="d-flex">
            <div class="busPosition">
              <img src="../assets/busImg/bus.png" />
            </div>
            <div class="busStationPosition">
              <img src="../assets/busImg/station.png" />
            </div>
            <div class="personPosition">
              <img src="../assets/busImg/person.png" style="height: 110px" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "Home",
  components: {
    Footer,
  },
  data() {
    return {
      homeBg: {
        width: "100vw",
        height: "100vh",
        zIndex: "2",
        backgroundSize: "cover",
        backgroundImage: `url(${require("@/assets/busImg/background.png")})`,
        // backgroundRepeat: "no-repeat",
      },
    };
  },
};
</script>
<style lang="scss">
.busPosition {
  position: absolute;
  left: 21.5%;
  bottom: 9%;
}
.busStationPosition {
  position: absolute;
  right: 11.8%;
  bottom: 9%;
}
.personPosition {
  position: absolute;
  right: 19%;
  bottom: 5%;
}
</style>

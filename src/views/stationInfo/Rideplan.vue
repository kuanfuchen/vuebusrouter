<template>
  <div class="gradualBg">
    <NavHeader />
    <!--  -->
    <div class="d-flex justify-content-center" :style="homeBg">
      <h1 class="mt-5 text-white">架構中....</h1>
    </div>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader.vue";
export default {
  name: "rideplan",
  components: {
    NavHeader,
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
      busImgHalf: {
        backgroundImage: `url(${require("@/assets/busImg/bus.png")})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      },
    };
  },
};
</script>
<style lang="scss">
.gradualBg {
  overflow-x: hidden;
  overflow-y: hidden;
}
.busImgHalfStyle {
  margin-top: -15px;
  margin-left: -300px;
}
.searchBusNum {
  margin-top: 20px;
  margin-left: 24px;
  margin-right: 24px;
  width: 23.5%;
  height: 74vh;

  // border-radius: 10px;
  background: #161933 81%;

  .searchBusNumDiv {
    margin-top: 12px;
    margin-left: 20px;
    margin-right: 20px;

    .searchBusNumInput {
      border: 3px solid #c0a7c4;
      border-radius: 25px;
      background: #161933 81%;
      color: #fff;
      margin-bottom: 12px;
    }

    .searchIncluidInfo {
      background: rgba(102, 86, 130, 0.47);
      height: calc(74vh - 216px - 12px - 51px);
      margin-bottom: 18px;
      overflow-y: auto;

      .searchCardInfo {
        border: 3px solid #c0a7c4;
        height: 80px;
        margin-top: 10px;
        background: rgba(102, 86, 130, 0.47);
        color: #c0a7c4;
      }
    }
    .btnAll {
      height: 216px;
    }
    .btnSearch {
      color: #fff;
      border: 3px solid #665682;
      background: #161933 81%;
      font-weight: 600;
      border-radius: 5px;
      width: 50px;
      height: 34px;
      &:hover {
        color: #161933;
        background: #665682;
      }
    }
    .btnSearchRegular {
      font-size: 12px;
    }
  }
}
.searchRouter {
  width: 23.5%;
  height: calc(100vh - 54px);
  .searchRouterTabs {
    height: 41px;
    // margin-left: 10px;
    background: #443b68;
    .bgTab {
      color: #c0a7c4;
      &:active {
        color: #fff;
        border-bottom: 3px solid #fff;
      }
    }
  }
  .searchRouterPanel {
    // margin-left: 10px;
    background-color: rgba(22, 25, 51, 0.81);
    height: calc(100vh - 54px - 41px);
    .busStyleImgHalfUp {
      width: 44px;
      height: 31px;
      background: #3b236c;
      border-radius: 10px 10px 0 0;
      font-size: 12px;
      color: #fff;
    }
    .busStyleImgHalfBottom {
      width: 44px;
      height: 31px;
      background: #fff;
      border-radius: 0 0 10px 10px;
      .cube {
        width: 23px;
        height: 12px;
        background: #9cd7ea;
      }
    }
    .searchLine {
      position: relative;
      .searchLineContent {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        border-left: 3px solid #c0a7c4;
        z-index: 10;
      }
      .circleStationIcon {
        position: absolute;
        top: 30px;
        left: -12px;
        width: 20px;
        height: 20px;
        border: 2px solid #c0a7c4;
        border-radius: 50%;
        background: #000;

        span {
          color: #fff;
          font-size: 6px;
          display: flex;
          justify-content: center;
          margin-top: 2px;
        }
      }
    }
  }
}
.mapCube {
  margin-left: 18px;
  width: calc(53vw - 68px);
  height: calc(100vh - 55px);
  background: #fff;
}
</style>


<template>
  <div class="highwayBusBg">
    <NavHeader />
    <!--  -->
    <div class="d-flex" :style="homeBg">
      <div class="searchBusNum card">
        <div class="searchBusNumDiv">
          <!-- <label for="exampleFormControlInput1" class="form-label">Email address</label> -->
          <input
            type="text"
            class="searchBusNumInput form-control"
            placeholder="請輸入公車路線編號"
            v-model="busNumber"
          />
          <div class="card searchIncluidInfo px-3">
            <div
              class="card px-1 searchCardInfo"
              v-for="(busNo, key) in searchBusNo"
              :key="key"
              @click="
                routeInfoFn(0, busNo.no, busNo.startStation, busNo.endStation)
              "
            >
              <p class="text-start" style="font-size: 18px">{{ busNo.no }}</p>
              <div
                class="d-flex mt-3 justify-content-between ellipsis"
                style="font-size: 12px"
              >
                <p>{{ busNo.startStation }}-{{ busNo.endStation }}</p>
                <p>{{ busNo.city }}</p>
              </div>
            </div>
          </div>
          <div class="btnAll">
            <div class="d-flex justify-content-around">
              <button class="btnSearch">紅</button>
              <button class="btnSearch">藍</button>
              <button class="btnSearch" @click="busNumber += 1">1</button>
              <button class="btnSearch" @click="busNumber += 2">2</button>
              <button class="btnSearch" @click="busNumber += 3">3</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch" @click="busNumber += 綠">綠</button>
              <button class="btnSearch" @click="busNumber += 棕">棕</button>
              <button class="btnSearch" @click="busNumber += 4">4</button>
              <button class="btnSearch" @click="busNumber += 5">5</button>
              <button class="btnSearch" @click="busNumber += 6">6</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch" @click="busNumber += 橘">橘</button>
              <button class="btnSearch" @click="busNumber += 黃">黃</button>
              <button class="btnSearch" @click="busNumber += 7">7</button>
              <button class="btnSearch" @click="busNumber += 8">8</button>
              <button class="btnSearch" @click="busNumber += 9">9</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch btnSearchRegular">更多</button>
              <button class="btnSearch btnSearchRegular">幹線</button>
              <button
                class="btnSearch btnSearchRegular"
                @click="
                  busNumber = '';
                  searchBusNo = [];
                "
              >
                重設
              </button>
              <button class="btnSearch" @click="busNumber += 0">0</button>
              <button class="btnSearch" @click="decreaseBusNum">
                <img src="../../assets/icon/Component1.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="busImgHalfStyle">
        <!-- <div :style="busImgHalf"></div> -->
        <img
          src="../../assets/busImg/road.png"
          style="width: 50%; z-index: 5; opacity: 0.8"
        />
      </div>
      <div class="searchRouter">
        <div class="searchRouterTabs">
          <div class="container row" v-if="busRouterNumIf">
            <div
              class="col-6 bgTab mt-2 ellipsis"
              :class="{
                activeSearchTab:
                  activeLine === endStopNameZh && activeLine !== '',
              }"
              @click="
                activeLine = endStopNameZh;
                routeInfoFn(0);
              "
            >
              <!--  -->
              往{{ endStopNameZh }}
            </div>
            <div
              class="col-6 mt-2 bgTab ellipsis"
              :class="{
                activeSearchTab:
                  activeLine === startStopNameZh && activeLine !== '',
              }"
              @click="
                activeLine = startStopNameZh;
                routeInfoFn(1);
              "
            >
              <!--  -->
              往{{ startStopNameZh }}
            </div>
          </div>
          <div
            class="container d-flex text-white justify-content-center"
            v-else
          >
            <div style="margin-top: 13px; cursor: default">
              請先輸入公車編碼
            </div>
          </div>
        </div>
        <div
          class="searchRouterPanel"
          style="overflow-y: auto; overflow-x: hidden"
        >
          <div class="row" v-for="(stop, key) in cityBusStopName" :key="key">
            <div
              class="col-7 d-flex align-items-center justify-content-between"
            >
              <div class="mt-2 ms-1">
                <div
                  class="
                    busStyleImgHalfUp
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <span>公路公車</span>
                </div>
                <div
                  class="
                    busStyleImgHalfBottom
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="cube"></div>
                </div>
              </div>
              <div class="text-white mt-2 stopTextStyle">
                {{ stop.stopname }}
              </div>
            </div>
            <div class="col-5 searchLine">
              <div class="searchLineContent">
                <div class="circleStationIcon">
                  <span>{{ stop.stopsequence }}</span>
                </div>
                <div class="circleBusIcon" v-if="stop.PlateNumb">
                  <img style="width: 50%" src="../../assets/icon/bus.png" />
                  <p class="stopBusNum">{{ stop.PlateNumb }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mapCube">
        <l-map
          ref="myMap"
          :zoom="zoom"
          :center="localCenter"
          :options="mapOptions"
          class="mapCubeHeight"
        >
          <l-tile-layer :url="urlLocal" :attribution="localAttribution" />
          <l-marker
            :lat-lng="[stop.stopPositionLat, stop.stopPositionLon]"
            v-for="(stop, index) in cityBusStopName"
            :key="index"
          >
            <l-icon
              :icon-url="icon.black"
              :shadow-url="icon.shadowUrl"
              :icon-size="icon.iconSize"
              :icon-anchor="icon.iconAnchor"
              :popup-anchor="icon.popupAnchor"
              :shadow-size="icon.shadowSize"
            />
            <l-popup>
              <div style="font-size: 14px" class="badgeBusStopInfo">
                {{ stop.stopname }}
              </div>
              <span class="badgeBusStopInfo">路線:{{ stop.busName }}</span>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>
<script>
import cityName from "@/components/cityName.json";
import jsSHA from "jssha";
import NavHeader from "@/components/NavHeader.vue";
export default {
  name: "roadpassengertransport",
  components: {
    NavHeader,
  },
  data() {
    return {
      activeLine: "",
      busRouterNumIf: false,
      cityName: cityName,
      busNumber: "",
      directionRouter: "",
      startStopNameZh: "",
      endStopNameZh: "",
      cityBusLine: [],
      cityBusStopName: [],
      moveBusData: [],
      searchBusNo: [],
      selectRoutLine: "",
      busArrive: "false",
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
      zoom: "15",
      localCenter: [25.0375417, 121.5644327],
      mapOptions: {
        zoomControl: false,
      },
      localAttribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      urlLocal: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      icon: {
        iconSize: [25, 34.5],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        black: `${require("@/assets/busImg/BusSign.png")}`,
      },
    };
  },
  methods: {
    getAuthorizationHeader() {
      const AppID = "71661ab7d83947fd9e8553690d6cc7bc";
      const AppKey = "5Wd31rSWRfudLXs4hoL7jdfTs5U";
      // // id，key過兩天移除
      const GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      const HMAC = ShaObj.getHMAC("B64");
      const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
      return {
        Authorization: Authorization,
        "X-Date": GMTString,
      };
    },
    routerInterCity() {
      this.cityBusLine = [];
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/InterCity`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        const line = response.data;
        console.log(line);
        for (let i = 0; line.length > i; i++) {
          this.cityBusLine.push({
            no: line[i].RouteName.Zh_tw,
            startStation: line[i].DepartureStopNameZh,
            endStation: line[i].DestinationStopNameZh,
            RouteUID: line[i].RouteUID,
          });
        }
      });
    },
    routeInfoFn(dirction = 0, BusNo, startStop, endStop) {
      if (BusNo !== undefined) {
        this.selectRoutLine = BusNo;
        this.startStopNameZh = startStop;
        this.endStopNameZh = endStop;
        this.activeLine = endStop;
      }
      this.busRouterNumIf = true;
      this.cityBusStopName = [];
      this.directionRouter = dirction;
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/InterCity/${this.selectRoutLine}`,
        // url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.selectCity}/${this.selectRoutLine}`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        console.log(response.data);
        const stopNameInfo = response.data;
        for (let i = 0; stopNameInfo[dirction].Stops.length > i; i++) {
          this.cityBusStopName.push({
            busName: stopNameInfo[dirction].RouteName.Zh_tw,
            stopname: stopNameInfo[dirction].Stops[i].StopName.Zh_tw,
            stopsequence: stopNameInfo[dirction].Stops[i].StopSequence,
            stopId: stopNameInfo[dirction].Stops[i].StopUID,
            stopPositionLat:
              stopNameInfo[dirction].Stops[i].StopPosition.PositionLat,
            stopPositionLon:
              stopNameInfo[dirction].Stops[i].StopPosition.PositionLon,
          });
        }
        // console.log(this.cityBusStopName);

        this.localCenter = [
          this.cityBusStopName[0].stopPositionLat,
          this.cityBusStopName[0].stopPositionLon,
        ];

        this.movingBusFn();
      });
    },
    movingBusFn() {
      this.moveBusData = [];
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/InterCity/${this.selectRoutLine}`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        const moveBus = response.data;
        for (let i = 0; moveBus.length > i; i++) {
          if (this.directionRouter === moveBus[i].Direction) {
            for (let j = 0; this.cityBusStopName.length > j; j++) {
              if (this.cityBusStopName[j].stopId === moveBus[i].StopUID) {
                if (!this.cityBusStopName[j].PlateNumb) {
                  this.cityBusStopName[j].PlateNumb = moveBus[i].PlateNumb;
                }
              }
            }
          }
        }
        console.log(this.cityBusStopName);
      });
    },
    searchBusRouter(val) {
      this.searchBusNo = [];
      for (let i = 0; this.cityBusLine.length > i; i++) {
        let searchBusline = this.cityBusLine[i].no.indexOf(val);
        if (searchBusline !== -1) {
          this.searchBusNo.push(this.cityBusLine[i]);
        }
      }
    },
    decreaseBusNum() {},
  },
  watch: {
    busNumber(val) {
      if (val.length > 1) {
        this.searchBusRouter(val);
      }
      if (val.length === 0) {
        this.searchBusNo = [];
      }
    },
  },
  async mounted() {
    await this.routerInterCity();

    this.$nextTick(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const p = position.coords;
        this.localCenter = [p.latitude, p.longitude];
        // 將目前的位置的標記點彈跳視窗打開
        // this.$refs.location.mapObject.openPopup();
      });
    });
  },
};
</script>
<style lang="scss">
.gradualBg {
  overflow-x: hidden;
  overflow-y: hidden;
}
.busImgHalfStyle {
  position: absolute;
  bottom: 0;
  left: -100px;
  z-index: 5;
  // margin-top: -100px;
  // margin-left: -300px;
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
    z-index: 50;
    opacity: 0.8;
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
        height: 65px;
        margin-top: 10px;
        background: rgba(102, 86, 130, 0.47);
        color: #c0a7c4;
        cursor: pointer;
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
    cursor: pointer;
    height: 41px;
    font-size: 14px;
    // margin-left: 10px;
    background: #443b68;
    .bgTab {
      color: #c0a7c4;
    }
  }
  .activeSearchTab {
    padding-bottom: 12px;
    color: #fff !important;
    border-bottom: 3px solid #fff;
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
        left: 30%;
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
      .circleBusIcon {
        // position: absolute;
        margin-top: 30px;
        margin-left: 5px;
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
.mapCubeHeight {
  width: calc(53vw - 68px);
  height: calc(100vh - 55px);
}
.stopTextStyle {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 1.2px;
}
.stopBusNum {
  color: #fff;
  font-size: 6px;
}
.badgeBusStopInfo {
  color: #3b236c;
  font-weight: 600;
}
</style>
<template>
  <div class="gradualBg">
    <NavHeader />
    <!--  -->
    <div class="row" :style="homeBg">
      <div class="searchBusNum card col-6 col-md-3">
        <div class="searchBusNumDiv">
          <!-- <label for="exampleFormControlInput1" class="form-label">Email address</label> -->
          <!--  -->
          <div class="searchRouterTabs mb-1">
            <div class="container row">
              <div
                class="col-6 bgTab ellipsis"
                :class="{ searchActive: activeSearch === 'all' }"
                @click="searchTaiwanFn()"
                style="font-size: 16px"
              >
                全台搜索
              </div>
              <div
                class="col-6 bgTab ellipsis"
                :class="{ searchActive: activeSearch === 'city' }"
                @click="citySearchFn()"
                style="font-size: 16px"
              >
                縣市搜索
              </div>
            </div>
          </div>
          <!--  -->
          <div v-if="activeSearch === 'all'">
            <input
              type="text"
              class="searchBusNumInput mt-1"
              placeholder="請輸入公車路線編號"
              v-model="busNumber"
            />
          </div>
          <div v-if="activeSearch === 'city'">
            <select
              class="form-select-sm searchCityBusNumInput"
              aria-label=".form-select-sm example"
              v-model="selectSingleCity"
            >
              <option disabled label="請選擇">請選擇</option>
              <option
                v-for="(city, index) in cityName.Taiwan"
                :key="index"
                :label="city.name"
                :value="city.value"
              ></option>
            </select>
            <input
              type="text"
              placeholder="請輸入公車編號"
              v-model="singlecityBusNum"
              class="searchCityBusNumInput form-control-sm"
            />
          </div>
          <div class="card searchIncluidInfo px-3">
            <div
              class="card px-1 searchCardInfo"
              v-for="(busNo, key) in searchBusNo"
              :key="key"
              @click="
                routeInfoFn(
                  0,
                  busNo.no,
                  busNo.startStation,
                  busNo.endStation,
                  busNo.cityEn
                )
              "
            >
              <div class="searchPosition">
                <p class="text-start" style="font-size: 18px">{{ busNo.no }}</p>

                <div class="d-flex ellipsis" style="font-size: 12px">
                  <p class="searchPositionTextRange ellipsis">
                    {{ busNo.startStation }}-{{ busNo.endStation }}
                  </p>
                  <p class="searchPositionTextCity ellipsis">
                    {{ busNo.city }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="btnAll">
            <div class="d-flex justify-content-around">
              <button class="btnSearch">紅</button>
              <button class="btnSearch">藍</button>
              <button class="btnSearch" @click="keyNumFn('1')">1</button>
              <button class="btnSearch" @click="keyNumFn('2')">2</button>
              <button class="btnSearch" @click="keyNumFn('3')">3</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch" @click="keyNumFn('綠')">綠</button>
              <button class="btnSearch" @click="keyNumFn('棕')">棕</button>
              <button class="btnSearch" @click="keyNumFn('4')">4</button>
              <button class="btnSearch" @click="keyNumFn('5')">5</button>
              <button class="btnSearch" @click="keyNumFn('6')">6</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch" @click="keyNumFn('橘')">橘</button>
              <button class="btnSearch" @click="keyNumFn('黃')">黃</button>
              <button class="btnSearch" @click="keyNumFn('7')">7</button>
              <button class="btnSearch" @click="keyNumFn('8')">8</button>
              <button class="btnSearch" @click="keyNumFn('9')">9</button>
            </div>
            <div class="d-flex justify-content-around mt-2">
              <button class="btnSearch btnSearchRegular">更多</button>
              <button class="btnSearch btnSearchRegular">幹線</button>
              <button
                class="btnSearch btnSearchRegular"
                @click="
                  busNumber = '';
                  selectSingleCity = '';
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
        <div class="busImgHalfStyle">
          <!-- <div :style="busImgHalf"></div> -->
          <img :src="busImage" />
        </div>
      </div>
      <div class="searchRouter col-6 col-md-3">
        <div class="searchRouterTabs">
          <div class="container row" v-if="cityBusTabIf">
            <div
              class="col-6 bgTab pt-2 ellipsis"
              style="font-size: 14px"
              :class="{ activeSearchTab: activeLine === endStopNameZh }"
              @click="
                activeLine = endStopNameZh;
                routeInfoFn(0);
              "
            >
              <!--  -->
              往{{ endStopNameZh }}
            </div>
            <div
              style="font-size: 14px"
              class="col-6 pt-2 bgTab ellipsis"
              :class="{ activeSearchTab: activeLine === startStopNameZh }"
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
                  <span>Bus</span>
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
      <div class="mapCube col-md-6 col-12 px-0">
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
// import Map from "@/components/Map.vue";
export default {
  name: "citybus",
  components: {
    NavHeader,
    // Map,
  },
  data() {
    return {
      cityBusTabIf: false,
      activeSearch: "all",
      selectCity: "",
      activeLine: "",
      cityName: cityName,
      busNumber: "",
      busImage: `${require("@/assets/busImg/bus.png")}`,
      directionRouter: "",
      startStopNameZh: "",
      endStopNameZh: "",
      cityBusLine: [],
      singleCityBusData: [],
      selectRouteCity: "",
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
      selectSingleCity: "請選擇",
      singlecityBusNum: "",
    };
  },
  methods: {
    getAuthorizationHeader() {
      const AppID = "71661ab7d83947fd9e8553690d6cc7bc";
      const AppKey = "5Wd31rSWRfudLXs4hoL7jdfTs5U";
      // id，key過兩天移除
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
    cityInfoFn() {
      // this.cityBusLine = [];
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.selectCity}`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        const line = response.data;
        let city;
        let cityEn;
        for (let i = 0; line.length > i; i++) {
          this.cityName.Taiwan.filter((item) => {
            const cityIndex = item.value.indexOf(line[i].City);
            if (cityIndex !== -1 && item.value.length === line[i].City.length) {
              city = item.name;
              cityEn = item.value;
            }
          });
          this.cityBusLine.unshift({
            no: line[i].RouteName.Zh_tw,
            startStation: line[i].DepartureStopNameZh,
            endStation: line[i].DestinationStopNameZh,
            RouteUID: line[i].RouteUID,
            city: city,
            cityEn: cityEn,
          });
        }
      });
    },
    singleCityFn() {
      if (this.selectSingleCity === "") {
        return;
      }
      this.singleCityBusData = [];
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.selectSingleCity}`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        const line = response.data;
        let city;
        let cityEn;
        for (let i = 0; line.length > i; i++) {
          this.cityName.Taiwan.filter((item) => {
            const cityIndex = item.value.indexOf(line[i].City);
            if (cityIndex !== -1 && item.value.length === line[i].City.length) {
              city = item.name;
              cityEn = item.value;
            }
          });
          this.singleCityBusData.unshift({
            no: line[i].RouteName.Zh_tw,
            startStation: line[i].DepartureStopNameZh,
            endStation: line[i].DestinationStopNameZh,
            RouteUID: line[i].RouteUID,
            city: city,
            cityEn: cityEn,
          });
          if (this.singlecityBusNum !== "") {
            this.searchsinglecityBusRouter();
          }
        }
        // console.log(this.singleCityBusData);
      });
    },
    routeInfoFn(dirction = 0, BusNo, startStop, endStop, cityVal) {
      if (BusNo !== undefined) {
        this.selectRoutLine = BusNo;
        this.startStopNameZh = startStop;
        this.endStopNameZh = endStop;
        this.activeLine = endStop;
        this.selectRouteCity = cityVal;
      }
      console.log(this.selectRouteCity);
      this.cityBusTabIf = true;
      this.cityBusStopName = [];
      this.directionRouter = dirction;
      // /v2/Bus/EstimatedTimeOfArrival/City/{City}/{RouteName}
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.selectRouteCity}/${this.selectRoutLine}`,
        headers: this.getAuthorizationHeader(),
      }).then((response) => {
        const stopNameInfo = response.data;
        console.log(stopNameInfo);
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
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/${this.selectRouteCity}/${this.selectRoutLine}`,
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
      });
    },
    searchTaiwanFn() {
      this.activeSearch = "all";
      this.singlecityBusNum = "";
      this.searchBusNo = [];

      // this.selectSingleCity = "";
    },
    citySearchFn() {
      this.activeSearch = "city";
      this.busNumber = "";
      this.searchBusNo = [];
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
    searchsinglecityBusRouter() {
      this.searchBusNo = [];
      console.log(this.singlecityBusNum);
      for (let i = 0; this.singleCityBusData.length > i; i++) {
        const singlecityLine = this.singleCityBusData[i].no.indexOf(
          this.singlecityBusNum
        );
        if (singlecityLine !== -1) {
          this.searchBusNo.push(this.singleCityBusData[i]);
        }
      }
    },
    decreaseBusNum() {
      if (this.activeSearch === "all") {
        const splitBusNum = this.busNumber.split("");
        let strNum = "";
        splitBusNum.splice(splitBusNum.length - 1, 1);
        for (let i = 0; splitBusNum.length > i; i++) {
          strNum += splitBusNum[i];
        }
        this.busNumber = strNum;
      } else if (this.activeSearch === "city") {
        const splitBusNum = this.singlecityBusNum.split("");
        let strNum = "";
        splitBusNum.splice(splitBusNum.length - 1, 1);
        for (let i = 0; splitBusNum.length > i; i++) {
          strNum += splitBusNum[i];
        }
        this.singlecityBusNum = strNum;
      }
    },
    keyNumFn(num) {
      if (this.activeSearch === "all") {
        this.busNumber += num;
      } else if (this.activeSearch === "city") {
        this.singlecityBusNum += num;
      }
    },
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
    singlecityBusNum(val) {
      if (val.length === 0) {
        this.searchBusNo = [];
        return;
      }
      this.searchsinglecityBusRouter();
    },
    selectSingleCity(val) {
      this.singleCityFn();
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const p = position.coords;
    //     // 將中心點設為目前的位置
    //     this.localCenter = [p.latitude, p.longitude];
    //     // 將目前的位置的標記點彈跳視窗打開
    //     // this.$refs.location.mapObject.openPopup();
    //   });
    // });
    const TaiwanVal = this.cityName.Taiwan;
    const vm = this;
    if (this.cityBusLine.length > 0) {
      return;
    }
    return new Promise((resolve) => {
      resolve();
      for (let i = 0; TaiwanVal.length > i; i++) {
        vm.selectCity = TaiwanVal[i].value;
        vm.cityInfoFn();
      }
    });
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/citybus.scss";
</style>
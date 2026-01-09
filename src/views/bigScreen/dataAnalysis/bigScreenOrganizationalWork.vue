<template>
  <div style="background-color: black; width: 100%; height: 100vh">
    <div id="index" ref="appRef">
      <div v-if="state === 1">
        <div class="bg">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <div v-else class="host-body">
            <div class="d-flex jc-center">
              <dv-decoration-10 class="dv-dec-10" />
              <div class="d-flex jc-center">
                <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
                <div class="title">
                  <p class="title-logo"></p>
                  <span class="title-text">组工看板</span>
                  <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
                </div>
                <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="decorationColor" />
              </div>
              <dv-decoration-10 class="dv-dec-10-s" />
            </div>

            <!-- 第二行 -->
            <div style="padding: 1px;">
              <div style="display: flex; height: 22px; ">
                <el-button type="primary" style="margin-left: 3%;" @click="returnIndex">返回主界面</el-button>
              </div>
            </div>

            <div v-if="type === 0">
              <div class="body-box">
                <!-- 第三行数据 -->
                <div class="content-box">
                  <dv-border-box-12>
                    <oCadreNumbersDistribution />
                  </dv-border-box-12>
                  <dv-border-box-13>

                    <oUnitNameDistribution />
                  </dv-border-box-13>
                </div>

                <!-- 第四行数据 -->
                <div class="bottom-box">
                  <!-- <dv-border-box-13>
                    <oActiveTimeDistribution />
                  </dv-border-box-13> -->
                  <div>
                    <dv-border-box-12>
                      <oCadreTypeDistribution />
                    </dv-border-box-12>
                  </div>
                  <div>
                    <dv-border-box-12>
                      <oCadreJobDistribution />
                    </dv-border-box-12>
                  </div>
                  <div>
                    <dv-border-box-13>
                      <osjtDistribution />
                    </dv-border-box-13>
                  </div>
                </div>
              </div>
              
              <div class="bottom-text">
                <span>保护学校信息安全，严禁处理、传输国家秘密，严禁向任何第三方提供“数据南理”数据。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/utils/service";
import drawMixin from "@/utils/drawMixin";
import { formatTime } from "@/utils/index.js";
import oCadreTypeDistribution from "./organizationalWorkComponents/oCadreTypeDistribution.vue";
import osjtDistribution from "./organizationalWorkComponents/osjtDistribution";
import oUnitNameDistribution from "./organizationalWorkComponents/oUnitNameDistribution";
// import oActiveTimeDistribution from "./organizationalWorkComponents/oActiveTimeDistribution";
import oCadreJobDistribution from "./organizationalWorkComponents/oCadreJobDistribution";
import oCadreNumbersDistribution from "./organizationalWorkComponents/oCadreNumbersDistribution";
export default {
  mixins: [drawMixin],
  data() {
    return {
      state: 0,

      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
      type: 0,
      colorName: "red",
    };
  },
  components: {
    //   pleftUp,
    //   prightUp1,
    //   prightUp2,
    //   prightUp3,
    oCadreTypeDistribution,
    osjtDistribution,
    oUnitNameDistribution,
    // oActiveTimeDistribution,
    oCadreJobDistribution,
    oCadreNumbersDistribution,
    // obottomRight,
    //   pleftDown,
    // centerLeft1,
    // centerLeft2,
    // centerRight1,
    // centerRight2,
    // center,
    // bottomLeft,
    // bottomRight,
    // map,
    // evaluationChart1,
    // evaluationChart2,
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
    this.indexStart();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    async indexStart() {
      document.title = '组工看板'
      service
        .get('organization/login')
        .then(res => {
          console.log(res.data)
          if (res.data.value === 1) {
            this.state = 1
            console.log("login success")
          }
          else if (res.data.value === 2) {
            this.$message({
              type: 'error',
              message: '尚未同意条款声明，暂无权限查看当前看板'
            });
          }
          else {
            this.$message({
              type: 'error',
              message: '无权限查看当前看板'
            });
          }
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: '无权限查看当前看板'
          });
          console.log(error);
        });
    },

    changePage(index) {
      this.type = index;
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    returnIndex() {
      this.$router.push({ name: 'Index' })
    },
  },
};
</script>

<style lang="scss" scoped>
#index {
  color: #d3d6dd;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    background-image: url("~@/assets/pageBg.png");
    background-size: cover;
    background-position: center center;
  }

  .el-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px;
    font-size: 16px;
    font-weight: bold;
    background-color: #4E67BD;
    border-color: #283669;
    color: #D7D8DA;
  }

  .el-button:hover {
    background-color: #5E7CE3;
  }

  .host-body {

    .dv-dec-10,
    .dv-dec-10-s {
      width: 33.3%;
      height: 5px;
    }

    .dv-dec-10-s {
      transform: rotateY(180deg);
    }

    .dv-dec-8 {
      width: 200px;
      height: 50px;
    }

    .title {
      position: relative;
      width: 600px;
      height: 50px;
      text-align: center;
      background-size: cover;
      background-repeat: no-repeat;

      .title-logo {
        position: absolute;
        height: 64px;
        width: 64px;
        left: 20%;
        top: 12%;
        background: url("~@/assets/logo1.png") center no-repeat;
        /*background-size: cover;*/
        background-size: 100% 100%;
      }

      .title-text {
        font-size: 28px;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%);
      }

      .dv-dec-6 {
        position: absolute;
        bottom: -30px;
        left: 50%;
        width: 200px;
        height: 8px;
        transform: translate(-50%);
      }
    }

    .body-box {
      margin-top: 16px;
      display: flex;
      flex-direction: column;

      //下方区域的布局
      // .content-box {
      //   display: grid;
      //   grid-template-columns: 2fr 4fr 2fr;
      // }

      // // 底部数据
      // .bottom-box {
      //   margin-top: 10px;
      //   display: grid;
      //   grid-template-columns: repeat(2, 50%);
      // }
      .content-box {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }

      // 底部数据
      .bottom-box {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 2fr 4fr 2fr;
      }
    }
  }

  .bottom-text {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
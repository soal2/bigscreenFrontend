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
                  <span class="title-text">核心数据学科分布看板</span>
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

            <div>
              <div class="body-box">
                <!-- 第三行数据 -->
                <div class="content-box">
                  <div>
                    <dv-border-box-12>
                      <ProvincialMinisterialScientificResearchPlatformDistribution />
                    </dv-border-box-12>
                  </div>
                  <div>
                    <dv-border-box-12>
                      <ScientificResearchAwardsDistribution />
                    </dv-border-box-12>
                  </div>
                  <div>
                    <dv-border-box-13>
                      <TeacherVirtueCultivationDistribution />
                    </dv-border-box-13>
                  </div>
                </div>

                <!-- 第四行数据 -->
                <div class="bottom-box">
                  <dv-border-box-13>
                    <ModelAdvancedStudentDistribution />
                  </dv-border-box-13>
                  <dv-border-box-12>
                    <PublishedTextbooksDistribution />
                  </dv-border-box-12>
                  <dv-border-box-13>
                    <NationalLevelCoursesDistribution />
                  </dv-border-box-13>
                  <dv-border-box-12>
                    <ProvincialTeachingAchievementAwardDistribution />
                  </dv-border-box-12>
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
</template>

<script>
import drawMixin from "@/utils/drawMixin";
import { formatTime } from "@/utils/index.js";
import service from "@/utils/service";

import TeacherVirtueCultivationDistribution from "./developmentPlanningComponets/teacherVirtueCultivationDistribution.vue";
import ProvincialMinisterialScientificResearchPlatformDistribution from "./developmentPlanningComponets/provincialMinisterialScientificResearchPlatformDistribution.vue";
import ModelAdvancedStudentDistribution from "./developmentPlanningComponets/modelAdvancedStudentDistribution.vue";
import PublishedTextbooksDistribution from "./developmentPlanningComponets/publishedTextbooksDistribution.vue";
import NationalLevelCoursesDistribution from "./developmentPlanningComponets/nationalLevelCoursesDistribution.vue";
import ProvincialTeachingAchievementAwardDistribution from "./developmentPlanningComponets/provincialTeachingAchievementAwardDistribution.vue";
import ScientificResearchAwardsDistribution from "./developmentPlanningComponets/scientificResearchAwardsDistribution.vue";

export default {
  name: 'BigScreenDevelopmentPlanning',
  mixins: [drawMixin],

  components: {
    TeacherVirtueCultivationDistribution,
    ScientificResearchAwardsDistribution,
    ProvincialMinisterialScientificResearchPlatformDistribution,
    ModelAdvancedStudentDistribution,
    PublishedTextbooksDistribution,
    NationalLevelCoursesDistribution,
    ProvincialTeachingAchievementAwardDistribution,
  },

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

  mounted() {
    //this.timeFn();
    this.cancelLoading();
    this.indexStart();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    async indexStart() {
      document.title = '核心数据学科分布看板'
      service
        .get('developmentPlanning/login')
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
    returnIndex() {
      this.$router.push({ name: 'Index' })
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
        left: 13%;
        top: 12%;
        background: url("~@/assets/logo1.png") center no-repeat;
        /*background-size: cover;*/
        background-size: 100% 100%;
      }

      .title-text {
        font-size: 28px;
        position: absolute;
        bottom: 0;
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
      .content-box {
        display: grid;
        grid-template-columns: 2fr 3fr 2fr;
      }

      // 底部数据
      .bottom-box {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 2fr 2fr 2fr 2fr;
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
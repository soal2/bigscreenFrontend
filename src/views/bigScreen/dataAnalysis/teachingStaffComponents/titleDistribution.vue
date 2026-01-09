<template>
  <div id="titleDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">教职工职称职位分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div style="padding-top: 2%;">
        <el-row>
          <el-col :span="5">
            <div style="padding-top: 12%;padding-left: 28%;">
              <el-row style="padding-bottom: 32%;width: 160px;" align="middle" v-for="i in 4" :key="i">
                <div style="padding-bottom: 14px;">
                  <h4 style="font-size: 24px;color: #3399ff;">{{ data2[i - 1].value }}人</h4>
                </div>
                <div>
                  <h4 style="font-size: 22px;">{{ data2[i - 1].name }}</h4>
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="chart-box">
              <div ref="chart1" class="chart-container"></div>
            </div>
            <div style="text-align: center;">
              <span style="color: #D7D8DA; font-size: 12px;">上图只统计事业编制、非事业编制人事代理、雇员制、短期合同方式聘用、博士后人员数据</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div style="padding-top: 12%;padding-left: 22%;">
              <el-row style="padding-bottom: 32%;width: 160px;" align="middle" v-for="i in 4" :key="i">
                <div style="padding-bottom: 14px;">
                  <h4 style="font-size: 24px;color: #3399ff;">{{ data2[i + 3].value }}人</h4>
                </div>
                <div>
                  <h4 style="font-size: 22px;">{{ data2[i + 3].name }}</h4>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: 'TitleDistribution',
  data() {
    return {
      chart1: null,
      data1: [
        { name: '教授', value: 407 },
        { name: '副教授', value: 259 },
        { name: '研究员', value: 321 },
        { name: '副研究员', value: 457 },
        { name: '助理研究员', value: 204 },
        { name: '讲师（高校）', value: 204 },
        { name: '工程师', value: 204 },
        { name: '其他', value: 204 },
      ],
      data1Total: 0,
      data2: [
        { name: '教授', value: 407 },
        { name: '副教授', value: 259 },
        { name: '研究员', value: 321 },
        { name: '副研究员', value: 457 },
        { name: '助理研究员', value: 204 },
        { name: '讲师（高校）', value: 204 },
        { name: '工程师', value: 204 },
        { name: '其他', value: 204 },
      ],
    };
  },
  mounted() {
    this.indexStart();
  },
  methods: {
    // 异步初始化
    async indexStart() {
      await this.initLoadData()
      await this.initCharts()
    },
    // 加载数据
    async initLoadData() {
      let rr = null

      await service
        .get('/teachingStaff/title15Distribution')
        .then(
          res => {
            console.log(res.data)
            if (res.data) {
              this.data1 = res.data
            }
            console.log("load titleDistribution success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      this.data1Total = 0
      for (let i = 0; i < this.data1.length; i++) {
        this.data1Total += this.data1[i].value
      }

      await service
        .get('/teachingStaff/titleDistribution')
        .then(
          res => {
            console.log(res.data)
            if (res.data) {
              rr = res.data
            }
            console.log("load titleDistribution success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < rr.length; i++) {
          for (let j = 0; j < this.data2.length; j++) {
            if (rr[i].name === this.data2[j].name) {
              this.data2[j].value = rr[i].value
              continue
            }
          }
        }
      }
      //this.data2 = Object.assign({}, this.data2)
    },
    // 
    async initCharts() {
      let _this = this
      this.chart1 = echarts.init(this.$refs.chart1);
      //console.log(this.data1)
      const option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}人({d}%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 10,
          padding: [10, 15],
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: '42%',
              z: 2,
              zlevel: 100,
              style: {
                text: this.data1Total + '人',
                fontSize: 28,
                fill: '#fff'
              }
            },
          ]
        },
        series: [
          {
            name: '教职工职称信息',
            type: 'pie',
            radius: ['48%', '65%'],
            center: ['50%', '44%'],
            data: this.data1,
            startAngle: 140,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            itemStyle: {
              borderColor: '#2a2a2a',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
            },
            emphasis: {
              itemStyle: {
                borderWidth: 4,
                borderColor: '#ff0',
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.7)',
              },
            },
            label: {
              show: true,
              fontSize: 18,
              color: '#fff',
              formatter: '{b}\n{d}%',
              overflow: 'truncate',
              lineHeight: 20,
            },
            labelLayout: {
              hideOverlap: false // 是否隐藏重叠标签
            },
          },
        ],
      };
      this.chart1.setOption(option1);
      this.chart1.on('click', function (params) {
        console.log("点击了" + params.componentType + params.name);
        if (params.componentType === 'series') {
          _this.$router.push({ name: 'TeachingStaff-Title15Detail', query: { name: params.name, } })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$box-height: 480px;

#titleDistribution {
  padding: 16px;
  border-radius: 10px;
  height: $box-height;

  .bg-color-black {
    border-radius: 10px;
    height: $box-height - 30px;
  }

  .text {
    color: #D7D8DA; //#c3cbde
    font-size: 19px;
    font-weight: bold;
  }

  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  /* 每个饼状图的盒子 */
  .chart-box {
    width: 100%;
    height: 380px;
    border-radius: 15px;
    overflow: hidden;
  }

  /* 饼状图本身的容器 */
  .chart-container {
    width: 100%;
    height: 100%;
  }

  .table-item {
    border-radius: 4px;
    min-height: 36px;
  }
}
</style>
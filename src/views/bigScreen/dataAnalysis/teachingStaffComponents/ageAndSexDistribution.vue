<template>
  <div id="ageAndSexDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">在校教职工年龄和性别分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>

      <!-- 上下排列的饼状图容器 -->
      <div class="charts-container">
        <div class="chart-box">
          <div ref="chart1" class="chart-container"></div>
        </div>
        <div class="chart-box mt-5">
          <div ref="chart2" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: "AgeAndSexDistribution",
  data() {
    return {
      chart1: null,
      chart2: null,
      // 硕士年级分布数据
      data1: [
        { name: '研一', value: 4950 },
        { name: '研二', value: 4658 },
        { name: '研三', value: 4658 },
        { name: '其他', value: 1660 },
        { name: '超期未毕业', value: 1830 },
      ],
      data1Total: 0,
      // 博士在校年份分布数据
      data2: [
        { name: '在校1年', value: 623 },
        { name: '在校2年', value: 784 },
        { name: '在校3年', value: 717 },
        { name: '在校4年', value: 619 },
        { name: '肄业人数', value: 271 },
        { name: '其他', value: 1403 },
      ],
      data2Total: 0,
    };
  },
  mounted() {
    this.indexStart();
  },
  methods: {
    async indexStart() {
      await this.initLoadData()
      await this.initCharts()
    },
    // 加载数据
    async initLoadData() {
      await service
        .get('teachingStaff/ageDistribution')
        .then(
          res => {
            console.log(res.data)
            this.data1 = res.data
            console.log("load ageDistribution success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      await service
        .get('teachingStaff/sexDistribution')
        .then(
          res => {
            console.log(res.data)
            this.data2 = res.data
            console.log("load sexDistribution success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      // 获取总人数
      this.data1Total = 0
      this.data2Total = 0
      for (let i = 0; i < this.data1.length; i++) {
        this.data1Total += this.data1[i].value
      }
      for (let i = 0; i < this.data2.length; i++) {
        this.data2Total += this.data2[i].value
      }
      console.log(this.data1Total, this.data2Total)
    },
    // 初始化饼状图
    initCharts() {
      let _this = this
      this.chart1 = echarts.init(this.$refs.chart1);
      const option1 = {
        title: {
          text: '年\n龄\n分\n布',
          right: '4%',
          top: '36%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 20,
          },
        },
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
              left: '40%',
              top: '57%',
              z: 2,
              zlevel: 100,
              style: {
                text: this.data1Total + '人',
                fontSize: 17,
                fill: '#fff'
              }
            },
          ]
        },
        series: [
          {
            name: '教职工年龄分布',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['46%', '60%'],
            data: this.data1,
            startAngle: 110,
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
              fontSize: 14,
              lineHeight: 16,
              color: '#fff',
              formatter: '{b}:\n{c}人({d}%)',
              overflow: 'truncate',
            },
          },
        ],
      };
      this.chart1.setOption(option1);
      this.chart1.on('click', function (params) {
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name);
          _this.$router.push({ name: 'TeachingStaff-AgeDetail', query: { name: params.name, } })
        }
      });

      this.chart2 = echarts.init(this.$refs.chart2);
      const phdOption = {
        title: {
          text: '性\n别\n分\n布',
          right: '4%',
          top: '28%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 20,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
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
              left: '40%',
              top: '47%',
              z: 2,
              zlevel: 100,
              style: {
                text: this.data2Total + '人',
                fontSize: 17,
                fill: '#fff'
              }
            },
          ]
        },
        series: [
          {
            name: '教职工性别分布',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['46%', '50%'],
            data: this.data2,
            startAngle: 40,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            itemStyle: {
              borderColor: '#2a2a2a',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              barBorderRadius: [0, 10, 10, 0],
              color: function (params) {
                const colorList = ['#5470C6', '#EE6666', '#FAC858']; //'#91CC75',
                return colorList[params.dataIndex];
              }
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
              fontSize: 14,
              lineHeight: 16,
              color: '#fff',
              formatter: '{b}:\n{c}人({d}%)',
              overflow: 'truncate',
            },
          },
        ],
      };
      this.chart2.setOption(phdOption);
      this.chart2.on('click', function (params) {
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name);
          _this.$router.push({ name: 'TeachingStaff-SexDetail', query: { name: params.name, } })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 100%;

#ageAndSexDistribution {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
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

  /* 饼状图容器布局 */
  .charts-container {
    display: flex;
    flex-direction: column;
    /* 垂直排列饼状图 */
    justify-content: space-between;
    gap: 2px;
    margin-top: 6px;
  }

  /* 每个饼状图的盒子 */
  .chart-box {
    width: 100%;
    height: 200px;
    border-radius: 2px;
    overflow: hidden;
  }

  /* 饼状图本身的容器 */
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div id="polityDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">研究生政治面貌分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>

      <div class="charts-container">
        <div class="chart-box">
          <div ref="masterChart" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: "PolityDistribution",
  data() {
    return {
      chart1: null,
      data1: [
        { name: '研一', value: 4950 },
        { name: '研二', value: 4658 },
        { name: '研三', value: 4658 },
        { name: '其他', value: 1660 },
        { name: '超期未毕业', value: 1830 },
      ],
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
        .get('graduateStudent/polityDistribution')
        .then(
          res => {
            console.log(res.data)
            this.data1 = res.data
            console.log("load polityDistribution success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
    },
    // 初始化饼状图
    initCharts() {
      let _this = this
      // 政治面貌分布饼状图
      this.chart1 = echarts.init(this.$refs.masterChart);
      const masterOption = {
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
        series: [
          {
            name: '政治面貌分布',
            type: 'pie',
            radius: '38%',
            center: ['50%', '52%'],
            data: this.data1,
            startAngle:210,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            itemStyle: {
              borderColor: '#2a2a2a',
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              color: function (params) {
                const colorList =  ['#5470C6','#FAC858','#EE6666', '#9665BA', '#91CC75']
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
              fontSize: 16,
              lineHeight:18,
              color: '#fff',
              formatter: '{b}:\n{c}({d}%)',
              overflow: 'truncate',
            },
          },
        ],
      };
      this.chart1.setOption(masterOption);
      this.chart1.on('click', function (params) {
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name);
          _this.$router.push({ name: 'GraduateStudent-PolityDetail', query: { name: params.name, } })
        }
      });
 
    },
  },
};
</script>

<style lang="scss" scoped>
$box-width: 100%;
$box-height: 480px;

#polityDistribution {
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
    height: 380px;
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

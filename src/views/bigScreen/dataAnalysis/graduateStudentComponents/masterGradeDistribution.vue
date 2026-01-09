<template>
  <div id="masterGradeDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">硕士研究生年级分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>

      <div class="charts-container">
        <div ref="chart1" class="chart-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: "MasterGradeDistribution",
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
      data1Total: 0,
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
        .get('graduateStudent/gradeDistribution/master')
        .then(
          res => {
            console.log(res.data)
            this.data1 = res.data
            console.log("load gradeDistribution master success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      // 获取总人数
      this.data1Total = 0
      for (let i = 0; i < this.data1.length; i++) {
        this.data1Total += this.data1[i].value
      }
      console.log(this.data1Total)
    },
    // 初始化饼状图
    initCharts() {
      let _this = this
      // 硕士年级分布饼状图
      this.chart1 = echarts.init(this.$refs.chart1);
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
        series: [
          {
            name: '年级分布',
            type: 'pie',
            radius: '35%',
            center: ['50%', '52%'],
            data: this.data1,
            startAngle: 20,
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
              fontSize: 16,
              lineHeight: 18,
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
          _this.$router.push({ name: 'GraduateStudent-MasterGradeDetail', query: { name: params.name, } })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 100%;

#masterGradeDistribution {
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
    height: 400px;
    border-radius: 2px;
    overflow: hidden;
  }

}
</style>

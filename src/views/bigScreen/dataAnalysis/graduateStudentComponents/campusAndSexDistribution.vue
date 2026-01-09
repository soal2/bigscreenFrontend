<template>
  <div id="campusAndSexDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">研究生性别和校区分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <div ref="chart2" class="dv-bar-chart1"></div>
        <div ref="chart1" class="dv-bar-chart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: "CampusAndSexDistribution",
  data() {
    return {
      chart1: null, // ECharts实例
      yClass1: ['博士', '硕士',],
      legendClass1: ['南京校区', '江阴校区', '其他'],
      data1: [[13750, 3372], [1750, 372],[1750, 372],],

      chart2: null, // ECharts实例
      yClass2: ['博士', '硕士',],
      legendClass2: ['男', '女'],
      data2: [[13750, 3372], [1750, 372]],
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
      let rr = null
      // 南京校区
      await service
        .get('graduateStudent/campusNumDistribution/0')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load campusNumDistribution 0 success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            if (rr[i].name === this.yClass1[j]) {
              this.data1[0][j] = rr[i].value
              continue
            }
          }
        }
      }
      // 江阴校区
      await service
        .get('graduateStudent/campusNumDistribution/1')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load campusNumDistribution 1 success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            if (rr[i].name === this.yClass1[j]) {
              this.data1[1][j] = rr[i].value
              continue
            }
          }
        }
      }
      //其他
      await service
        .get('graduateStudent/campusNumDistribution/-1')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load campusNumDistribution -1 success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            if (rr[i].name === this.yClass1[j]) {
              this.data1[2][j] = rr[i].value
              continue
            }
          }
        }
      }
      console.log(this.data1)

      // 男女数据加载
      await service
        .get('graduateStudent/sexDistribution/master')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load sexDistribution master success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            if (rr[i].name === this.legendClass2[j]) {
              this.data2[j][1] = rr[i].value
              continue
            }
          }
        }
      }
      await service
        .get('graduateStudent/sexDistribution/phd')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load sexDistribution phd success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            if (rr[i].name === this.legendClass2[j]) {
              this.data2[j][0] = rr[i].value
              continue
            }
          }
        }
      }
      console.log(this.data2)
    },
    initCharts() {
      let _this = this
      this.chart1 = echarts.init(this.$refs.chart1);
      const option1 = {
        title: {
          text: '校区分布',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          confine: true,
        },
        legend: {
          data: this.legendClass1,
          top: '24', // 距离顶部的位置
          textStyle: { //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        grid: {
          top: '26%',
          left: '3%',
          right: '8%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            }
          },
        },
        yAxis: {
          type: 'category',
          data: this.yClass1,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            }
          },
        },
        series: [
          {
            name: this.legendClass1[0],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'inside',
              fontSize: 16,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}(${percentage}%)`
              },
            },
            data: this.data1[0],
            itemStyle: {
              color: '#FAC858', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
          {
            name: this.legendClass1[1],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'bottom',
              fontSize: 16,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}(${percentage}%)`
              },
            },
            data: this.data1[1],
            itemStyle: {
              color: '#91CC75', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
          {
            name: this.legendClass1[2],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'right',
              fontSize: 16,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}(${percentage}%)`
              },
            },
            data: this.data1[2],
            itemStyle: {
              color: '#67ACC7', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
        ]
      }
      this.chart1.setOption(option1);
      this.chart1.on('click', function (params) {
        console.log(params.componentType)
        console.log(params.seriesName)
        console.log(params.name)
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name + params.seriesName);
          _this.$router.push({ name: 'GraduateStudent-CampusDetail', query: { campus: params.seriesName, name: params.name, } })
        }
      });

      this.chart2 = echarts.init(this.$refs.chart2);
      const option2 = {
        title: {
          text: '性别分布',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.legendClass2,
          top: '24', // 距离顶部的位置
          textStyle: { //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        grid: {
          top: '26%',
          left: '3%',
          right: '8%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            }
          },
        },
        yAxis: {
          type: 'category',
          data: this.yClass2,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            }
          },
        },
        series: [
          {
            name: this.legendClass2[0],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'inside',
              fontSize: 16,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass2.length; i++) {
                  total += this.data2[i][params.dataIndex]
                }
                const rawValue = this.data2[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}(${percentage}%)`
              },
            },
            data: this.data2[0],
          },
          {
            name: this.legendClass2[1],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'right',
              fontSize: 16,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass2.length; i++) {
                  total += this.data2[i][params.dataIndex]
                }
                const rawValue = this.data2[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}(${percentage}%)`
              },
            },
            data: this.data2[1],
            itemStyle: {
              color: '#EE6666', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
        ]
      }
      this.chart2.setOption(option2);
      this.chart2.on('click', function (params) {
        console.log(params.componentType)
        console.log(params.seriesName)
        console.log(params.name)
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name + params.seriesName);
          _this.$router.push({ name: 'GraduateStudent-SexDetail', query: { sex: params.seriesName, name: params.name, } })
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 100%;

#campusAndSexDistribution {
  padding: 16px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

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

  .body-box {
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .dv-bar-chart1 {
      width: $box-width;
      height: 205px; // 使用全部可用高度
      padding: 10px 0;
    }

    .dv-bar-chart2 {
      width: $box-width;
      height: 205px; // 使用全部可用高度
      padding: 10px 0;
    }
  }
}
</style>

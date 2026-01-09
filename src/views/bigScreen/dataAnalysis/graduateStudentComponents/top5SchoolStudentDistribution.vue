<template>
  <div id="top5SchoolStudentDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">前五大学院硕博分布</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <div ref="chart1" class="dv-bar-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
  name: "Top5SchoolStudentDistribution",
  data() {
    return {
      chart1: null, // ECharts实例
      yClass1: ["自动化学院", "经济管理学院", "计算机科学与工程学院", "电子工程与光电技术学院", "机械工程学院",],
      legendClass1: ['硕士', '博士'],
      data1: [],
      data1Item: [0, 0, 0, 0, 0], //JSON.parse(JSON.stringify())
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
      await service
        .get('graduateStudent/top5SchoolStudentNumDistribution/master')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load top5SchoolStudentNumDistribution master success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      this.data1 = []
      this.data1.push(JSON.parse(JSON.stringify(this.data1Item)))
      this.data1.push(JSON.parse(JSON.stringify(this.data1Item)))
      if (rr) {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < this.yClass1.length; j++) {
            if (rr[i].name === this.yClass1[j]) {
              this.data1[0][j] = rr[i].value
            }
          }
        }
      }

      await service
        .get('graduateStudent/top5SchoolStudentNumDistribution/phd')
        .then(
          res => {
            console.log(res.data)
            rr = res.data
            console.log("load top5SchoolStudentNumDistribution phd success")
          }
        )
        .catch(failResponse => {
          console.log("error", failResponse)
        })
      if (rr) {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < this.yClass1.length; j++) {
            if (rr[i].name === this.yClass1[j]) {
              this.data1[1][j] = rr[i].value
            }
          }
        }
      }
      console.log(this.data1)
    },
    initCharts() {
      let _this = this
      this.chart1 = echarts.init(this.$refs.chart1);
      const option1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.legendClass1,
          top: '24', // 距离顶部的位置
          textStyle: { //图例文字的样式
            color: '#fff',
            fontSize: 16
          },
        },
        grid: {
          top: '18%',
          left: '3%',
          right: '14%',
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
              lineHeight: 18,
            },
            formatter: function (params) {
              var str = "";                 // 最终拼接成的字符串
              var paramsLen = params.length;// 获取每项文字的个数
              var len = 6;                  // 每行能显示的字的个数（根据实际情况自己设置）
              var rowNumber = Math.ceil(paramsLen / len); // 换行的话，需要显示几行，向上取整
              if (paramsLen > len) {        //大于设定的len就换行，不大于就不变化
                for (var i = 0; i < rowNumber; i++) {
                  var temp = "";            // 表示每一次截取的字符串
                  var start = i * len;      // 开始截取的位置
                  var end = start + len;    // 结束截取的位置
                  if (i == rowNumber - 1) { // 最后一次不换行
                    temp = params.substring(start, paramsLen);
                  } else {                  // 每一次拼接字符串并换行
                    temp = params.substring(start, end) + "\n";
                  }
                  str += temp;              // 最终拼成的字符串
                }
              } else {                      // 给新的字符串赋值
                str = params;
              }
              return str;                   //返回字符串
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
              color: '#9665BA',
            },
          },
          {
            name: this.legendClass1[1],
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
            data: this.data1[1],
            itemStyle: {
              color: '#64A8C2', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
        ]
      }
      this.chart1.setOption(option1);
      this.chart1.on('click', function (params) {
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name + params.seriesName);
          _this.$router.push({ name: 'GraduateStudent-Top5SchoolStudentDetail', query: { school: params.name, name: params.seriesName, } })
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#top5SchoolStudentDistribution {
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

    .dv-bar-chart {
      width: $box-width;
      height: 380px; // 使用全部可用高度
      padding: 10px 0;
    }
  }
}
</style>

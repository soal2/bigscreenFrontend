<template>
  <div id="supervisorTitleAndAgeDistribution">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">导师职级年龄分布</span>
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
  name: "SupervisorTitleAndAgeDistribution",
  data() {
    return {
      chart1: null, // ECharts实例
      yClass1: ['其他', '中级', '副高级', '正高级'],
      legendClass1: ['35岁以下', '35-45岁', '45-55岁', '55岁以上',],
      data1: [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]],
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
        .get('graduateStudent/supervisorTitleAndAgeDistribution')
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
      this.data1 = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
      if (rr) {
        for (let i = 0; i < this.legendClass1.length; i++) {
          for (let j = 0; j < rr.length; j++) {
            if (this.legendClass1[i] === rr[j].name) {
              for (let ii = 0; ii < this.yClass1.length; ii++) {
                for (let jj = 0; jj < rr[j].value.length; jj++) {
                  if (this.yClass1[ii] === rr[j].value[jj].name) {
                    this.data1[i][ii] = rr[j].value[jj].value
                  }
                }
              }
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
          },
          formatter: function (params) {
            let obj = params.map((item, index) => {
              console.log(item)
              if (item.value == undefined || item.value !== item.value) {
                item.value = 0;
              }
              let total = 0
              for (let i = 0; i < _this.legendClass1.length; i++) {
                total += _this.data1[i][item.dataIndex]
              }
              let percent = (item.value / total * 100).toFixed(2)
              // 小圆点显示
              let dotColor = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
              return dotColor + item.seriesName + ":" + item.value + '(' + percent + '%' + ')' + '</br>'
            })
            return obj.join('') // 去除','
          },
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
              position: 'top',
              fontSize: 15,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}`
              },
            },
            data: this.data1[0],
            barWidth: 37,
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
              position: 'inside',
              fontSize: 15,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}`
              },
            },
            data: this.data1[1],
            itemStyle: {
              color: '#64A8C2', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
          {
            name: this.legendClass1[2],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'bottom',
              fontSize: 15,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}`
              },
            },
            data: this.data1[2],
            itemStyle: {
              color: '#FAC858', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
          {
            name: this.legendClass1[3],
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              color: '#fff',
              position: 'right',
              fontSize: 15,
              formatter: (params) => {
                let total = 0
                for (let i = 0; i < this.legendClass1.length; i++) {
                  total += this.data1[i][params.dataIndex]
                }
                const rawValue = this.data1[params.seriesIndex][params.dataIndex]
                const percentage = (rawValue / total * 100).toFixed(2)
                return `${rawValue}`
              },
            },
            data: this.data1[3],
            itemStyle: {
              color: '#EE6666', //,'#5470C6','#91CC75' , '#EE6666'
            },
          },
        ]
      }
      this.chart1.setOption(option1);
      this.chart1.on('click', function (params) {
        if (params.componentType === "series") {
          console.log("点击了" + params.componentType + params.name + params.seriesName);
          _this.$router.push({ name: 'GraduateStudent-SupervisorTitleAndAgeDetail', query: { name: params.name, age: params.seriesName, } })
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#supervisorTitleAndAgeDistribution {
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

<template>
    <div id="bottomLeft">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
              <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
                <span class="text">党员情况</span>
                <dv-decoration-3 class="dv-dec-3" />
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="barChart" class="bar-chart1"></div>
                <!-- <div class="kong"></div> -->
                <div ref="agebarChart" class="bar-chart2"></div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import axios from 'axios';
  import service from '@/utils/service';
  export default {
  mounted() {
    this.initBarChart();
  },
  methods: {
    initBarChart() {
      const barChart = echarts.init(this.$refs.barChart);
      const agebarChart = echarts.init(this.$refs.agebarChart);
      service.get("organization/memberSituation") // 假设后端接口地址为/api/barChartData
      .then((response) => { 
          const data = response.data;
          const xAxisData = data.map(item => item.name); // 提取name作为X轴数据
          const seriesData = data.map(item => item.value); // 提取value作为系列数据
          service.get("organization/ageDistribution/man") // 假设后端接口地址为/api/barChartData
      .then((agemanresponse) => {
            const agemandata = agemanresponse.data;
            // const agemanXAxisData = agemandata.map(item => item.name); // 提取name作为X轴数据
            const agemanSeriesData = agemandata.map(item => item.value); // 提取value作为系列数据
            const processedData = agemanSeriesData.map(value => ({
              value: value,
              label: {
                  show: true,
                  color: '#fff',
                  formatter: (params) => {
                      return `${params.value}人`
                  },
                  position: value < 10 ? 'top' : 'inside'
              }
          }));
            // // 将xAxisData1的第一个元素添加到xAxisData2的开头
            // const allSexXAxisData = [xAxisData[2], ...sexXAxisData];

            // // 将seriesData1的第一个元素添加到seriesData2的开头
            // const allSexSeriesData = [seriesData[2], ...sexSeriesData];
            service.get("organization/ageDistribution/woman") // 假设后端接口地址为/api/barChartData
          .then((agewomanresponse) => {
            const agewomandata = agewomanresponse.data;
            // const agewomanXAxisData = agewomandata.map(item => item.name); // 提取name作为X轴数据
            // const agewomanSeriesData = agewomandata.map(item => item.value); // 提取value作为系列数据
            
            service.get("organization/ageDistribution") // 假设后端接口地址为/api/barChartData
          .then((ageresponse) => {
            const agedata = ageresponse.data;
            const ageXAxisData = agedata.map(item => item.name); // 提取name作为X轴数据
            service.get("organization/ageDistribution/null") // 假设后端接口地址为/api/barChartData
          .then((agenullresponse) => {
            const agenulldata = agenullresponse.data;
            const agenullSeriesData = agenulldata.map(item => item.value);// 提取name作为X轴数据
            const womanDataMap = agenulldata.reduce((map, item) => {
                map[item.name] = item;
                return map;
            }, {});
            // 合并数据
            const mergedData = agewomandata.map(item => {
                const womanItem = womanDataMap[item.name];
                if (womanItem) {
                    // 如果找到对应的女数据项，则合并
                    return {
                        name: item.name,
                        value: item.value + womanItem.value
                    };
                } else {
                    // 如果没有找到对应的女数据项，直接返回原项
                    return item;
                }
            });
            const agewomanSeriesData = mergedData.map(item => item.value);
            const option = {
            title:{
              text: '党员数量分布',
              left: 'center',
              textStyle: {
                fontSize: 15,
                color:'#fff'
              },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                padding: [5, 5],
                extraCssText: 'max-height: 80px; overflow: auto;'
            },
            grid: {
                top:'10%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLabel: {
                show: true,
                textStyle: {
                color: '#fff'
                    }
                } 
            },
            yAxis: {
              name: '',
              data: [xAxisData[0]], // 使用后端返回的Y轴数据
              axisLabel: {
                show: false,
                textStyle: {
                color: '#fff'
                    }
                } 

            },
            series: [{
              stack: 'total',
                type: 'bar',
                data: [seriesData[1]], // 使用后端返回的系列数据
                label: {
                  show: true,
                  position: 'inside',
                  formatter: function(params) {
                    // 返回自定义的标签文本
                    return [xAxisData[1]]+'：' + params.value+'人';
                }
                },
                itemStyle: {
                  color:'#EE6666'
        }
            },{
              stack: 'total',
                type: 'bar',
                data: [seriesData[2]], // 使用后端返回的系列数据
                label: {
                  show: true,
                  position: 'inside',
                  formatter: function(params) {
                    // 返回自定义的标签文本
                    return [xAxisData[2]]+'：' + params.value+'人'+'\n'+'占教职工：'+((params.value/[seriesData[3]])*100).toFixed(1)+'%';
                }
                },
                itemStyle: {
                  color:'#FAC858'
        }
            }]
            
          };
          barChart.setOption(option);
          const ageoption = {
            title:{
              text: '教职工党员年龄分布',
              left: 'center',
              textStyle: {
                fontSize: 15,
                color:'#fff'
              },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                top: '5%',
            },
            legend: {
              data: ['男', '女'],
              textStyle: {
                fontSize: 15,
                color:'#fff'
              },
              top:'10%'
            },
            grid: {
              top:'15%',
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLabel: {
                show: true,
                textStyle: {
                color: '#fff'
                    }
                } 
            },
            yAxis: {
              name: '',
              data: ageXAxisData, // 使用后端返回的Y轴数据
              axisLabel: {
                show: true,
                textStyle: {
                color: '#fff'
                    }
                } 
            },
            series: [{
              name:'男',
              stack: 'total',
              type: 'bar',
              data: processedData, // 使用后端返回的系列数据
              // label: {
              //   show: true,
              //   position: 'top',
              //   color: '#fff',
              //   formatter: (params) => {
              //       return `${params.value}人`
              //   },
              // },
              itemStyle: {
                // color:'#c23531'
              }
            },{
              name:'女',
              stack: 'total',
                type: 'bar',
                data: agewomanSeriesData, // 使用后端返回的系列数据
                label: {
                  show: true,
                  position: 'inside',
                  color: '#fff',
                  formatter: (params) => {
                      return `${params.value}人`
                  },
                },
                itemStyle: {
                  color:'#61a0a8'
        }
            },
        //     {
        //       name:'未知性别',
        //       stack: 'total',
        //         type: 'bar',
        //         data: agenullSeriesData, // 使用后端返回的系列数据
        //         label: {
        //           show: true,
        //           position: 'right',
        //           color: '#fff',
        //           formatter: (params) => {
        //               return `${params.value}人`
        //           },
        //         },
        //         itemStyle: {
        //           color:'#c23531'
        // }
        //     },
      ]
          };
          agebarChart.setOption(ageoption);
          }).catch((error) => {
            console.error('Error fetching bar chart data:', error);
          });
            // const ageSeriesData = ageresponse.map(item => item.value); // 提取value作为系列数据
          }).catch((error) => {
            console.error('Error fetching bar chart data:', error);
          });
          }).catch((error) => {
            console.error('Error fetching bar chart data:', error);
          });
      }).catch((error) => {
          console.error('Error fetching bar chart data:', error);
      });
      })
      .catch((error) => {
          console.error('Error fetching bar chart data:', error);
      });
    }
  }
};
  </script>
  
  <style lang="scss" scoped>
$box-height: 480px;
  $box-width: 100%;
  #bottomLeft {
    padding: 20px 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;
    .bg-color-black {
      height: $box-height - 35px;
      border-radius: 10px;
    }
    .bar-chart1 {
    width: 100%;
    height: 120px;
  }
  .bar-chart2 {
    width: 100%;
    height: 300px;
  }
  .kong {
    width: 100%;
    height: 20px;
  }
    .text {
      color: #fff;
        font-size: 18px;
    }
    .body-box {
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .dv-scr-board {
        width: $box-width;
        height: $box-height - 300px;
      }
      .dv-cap-chart {
        margin-top: 10px;
        width: $box-width;
        height: 230px;
      }
    }
    .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
  }
  </style>
  
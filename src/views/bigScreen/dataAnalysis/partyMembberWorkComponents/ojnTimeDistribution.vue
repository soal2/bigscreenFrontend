<template>
    <div id="centerRight1">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
          <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
            <span class="text">党费缴纳情况</span>
            <dv-decoration-3 class="dv-dec-3" />
        </div>
        <div class="d-flex jc-center body-box">
          <!-- <div ref="lineChart" class="line-chart"></div> -->
          <div ref="rlineChart" class="line-chart"></div>
          <div ref="barChart" class="dv-bar-chart"></div>
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
            this.initLineChart();
        },
        methods: {
            initLineChart() {
            // const lineChart = echarts.init(this.$refs.lineChart);
            const rlineChart = echarts.init(this.$refs.rlineChart);
            const barChart = echarts.init(this.$refs.barChart);
            service.get("organization/realpayDistribution") // 假设后端接口地址为/api/barChartData
                .then((rresponse) => { 
                    const rdata = rresponse.data;
                    const filteredData = rdata.filter(item => item.value >= 10000);
                    const rxAxisData = filteredData.map(item => {
                        if (item.name) {
                            // 假设duePayMonth是日期字符串，格式为"2024-02-29T16:00:00.000+00:00"
                            // const date = new Date(item.name);
                            // 将日期格式化为"YYYY-MM-DD"格式
                            item.name = item.name.split(' ')[0].substring(0, 7);
                        }
                        return item.name;
                    }); // 提取name作为X轴数据
                    // console.log(rxAxisData);
                    
                    const rseriesData = filteredData.map(item => item.value); // 提取value作为系列数据
                    service.get("organization/noPayNumTop5Distribution") // 假设后端接口地址为/api/barChartData
                .then((noresponse) => { 
                    const nodata = noresponse.data;
                    const noxAxisData = nodata.map(item => item.name); // 提取name作为X轴数据
                    const noseriesData = nodata.map(item => item.value); // 提取value作为系列数据
                    const roption = {
                        title:{
                          text: '每月实缴党费人数(人）',
                          left: 'center',
                          textStyle: {
                            fontSize: 15,
                            color:'#fff'
                          },
                          // top:'5%'
                        },
                        xAxis: {
                          type: 'category',
                          data: rxAxisData,
                          axisLabel: {
                            show: true,
                            textStyle: {
                            color: '#fff',
                            fontSize: 8,
                                },
                                formatter: function (params) {
                                        var str = "";                 // 最终拼接成的字符串
                                        var paramsLen = params.length;// 获取每项文字的个数
                                        var len = 4;                  // 每行能显示的字的个数（根据实际情况自己设置）
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
                            } 
                        },
                        yAxis: {
                          name: '',
                          axisLabel: {
                            show: true,
                            textStyle: {
                            color: '#fff'
                                }
                            } 
                        },
                        grid: {
                          top:'15%',
                          left: '3%',
                          right: '4%',
                          bottom: '0%',
                          containLabel: true
                        },
                        series: [ {
                            // name:'每月应缴党费人数',
                            type: 'line',
                            data: rseriesData, // 使用后端返回的系列数据
                            label: {
                              show: true,
                              position: 'top',
                              color: '#fff'
                            },
                            lineStyle: {
                color: 'red' // 设置折线颜色为红色
            }
                        },
                      ]  
                    };
                    rlineChart.setOption(roption);
                    const options = {
                      title:{
                          text: '2024欠缴人数TOP5(人）',
                          left: 'center',
                          textStyle: {
                            fontSize: 15,
                            color:'#fff'
                          },
                          // top:'5%'
                        },
                        tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                        },
                        legend: {},
                        grid: {
                            top:'15%',
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            data: noxAxisData,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                color: '#fff'
                                    },
                            formatter: function (params) {
                                        var str = "";                 // 最终拼接成的字符串
                                        var paramsLen = params.length;// 获取每项文字的个数
                                        var len = 4;                  // 每行能显示的字的个数（根据实际情况自己设置）
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
                                } 
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01],
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        },
                        series: [{
                            name: "",
                            type: "bar",
                            data: noseriesData,
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear', // 渐变类型
                                        x: 0, y: 0, // 渐变起始点
                                        x2: 0, y2: 1, // 渐变结束点
                                        colorStops: [ // 颜色停靠点
                                            { offset: 1, color:'rgba(0, 0, 0, 0)' }, // 偏移量0表示渐变起点
                                            { offset: 0, color: '#FF6347' } // 偏移量1表示渐变终点
                                        ],
                                        global: false // 默认为false，是否应用为全局渐变色，true表示应用到所有柱子上
                                    }
                                }
                            },
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'top',
                                fontSize: 16,
                            },
                        }]
                    }
                    barChart.setOption(options);
                    barChart.on('click', (params) =>{
                      if(params.componentType==="series"){
                        this.$router.push({ name: 'partyMembberWork-oJnTimeDetail', query: { name: params.name, } })
                      }
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
#centerRight1 {
  padding: 20px 16px 16px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
    background-color: #0f1325; // 深色背景
  }
  .line-chart {
    width: 100%;
    height: 150px;
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
    .dv-bar-chart {
            padding-top: 20px;
            width: 100%;
            height: 280px; // Adjust based on the available space
            margin-bottom: 20px;
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
  
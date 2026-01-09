<template>
    <div id="bottomLeft">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
              <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
                <span class="text">入党积极分子及入党人数按时间分布</span>
                <dv-decoration-3 class="dv-dec-3" />
            </div>
            <div class="d-flex jc-center body-box">
              <div ref="lineChart" class="line-chart"></div>
              <!-- <div ref="jnlineChart" class="line-chart"></div> -->
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
            const lineChart = echarts.init(this.$refs.lineChart);
            // const jnlineChart = echarts.init(this.$refs.jnlineChart);
            service.get("organization/jnTimeDistribution") // 假设后端接口地址为/api/barChartData
                .then((response) => { 
                    const data = response.data;
                    // const xAxisData = data.map(item => item.name); // 提取name作为X轴数据
                    const xAxisData = new Set(data.map(item => item.name));
                    // console.log(xAxisData);
                    const seriesData = data.map(item => item.value); // 提取value作为系列数据
                    service.get("organization/activeTimeDistribution") // 假设后端接口地址为/api/barChartData
                .then((acresponse) => { 
                    const acdata = acresponse.data;
                    // const jnxAxisData = data.map(item => item.name); // 提取name作为X轴数据
                    acdata.forEach(item => xAxisData.add(item.name));
                    // console.log(xAxisData);
                    const sortedxAxisData = Array.from(xAxisData).sort((a, b) => new Date(a) - new Date(b));
                    // console.log(sortedxAxisData); 
                    const acseriesData = acdata.map(item => item.value); // 提取value作为系列数据
                    const sortedSeriesData = sortedxAxisData.map(name => {
                      const index = data.findIndex(item => item.name === name);
                      return index !== -1 ? seriesData[index] : null; // 如果找不到，则返回null
                    });
                    // console.log(sortedSeriesData);
                    const sortedacseriesData = sortedxAxisData.map(name => {
                      const index = acdata.findIndex(item => item.name === name);
                      return index !== -1 ? acseriesData[index] : null; // 如果找不到，则返回null
                    });
                    // console.log(sortedacseriesData);
                    // 更新ECharts配置
                    const option = {
                        title:{
                          text: '入党积极分子及入党人数按时间分布',
                          left: 'center',
                          textStyle: {
                            fontSize: 15,
                            color:'#fff'
                          },
                          top:'5%'
                        },
                        xAxis: {
                          type: 'category',
                          data: sortedxAxisData,
                          axisLabel: {
                            show: true,
                            textStyle: {
                            color: '#fff'
                                }
                            } 
                        },
                        legend: {
                          data: ['入党积极分子人数', '入党人数'],
                          textStyle: {
                                      fontSize: 15,
                                      color:'#fff'
                                    },
                                    top:'10%'
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
                          top:'20%',
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                        },
                        series: [{
                            name:'入党人数',
                            type: 'line',
                            data: sortedSeriesData, // 使用后端返回的系列数据
                            color:'#FAC858',
                            label: {
                              show: true,
                              position: 'inside',
                              color: '#fff'
                            },
                        },{
                            name:'入党积极分子人数',
                            type: 'line',
                            color:'#EE6666',
                            data: sortedacseriesData, // 使用后端返回的系列数据
                            label: {
                              show: true,
                              position: 'inside',
                              color: '#fff'
                            },
                        },
                      ]
                        
                        
                    };
                    lineChart.setOption(option);
                    lineChart.on('click', (params) =>{
                      if(params.componentType==="series"){
                        if(params.seriesName === '入党积极分子人数'){
                          this.$router.push({ name: 'partyMembberWork-oActiveTimeDetail', query: { name: params.name, } })
                        }else if(params.seriesName === '入党人数'){
                          this.$router.push({ name: 'partyMembberWork-oJnTimeDetail', query: { name: params.name, } })
                        }
                      }
                    });
                    // 更新ECharts配置
                    // const jnoption = {
                    //   title:{
                    //       text: ' 今年入党人数按时间分布',
                    //       left: 'center',
                    //       textStyle: {
                    //         fontSize: 15,
                    //         color:'#fff'
                    //       },
                    //     },
                    //     xAxis: {
                    //       type: 'category',
                    //       data: acxAxisData,
                    //       axisLabel: {
                    //         show: true,
                    //         textStyle: {
                    //         color: '#fff'
                    //             }
                    //         } 
                    //     },
                    //     yAxis: {
                    //       name: '',
                    //       axisLabel: {
                    //         show: true,
                    //         textStyle: {
                    //         color: '#fff'
                    //             }
                    //         } 
                    //     },
                    //     grid: {
                    //       top:'10%',
                    //       left: '3%',
                    //       right: '4%',
                    //       bottom: '3%',
                    //       containLabel: true
                    //     },
                    //     series: 
                    //     {
                    //         type: 'line',
                    //         data: acseriesData, // 使用后端返回的系列数据
                    //         label: {
                    //           show: true,
                    //           position: 'inside',
                    //           color: '#fff'
                    //         },
                    //     },
                        
                    // };
                    // jnlineChart.setOption(jnoption);
                    // jnlineChart.on('click', (params) =>{
                    //   if(params.componentType==="series"){
                    //     this.$router.push({ name: 'OrganizationalWork-oJnTimeDetail', query: { name: params.name, } })
                    //   }
                    // });
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
  .line-chart {
    width: 100%;
    height: 450px;
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


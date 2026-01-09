<template>
    <div id="bottomLeft">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
              <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
                <span class="text">双肩挑情况</span>
                <dv-decoration-3 class="dv-dec-3" />
            </div>
            <div class="d-flex jc-center body-box">
              <div ref="pieChart" class="pie-chart"></div>
              <!-- <div class="kong"></div> -->
            </div>
            <div style="padding-left: 0%;">
              <el-row align="middle">
                <el-col align="middle" v-for="(item, index) in baseData1" :key="index" :span="8" class="table-item">
                  <span style="font-size: 12px;color: #3399ff;">{{ item }}</span>
                </el-col>
              </el-row>
              <el-row align="middle">
                <el-col align="middle" v-for="(item, index) in data1" :key="index" :span="8" class="table-item">
                  <span style="font-size: 24px;">{{ item }}</span>
                </el-col>
              </el-row>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import axios from 'axios';
  import service from '@/utils/service';
  export default {
    data() {
          return {
            pieChart: null,
            baseData1: [],
            data1: []
          };
        },
    mounted() {
            this.initPieChart();
        },
    methods: {
        initPieChart() {
            const pieChart = echarts.init(this.$refs.pieChart);
            service.get("organization/sjtDistribution") // 假设后端接口地址为/api/barChartData
            .then((response) => { 
                const data = response.data;
                const seriesData = data.map(item => ({
                  value: item.value,
                  name: item.name 
                })).slice(0, -1);
                this.data1 = data.map(item => item.value).slice(0, -1);
                this.baseData1 = data.map(item => {
                 return item.name
                }).slice(0, -1);
                // 更新ECharts配置
                const options = {
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
                      grid: {
                        top:'10%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                      },
                      series: [
                      {
                          name: '双肩挑情况',
                          startAngle: 45, 
                          type: 'pie',
                          radius: '45%',
                          center: ['50%', '50%'],
                          data: seriesData,
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
                            fontSize: 12,
                            color: '#fff',
                            formatter: '{b}：\n{c}人 ({d}%)',
                            overflow: 'truncate',
                          },
                        }
                      ],
                };
                pieChart.setOption(options);
                pieChart.on('click', (params) =>{
                  if(params.componentType==="series"){
                    this.$router.push({ name: 'OrganizationalWork-oSjtDetail', query: { name: data[params.dataIndex].name, } })
                  }
                });
            }).catch((error) => {
                console.error('Error fetching bar chart data:', error);
            });
        }
    } ,
};
  </script>
  
  <style lang="scss" scoped>
$box-height: 460px;
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
    .pie-chart {
      width: 100%;
      height: 350px;
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
  
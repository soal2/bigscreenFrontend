<template>
    <div id="centerLeft1">
      <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
          <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
            <span class="text">干部职务属性分布</span>
            <dv-decoration-3 class="dv-dec-3" />
        </div>
        <div class="d-flex jc-center body-box">
            <div ref="pieChart" class="pie-chart"></div>
        </div>
        <!-- <div >
          <el-row align="middle">
            <el-col align="middle" v-for="(item, index) in baseData1" :key="index" :span="2" class="table-item">
              <span style="font-size: 6px;color: #3399ff;">{{ item }}</span>
            </el-col>
          </el-row>
          <el-row align="middle">
            <el-col align="middle" v-for="(item, index) in data1" :key="index" :span="2" class="table-item">
              <span style="font-size: 24px;">{{ item }}</span>
            </el-col>
          </el-row>
        </div> -->
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
                service.get("organization/cadreJob2Distribution") // 假设后端接口地址为/api/barChartData
                .then((response) => { 
                    const data = response.data;
                    // console.log(response)
                    const seriesData = data.map(item => ({
                      value: item.value,
                      name: item.name
                    }));
                    // console.log(seriesData)
                    const sortedOrder = ["教学科研机构正处级", "教学科研机构副处级", "教学科研机构正科级", "教学科研机构正科级辅导员",
                     "机关职能部处正处级", "机关职能部处副处级", "机关职能部处正科级", "直属单位正处级", "直属单位副处级", "直属单位正科级"];
                    const sortedseriesData = sortedOrder.map(name => {
                        return seriesData.find(item => item.name === name);
                    });
                    this.data1 = sortedseriesData.map(item => item.value)
                    this.baseData1 = sortedseriesData.map(item => item.name)
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
                              name: '干部职务属性分布',
                              type: 'pie',
                              radius: '85%',
                              center: ['50%', '55%'],
                              data: sortedseriesData,
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
                                show: true,
                                formatter: '{b}：\n{c}人 ({d}%)',
                                color: '#fff',
                              },
                            }
                          ],
                    };
                    pieChart.setOption(options);
                    pieChart.on('click', (params) =>{
                      if(params.componentType==="series"){
                        let foundItem = null;

                        // 遍历数组，找到与 params.name 相同的项
                        for (let item of data) {
                            if (item.name === params.name) {
                                foundItem = item;
                                break;
                            }
                        }
                        if (foundItem) {
                            this.$router.push({
                                name: 'OrganizationalWork-oCadreJobDetail',
                                query: {
                                  name:foundItem.name,
                                    name1: foundItem.name2,
                                    name2: foundItem.name3
                                }
                            });
                        } else {
                            // 如果没有找到匹配的项，可以进行相应的错误处理
                            console.error('No matching item found for the given name.');
                        }
                        // this.$router.push({ name: 'OrganizationalWork-oCadreJobDetail', query: { name: params.name, } })
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
  #centerLeft1 {
    $box-height: 460px;
$box-width: 100%;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;
    .bg-color-black {
      height: $box-height - 30px;
      border-radius: 10px;
    }
    .pie-chart {
      width: 100%;
      height: 380px;
      }
    .text {
      color: #fff;
        font-size: 18px;
      //padding-left: 50px;
      //margin-left: 50px;
    }
    .dv-dec-3 {
      position: relative;
      width: 100px;
      height: 20px;
      top: -3px;
    }
  }
  </style>
  
<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="text">党支部类型分布</span>
        <dv-decoration-3 class="dv-dec-3" />
      </div>
      <div class="d-flex jc-center">
        <div ref="barChart" class="bar-chart"></div>
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
                service.get("organization/partyBranchTypesDistribution") // 假设后端接口地址为/api/barChartData
                .then((response) => { 
                    const data = response.data;
                    const yAxisData = data.map(item => item.name); // 提取name作为X轴数据
                    const seriesData = data.map(item => item.value); // 提取value作为系列数据
                    // 更新ECharts配置
                    const option = {
                        tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow'
                          }
                        },
                        legend: {},
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
                          data: yAxisData.reverse(), // 使用后端返回的Y轴数据
                          axisLabel: {
                            show: true,
                            textStyle: {
                            color: '#fff'
                                }
                            } 
                        },
                        series: 
                        {
                            type: 'bar',
                            data: seriesData.reverse(), // 使用后端返回的系列数据
                            label: {
                              show: true,
                              position: 'right',
                              formatter: '{c}个', // 显示数据值
                                fontSize: 12, // 增大字体大小
                                color: '#fff', // 设置字体颜色，这里使用白色，您可以根据背景颜色调整
                                padding: [2, 5], // 增加标签的内边距，第一个值是上/下边距，第二个值是左/右边距
                                shadowBlur: 10, // 标签的阴影模糊程度
                            },
                            itemStyle: {
            color: function(params) {
                var colorList = ['#5470C6','#91CC75', '#FAC858', '#EE6666'];
                return colorList[params.dataIndex % colorList.length];
            }
        }
                        },
                        
                    };
                    barChart.setOption(option);
                    barChart.on('click', (params) =>{
                      if(params.componentType==="series"){
                        this.$router.push({ name: 'partyMembberWork-oPartyBranchTypesDetail', query: { name: params.name, } })
                      }
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
$box-width: 100%;
$box-height: 460px;

#centerLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .bar-chart {
    width: 100%;
    height: 400px;
  }

  .text {
    color: #fff;
        font-size: 18px;
  }

  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
}
</style>

<template>
    <div id="bottomRight">
        <div class="bg-color-black" >
            <div class="d-flex pt-2 pl-2">
                <span>
                <icon name="chart-pie" class="text-icon"></icon>
              </span>
                <span class="text">干部职级分布</span>
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
                service.get("/organization/cadreNumbersDistribution") // 假设后端接口地址为/api/barChartData
                .then((response) => { 
                    const data = response.data;
                    const yAxisData = data.map(item => item.name).reverse(); // 提取name作为X轴数据
                    const seriesData = data.map(item => item.value).reverse(); // 提取value作为系列数据
                    service.get("/organization/cadreNumbersDistribution/man") // 假设后端接口地址为/api/barChartData
                    .then((mresponse) => { 
                        const mdata = mresponse.data;
                        // const myAxisData = mdata.map(item => item.name); // 提取name作为X轴数据
                        const mseriesData = mdata.map(item => item.value).reverse(); // 提取value作为系列数据
                        service.get("/organization/cadreNumbersDistribution/woman") // 假设后端接口地址为/api/barChartData
                        .then((wresponse) => { 
                            const wdata = wresponse.data;
                            // const wyAxisData = wdata.map(item => item.name); // 提取name作为X轴数据
                            const wseriesData = wdata.map(item => item.value).reverse(); // 提取value作为系列数据
                            // 更新ECharts配置
                            const option = {
                                tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                                },
                                legend: {
                                    textStyle: {
                                        fontSize: 15,
                                        color:'#fff'
                                    },
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
                                    data: yAxisData, // 使用后端返回的Y轴数据
                                    axisLabel: {
                                    show: true,
                                    textStyle: {
                                    color: '#fff'
                                        }
                                    } 
                                },
                                series: [
                                    {
                                        name:'男',
                                        stack: 'total',
                                            type: 'bar',
                                            data: mseriesData, // 使用后端返回的系列数据
                                            label: {
                                            show: true,
                                            position: 'top',
                                            color: '#fff',
                                            formatter: (params) => {
                                                let total = 0
                                                total = params.value+wseriesData[params.dataIndex];
                                                const percentage = (params.value / total * 100).toFixed(2);
                                                return `${params.value}人(${percentage}%)`
                                            },
                                            },
                                            itemStyle: {
                                            color:'#EE6666'
                                    }
                                        },{
                                        name:'女',
                                        stack: 'total',
                                            type: 'bar',
                                            data: wseriesData, // 使用后端返回的系列数据
                                            label: {
                                            show: true,
                                            position: 'right',
                                            color: '#fff',
                                            formatter: (params) => {
                                                let total = 0
                                                total = params.value+mseriesData[params.dataIndex];
                                                const percentage = (params.value / total * 100).toFixed(2);
                                                return `${params.value}人(${percentage}%)`
                                            },
                                            },
                                            itemStyle: {
                                            color: '#FAC858'
                                    }
                                        }
                                ]
                                
                                
                            };
                            barChart.setOption(option);
                            barChart.on('click', (params) =>{
                            if(params.componentType==="series"){
                                this.$router.push({ name: 'OrganizationalWork-oCadreNumbersDetail', query: { name: params.name, } })
                            }
                            });
                        }).catch((error) => {
                            console.error('Error fetching bar chart data:', error);
                        });
                    }).catch((error) => {
                        console.error('Error fetching bar chart data:', error);
                    });      
                }).catch((error) => {
                    console.error('Error fetching bar chart data:', error);
                });
            },
            handleChartClick() {
                this.$router.push(`/twice1`);
            } 
        },
       
    };
</script>

<style lang="scss" scoped>
$box-width: 100%;
$box-height: 480px;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 20px;
    border-radius: 10px;
  }
  .bar-chart {
    width: 100%;
    height: 400px;
    }
  .text {
    color: #fff;
        font-size: 18px;
  }.dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
}
</style>


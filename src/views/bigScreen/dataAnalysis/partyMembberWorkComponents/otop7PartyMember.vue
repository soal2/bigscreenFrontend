<template>
    <div id="otop7PartyMember">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-area" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">单位党员人数TOP7</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="barChart" class="dv-bar-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'otop7PartyMember',
    data() {
        return {
            barChart: null,
        };
    },
    mounted() {
            this.initBarChart();
        },
        methods: {
            initBarChart() {
                const barChart = echarts.init(this.$refs.barChart);
                service.get("organization/partyDistribution") // 假设后端接口地址为/api/barChartData
                .then((response) => { 
                    const data = response.data;
                    const xAxisData = data.map(item => item.name); // 提取name作为X轴数据
                    const seriesData = data.map(item => item.value); // 提取value作为系列数据
                    const options = {
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
                            data: xAxisData,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                color: '#fff'
                                    },
                            formatter: function (params) {
                                        var str = "";                 // 最终拼接成的字符串
                                        var paramsLen = params.length;// 获取每项文字的个数
                                        var len = 3;                  // 每行能显示的字的个数（根据实际情况自己设置）
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
                            data: seriesData,
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear', // 渐变类型
                                        x: 0, y: 0, // 渐变起始点
                                        x2: 0, y2: 1, // 渐变结束点
                                        colorStops: [ // 颜色停靠点
                                            { offset: 1, color:'rgba(0, 0, 0, 0)' }, // 偏移量0表示渐变起点
                                            { offset: 0, color: '#90EE90' } // 偏移量1表示渐变终点
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
                }).catch((error) => {
                    console.error('Error fetching bar chart data:', error);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#otop7PartyMember {
    padding: 14px 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;

    .bg-color-black {
        height: $box-height - 30px;
        border-radius: 10px;
    }

    .dv-dec-3 {
        position: relative;
        width: 100px;
        height: 20px;
        top: -3px;
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
            height: 420px; // Adjust based on the available space
            margin-bottom: 20px;
        }
    }
}
</style>
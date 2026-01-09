<template>
    <div id="achievementTransformationDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">成果转化情况</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart" class="dv-bar-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'AchievementTransformationDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['成果转化项数（项）', '成果转化经费（亿元）',],
            xLabel: [],
            yData: [],
        };
    },
    mounted() {
        this.indexStart();
    },
    methods: {
        // 异步初始化
        async indexStart() {
            await this.initLoadData()
            await this.initCharts()
        },
        // 加载数据
        async initLoadData() {
            this.xLabel = []
            this.yData = []
            let rr = null
            for (let i = 0; i < this.legendClass.length; i++) {
                await service
                    .get('scientificResearch', { params: { name: this.legendClass[i] } })
                    .then(
                        res => {
                            console.log(res.data)
                            rr = res.data
                            console.log("load success" + this.legendClass[i])
                        }
                    )
                    .catch(failResponse => {
                        console.log("error", failResponse)
                    })
                if (rr) {
                    this.xLabel = rr.year
                    this.yData.push(rr.value)
                }
                else {
                    this.yData.push([])
                }
            }
        },
        // 初始化图
        initCharts() {
            let _this = this
            this.chart = echarts.init(this.$refs.chart);
            const option1 = {
                /*
                title: {
                    text: '省内Top5城市',
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                },
                */
                grid: {
                    top: '18%',
                    left: '6%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: this.legendClass,
                    top: '2',
                    textStyle: { //图例文字的样式
                        color: '#fff',
                        fontSize: 14,
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                xAxis: {
                    data: this.xLabel,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                            //lineHeight: 16,
                        },
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '项',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        min: 100, //需要对齐并根据输入调整
                        max: 300,
                        interval: 40,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 16,
                            }
                        },
                    },
                    {
                        type: 'value',
                        name: '亿元',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                        min: 0,
                        max: 1,
                        interval: 0.2,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 16,
                            }
                        },
                    },
                ],
                series: [
                    {
                        name: this.legendClass[0],
                        type: "bar",
                        data: this.yData[0],
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear', // 渐变类型
                                    x: 0, y: 0, // 渐变起始点
                                    x2: 0, y2: 1, // 渐变结束点
                                    colorStops: [ // 颜色停靠点
                                        { offset: 1, color: 'rgba(0, 0, 0, 0)' }, // 偏移量0表示渐变起点
                                        { offset: 0, color: '#9665BA' } // 偏移量1表示渐变终点
                                    ],
                                    global: false // 默认为false，是否应用为全局渐变色，true表示应用到所有柱子上
                                }
                            }
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 14,
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                    {
                        name: this.legendClass[1],
                        type: "line",
                        yAxisIndex: 1,
                        data: this.yData[1],
                        itemStyle: {
                            color: '#FAC858'
                        },
                        label: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            fontSize: 14,
                        },
                        emphasis: {
                            focus: 'series'
                        },
                    },
                ]
            }
            this.chart.setOption(option1);
            /*
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.name);
                    _this.$router.push({ name: 'TeachingStaff-Top5CityDetail', query: { name: params.name, } })
                }
            });
            */
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#achievementTransformationDistribution {
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
        color: #D7D8DA; //#c3cbde
        font-size: 19px;
        font-weight: bold;
    }

    .body-box {
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .dv-bar-chart {
            padding-top: 20px;
            width: 100%;
            height: 410px; // Adjust based on the available space
            margin-bottom: 10px;
        }
    }
}
</style>
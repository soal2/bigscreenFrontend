chart<template>
    <div id="platformBaseDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">科研平台和哲社基地情况</span>
                    <dv-decoration-3 class="dv-dec-3" />
                </div>
            </div>
            <div class="d-flex jc-center body-box">
                <div ref="chart" class="dv-bar-chart"></div>
                <div ref="chart2" class="dv-bar-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import service from '@/utils/service';

export default {
    name: 'PlatformBaseDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['牵头国家级科研平台（个）', '联合共建国家级平台（个）'],
            xLabel: [],
            yData: [],
            legendClass2: ['新增省部级科研平台（个）', '新增省部级哲社基地（个）',],
            xLabel2: [],
            yData2: [],
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

            this.xLabel2 = []
            this.yData2 = []
            let rr2 = null
            for (let i = 0; i < this.legendClass2.length; i++) {
                await service
                    .get('scientificResearch', { params: { name: this.legendClass2[i] } })
                    .then(
                        res => {
                            console.log(res.data)
                            rr2 = res.data
                            console.log("load success" + this.legendClass2[i])
                        }
                    )
                    .catch(failResponse => {
                        console.log("error", failResponse)
                    })
                if (rr2) {
                    this.xLabel2 = rr2.year
                    this.yData2.push(rr2.value)
                }
                else {
                    this.yData2.push([])
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
                    top: '24%',
                    left: '4%',
                    bottom: '1%',
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
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    },
                },
                series: [
                    {
                        name: this.legendClass[0],
                        type: "bar",
                        barGap: 0,
                        data: this.yData[0],
                        itemStyle: {
                            color: '#EE6666'
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
                        type: "bar",
                        barGap: 0,
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
            this.chart.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.seriesName + params.name);
                    if (params.seriesName === "牵头国家级科研平台（个）") {
                        _this.$router.push({ name: 'ScientificResearch-PlatformBaseLeadingNationalPlatformDetail3', query: { year: params.name, } })
                    }
                    if (params.seriesName === "联合共建国家级平台（个）") {
                        _this.$router.push({ name: 'ScientificResearch-PlatformBaseParticipatingNationalPlatformDetail3', query: { year: params.name, } })
                    }

                }
            });

            this.chart2 = echarts.init(this.$refs.chart2);
            const option2 = {
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
                    top: '24%',
                    left: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                legend: {
                    data: this.legendClass2,
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
                    data: this.xLabel2,
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                            //lineHeight: 16,
                        },
                    },
                },
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        }
                    },
                },
                series: [
                    {
                        name: this.legendClass2[0],
                        type: "bar",
                        barGap: 0,
                        data: this.yData2[0],
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
                        name: this.legendClass2[1],
                        type: "bar",
                        barGap: 0,
                        data: this.yData2[1],
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
            this.chart2.setOption(option2);
            this.chart2.on('click', function (params) {
                if (params.componentType === "series") {
                    console.log("点击了" + params.componentType + params.seriesName + params.name);
                    if (params.seriesName === "新增省部级科研平台（个）") {
                        _this.$router.push({ name: 'ScientificResearch-PlatformBaseProvincialPlatformDetail3', query: { year: params.name, } })
                    }
                    if (params.seriesName === "新增省部级哲社基地（个）") {
                        _this.$router.push({ name: 'ScientificResearch-PlatformBaseProvincialBaseDetail3', query: { year: params.name, } })
                    }
                }
            });

        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 100%;

#platformBaseDistribution {
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
            padding-top: 10px;
            width: 100%;
            height: 200px; // Adjust based on the available space
            margin-bottom: 10px;
        }
    }
}
</style>
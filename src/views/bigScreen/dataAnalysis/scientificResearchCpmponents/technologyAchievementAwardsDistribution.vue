<template>
    <div id="technologyAchievementAwardsDistribution">
        <div class="bg-color-black">
            <div class="d-flex pt-2 pl-2">
                <span>
                    <icon name="chart-bar" class="text-icon"></icon>
                </span>
                <div class="d-flex">
                    <span class="text mx-2">科技成果奖项情况</span>
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
    name: 'TechnologyAchievementAwardsDistribution',
    data() {
        return {
            chart: null,
            legendClass: ['国家科技成果奖（项）', '省部级科技成果一等奖（项）',],
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
                    top: '20%',
                    left: '4%',
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
                            color: '#E6B851'
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
                            color: '#F78051'
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
                    if(params.seriesName==="省部级科技成果一等奖（项）"){
                        _this.$router.push({ name: 'ScientificResearch-TechnologyAchievementAwardsProvincialDetail3', query: { year: params.name, } })
                    }
                    if(params.seriesName==="国家科技成果奖（项）"){
                        _this.$router.push({ name: 'ScientificResearch-TechnologyAchievementAwardsNationalDetail3', query: { year: params.name, } })
                    }
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
$box-height: 460px;
$box-width: 100%;

#technologyAchievementAwardsDistribution {
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